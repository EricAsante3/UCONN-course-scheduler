import requests
import json
from bs4 import BeautifulSoup
from testing_files.printers import json_printer

from bs4 import XMLParsedAsHTMLWarning
import warnings
warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)



switch_case = {
        "Any Campus": "",
        "Off-campus (Darien High School)": "OFF",
        "Off-campus (Eli Whitney Technical HS)": "OFF",
        "Off-campus (Lakeview High School)": "OFF",
        "Off-campus (Terryville High School)": "OFF",
        "Off-campus (Vinal Technical High School)": "OFF",
        "Off-campus (Weaver High School)": "OFF",
        "Off-campus (Wilbur Cross High School)": "OFF",
        "Off-campus (Woodhouse Academy)": "OFF",
        "UConn Health Center (Trinity Health NE Med Grp Wate)": "UCHC",
        "UConn Health Center (Wheeler Clinic)": "UCHC",
        "Avery Point": "AVYPT",
        "Hartford": "HRTFD",
        "Stamford": "STMFD",
        "Storrs": "STORR",
        "School of Law": "LAW",
        "Waterbury": "WTBY",
        "UConn Health Center (Medical School)": "UCHC",
        "UConn Health Center (Sch of Dental Medicine)": "UCHC"
}


 
def api_call(campus, season_year, subject):
    # Define session to persist cookies
    session = requests.Session()

    # Step 1: Initial GET request to fetch necessary tokens
    url = "https://student.studentadmin.uconn.edu/psc/CSGUE/EMPLOYEE/SA/c/UC_ENROLL.UC_GUEST_CLS_SCH.GBL"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": url,
    }
    response = session.get(url, headers=headers)

    # Step 2: Extract dynamic values (like ICSID) from response
    post_url = url
    form_data = {
            "ICAJAX": "1",
            "ICNAVTYPEDROPDOWN": "0",
            "ICType": "Panel",
            "ICElementNum": "0",
            "UC_DERIVED_GST_CAMPUS": switch_case[campus],
            "ICAction": "#ICPanel1",
            "UC_DERIVED_GST_ENRL_STAT$chk": "C",
            "UC_DERIVED_GST_STRM1": season_year,

            "UC_DERIVED_GST_SUBJECT": subject.split(' ')[0]
        }

    response = session.post(post_url, headers=headers, data=form_data)

    # Step 4: Update form data for enrollment status and send a second POST request
    form_data.update({
        "UC_DERIVED_GST_ENRL_STAT$chk": "C",
        "UC_DERIVED_GST_STRM": season_year,
        "ICAction": "UC_DERIVED_GST_SEARCH_PB"

    })
    
    response = session.post(post_url, headers=headers, data=form_data)

    return response.text  # Return the final response


def extract_class_info(html_content,subject,campus):
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'lxml')    
    # Initialize an empty list to store the results
    class_info_list = {subject:{campus:{}}}
    
    # Find all rows in the table (each row represents a class)
    rows = soup.find_all('tr', id=lambda x: x and x.startswith('trUC_CLASS_G_VW$0_row'))
    
    for row in rows:


        subject = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_SUBJECT$')})
        subject = subject.text.strip() if subject else None

        catalog_nbr = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_CATALOG_NBR$')})
        catalog_nbr = catalog_nbr.text.strip() if catalog_nbr else None

        # Extract the class number (CRN)
        crn = row.find('span', {'id': lambda x: x and x.startswith('CLASS_LINK$span$')})
        crn = crn.text.strip() if crn else None
        
        # Extract the class section
        class_section = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_CLASS_SECTION$')})
        class_section = class_section.text.strip() if class_section else None
        

        # Extract the class description
        
        reserved = row.find('span', {'id': lambda x: x and x.startswith('UC_DERIVED_GST_HTMLAREA1$')})
        reserved = reserved.text.strip() if reserved else None

        # Extract the enrollment capacity and total enrollment
        enrollment_cap = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_ENRL_CAP$')})
        enrollment_cap = int(enrollment_cap.text.strip()) if enrollment_cap else None
        
        enrollment_tot = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_ENRL_TOT$')})
        enrollment_tot = int(enrollment_tot.text.strip()) if enrollment_tot else None
        
        # Calculate the number of available seats
        available_seats = enrollment_cap - enrollment_tot if enrollment_cap and enrollment_tot else None
        
        # Extract the professor's name
        professor = row.find('span', {'id': lambda x: x and x.startswith('UC_DERIVED_GST_SSR_INSTR_LONG$')})
        professor = professor.text.strip() if professor else None

        time = row.find('span', {'id': lambda x: x and x.startswith('HRS_DAYS_LOC_CLMN$')})
        time = time.text.strip() if time else None

        instruction_method = row.find('span', {'id': lambda x: x and x.startswith('INSTRUCT_MODE_DESCR$')})
        instruction_method = instruction_method.text.strip() if instruction_method else None

        # Append the extracted information to the list as a dictionary
        if catalog_nbr != None:
            class_info_list[subject][campus][(subject + " " + catalog_nbr + ", " + class_section)]= {
                    'reserved': reserved,
                    'Enrollment Capacity': enrollment_cap,
                    'Enrollment Total': enrollment_tot,
                    'Seats Available': available_seats,
                    'Professor': professor,
                    'instruction_method': instruction_method,
                    'time': time
                }
    
    return class_info_list


def availabilities_adder(campus, season_year, subject):
    raw_html = api_call(campus, season_year, subject)
    data = extract_class_info(raw_html,subject,campus)
    return data



if __name__ == "__main__":
    availabilities_adder("storrs", "Fall 2025", )