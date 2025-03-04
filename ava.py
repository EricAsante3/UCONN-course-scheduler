from bs4 import BeautifulSoup

def extract_class_info(html_content):
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'lxml')    
    # Initialize an empty list to store the results
    class_info_list = []
    
    # Find all rows in the table (each row represents a class)
    rows = soup.find_all('tr', id=lambda x: x and x.startswith('trUC_CLASS_G_VW$0_row'))
    
    for row in rows:
        # Extract the class number (CRN)
        crn = row.find('span', {'id': lambda x: x and x.startswith('CLASS_LINK$span$')})
        crn = crn.text.strip() if crn else None
        
        # Extract the class section
        class_section = row.find('span', {'id': lambda x: x and x.startswith('UC_CLASS_G_VW_CLASS_SECTION$')})
        class_section = class_section.text.strip() if class_section else None
        
        description = row.find('span', {'id': lambda x: x and x.startswith('UC_DERIVED_GST_HTMLAREA1$')})
        description = description.text.strip() if description else None

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
        class_info_list.append({
                'CRN': crn,
                'Class Section': class_section,
                'Description': description,
                'reserved': reserved,
                'Enrollment Capacity': enrollment_cap,
                'Enrollment Total': enrollment_tot,
                'Seats Available': available_seats,
                'Professor': professor
            })
    
    return class_info_list


