from bs4 import BeautifulSoup
from bs4 import XMLParsedAsHTMLWarning
import warnings
warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)

from database_files.miscellaneous_functions import parse_meeting_times
from database_files.serverside_functions.query_functions import insert_main_component


def write_to_txt(text, filename="output.txt"):
    with open(filename, "w") as file:
        file.write(text)

def extract_sections(s):
    # Step 1: Get part after "(s)"
    if "(s)" in s:
        s = s.split("(s)", 1)[1]
    
    # Step 2: Remove whitespace, split by comma, strip entries
    sections = [entry.strip().replace(" ", "") for entry in s.split(",") if entry.strip()]
    
    return sections



def extract_class_info(html_content):

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'lxml')

    # Find all rows in the table (each row represents a class)
    rows = soup.find_all('tr', id=lambda x: x and x.startswith('trUC_CLASS_G_VW$0_row'))
 
    main_classes = {}
    dependent_classes = {}

    count = 0

    for row in rows:

        # Extract the class number (CRN)
        crn = row.find('span', {'id': lambda x: x and x.startswith('CLASS_LINK$span$')})
        crn = crn.text.strip() if crn else None

        # subject i.e. CSE
        subject = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_SUBJECT$')})
        subject = subject.text.strip() if subject else None

        # catalog nbr i.e. 1010
        catalog_nbr = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_CATALOG_NBR$')})
        catalog_nbr = catalog_nbr.text.strip() if catalog_nbr else None
        
        # class section
        class_section = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_CLASS_SECTION$')})
        class_section = class_section.text.strip() if class_section else None

        # acad_career
        acad_career = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_ACAD_CAREER$')})
        acad_career = acad_career.text.strip() if acad_career else None

        # credit_amount
        credit_amount = row.find('span', {'id': lambda x: x and x.startswith('UC_DERIVED_GST_UNITS_RANGE$')})
        credit_amount = credit_amount.text.strip() if credit_amount else None

        # Campus
        campus = row.find('span', {'id': lambda x: x and x.startswith('CAMPUS_CLMN$')})
        campus = campus.text.strip() if campus else None

        # title
        title = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_DESCR$')})
        title = title.text.strip() if title else None

        # session
        session = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_SESSION_CODE$')})
        session = session.text.strip() if session else None

        # dependents
        dependents = row.find('span', {'id': lambda x: x and x.startswith('UC_DERIVED_GST_DESCR50$')})
        dependents = dependents.text.strip() if dependents else None

        # reserve
        reserved = row.find('span', {'id': lambda x: x and x.startswith('UC_DERIVED_GST_HTMLAREA1$')})
        reserved = reserved.text.strip() if reserved else None

        # professor
        professor = row.find('span', {'id': lambda x: x and x.startswith('UC_DERIVED_GST_SSR_INSTR_LONG$')})
        professor = professor.text.strip() if professor else None

        # Class time
        time = row.find('span', {'id': lambda x: x and x.startswith('HRS_DAYS_LOC_CLMN$')})
        time = time.text.strip() if time else None

        # Instruction method
        instruction_method = row.find('span', {'id': lambda x: x and x.startswith('INSTRUCT_MODE_DESCR$')})
        instruction_method = instruction_method.text.strip() if instruction_method else None

        # Append the extracted information to the list as a dictionary

        if ((crn == "") and (credit_amount == "")) or (crn.isdigit() and (dependents == "")):
            print("primary")
            class_type = "LEC"
            insert_main_component(class_section, subject, catalog_nbr, class_type, parse_meeting_times(time), crn, instruction_method, campus, title, credit_amount, professor)

        if (dependents != ""):
            print("dependent")
            print(crn, dependents)
            count += 1

        print(count)
    return class_info_list

with open("./database_files/data/unparsed_data/Fall 2025/COMM_CLCS_CSE_CRLP.txt", "r") as file:
    text = file.read()


write_to_txt(str(extract_class_info(text)))