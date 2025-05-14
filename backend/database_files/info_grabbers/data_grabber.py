import requests
import json
from bs4 import BeautifulSoup
from testing_files.printers import write_to_txt

from database_files.serverside.query_functions import get_uncompleted_databases

import re

from bs4 import XMLParsedAsHTMLWarning
import warnings
warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)



def extract_semesters_and_subjects(html):
    soup = BeautifulSoup(html, "html.parser")

    def select_to_swapped_dict(select_id):
        select = soup.find("select", {"id": select_id})
        return {
            option.text.strip(): option["value"]
            for option in select.find_all("option")
            if option.get("value", "").strip()
        }

    semesters = select_to_swapped_dict("UC_DERIVED_GST_STRM1")
    subjects = select_to_swapped_dict("UC_DERIVED_GST_SUBJECT")
    del subjects['All']
    return semesters, subjects






def extract_semesters_from_html(html):
    # Find all CDATA blocks
    cdata_blocks = re.findall(r"<!\[CDATA\[(.*?)\]\]>", html, re.DOTALL)

    for block in cdata_blocks:
        soup = BeautifulSoup(block, "html.parser")
        select = soup.find("select", {"id": "UC_DERIVED_GST_STRM"})
        if select:
            semesters = {
                option.get_text(strip=True): option["value"]
                for option in select.find_all("option")
                if option.get("value")
            }
            return semesters

    print("Could not find <select id='UC_DERIVED_GST_STRM'>")
    return {}



 
def init_call():
    # Define session to persist cookies
    session = requests.Session()

    # Step 1: Initial GET request to fetch necessary tokens
    url = "https://student.studentadmin.uconn.edu/psc/CSGUE/EMPLOYEE/SA/c/UC_ENROLL.UC_GUEST_CLS_SCH.GBL"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": url,
    }
    response = session.get(url, headers=headers)
    semesters, subjects = extract_semesters_and_subjects(response.text)

    return session, subjects, semesters

def stage_1(session,semesters):

    def common_items(d1, d2):
        return dict(d1.items() & d2.items())

    # Step 1: Initial GET request to fetch necessary tokens
    url = "https://student.studentadmin.uconn.edu/psc/CSGUE/EMPLOYEE/SA/c/UC_ENROLL.UC_GUEST_CLS_SCH.GBL"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": url,
    }

    post_url = url
    form_data = {
            "ICAJAX": "1",
            "ICNAVTYPEDROPDOWN": "0",
            "ICType": "Panel",
            "ICElementNum": "0",
            "ICAction": "#ICPanel1"}

    response = session.post(post_url, headers=headers, data=form_data)
    semesters_satge1 = extract_semesters_from_html(response.text)
    db_semesters = common_items(semesters_satge1, semesters)
    print(db_semesters)
    
    write_to_txt(response.text)
    return get_uncompleted_databases(db_semesters)

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





if __name__ == "__main__":
    session, subjects, semesters = init_call()
    stage_1(session, semesters)
