import requests
import json
from bs4 import BeautifulSoup
import re
from testing_files.json_printer import json_printer



def send_txt(courses):
    """Writes json to a .txt file"""
    with open('./s22.txt', 'w') as file:
            file.write(json.dumps(courses))

 
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
            "UC_DERIVED_GST_CAMPUS": "STORR",

            "ICAction": "#ICPanel1",
            "UC_DERIVED_GST_ENRL_STAT$chk": "C",
            "UC_DERIVED_GST_STRM1": season_year,

            "UC_DERIVED_GST_SUBJECT": re.sub(r'[^a-zA-Z]', '', subject)
        }

    response = session.post(post_url, headers=headers, data=form_data)
    json_printer(response.text, "ssssk")

    # Step 4: Update form data for enrollment status and send a second POST request
    form_data.update({
        "UC_DERIVED_GST_ENRL_STAT$chk": "C",
        "UC_DERIVED_GST_STRM": season_year,
        "ICAction": "UC_DERIVED_GST_SEARCH_PB"


    })
    
    response = session.post(post_url, headers=headers, data=form_data)

    return response.text  # Return the final response


def extract_class_info(html_content):
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'lxml')    
    # Initialize an empty list to store the results
    class_info_list = {}
    
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
        
        # Append the extracted information to the list as a dictionary
        if catalog_nbr != None:
            class_info_list[(subject + " " + catalog_nbr + ", " + class_section)]= {
                    'reserved': reserved,
                    'Enrollment Capacity': enrollment_cap,
                    'Enrollment Total': enrollment_tot,
                    'Seats Available': available_seats,
                    'Professor': professor
                }
    
    return class_info_list


def availabilities_adder(campus, season_year, subject):
    raw_html = api_call(campus, season_year, subject)
    data = extract_class_info(raw_html)
    return data




send_txt(api_call(1,"1253","CSE"))