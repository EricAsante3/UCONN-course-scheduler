from unfiltered_course_list_fetcher import send_to_cleaner


key_value_switch_case = {
    "keyword": "keyword",
    "season_year": "srcdb",
    "campus": "camp",
    "subject": "subject",
    "C_area": "C_area",
    "hours": "hours",
    "instruction_method": "instmode"
}


value_switch_case = {
    "season_year": {
        "Spring 2025": "1253",
        "Winter 2025": "1251",
        "Fall 2024": "1248",
        "Spring 2024": "1243"
    },
    "campus": {
        "Any Campus": "",
        "Off-campus (Darien High School)": "OFF@DARIENHIGH",
        "Off-campus (Eli Whitney Technical HS)": "OFF@WHITNEYTHS",
        "Off-campus (Lakeview High School)": "OFF@LAKEVIEW",
        "Off-campus (Terryville High School)": "OFF@TERRYVILLE",
        "Off-campus (Vinal Technical High School)": "OFF@VINALTHS",
        "Off-campus (Weaver High School)": "OFF@WEAVER",
        "Off-campus (Wilbur Cross High School)": "OFF@WCROSSHS",
        "Off-campus (Woodhouse Academy)": "OFF@WOODHOUSE",
        "UConn Health Center (Trinity Health NE Med Grp Wate)": "UCHC@UCH_148",
        "UConn Health Center (Wheeler Clinic)": "UCHC@UCH_160",
        "Avery Point (Avery Point Campus)": "AVYPT@AVERYPOINT",
        "Hartford (Hartford Campus)": "HRTFD@HARTFORD",
        "Stamford (Stamford Campus)": "STMFD@STAMFORD",
        "Storrs (Main Campus at Storrs)": "STORR@STORRS",
        "School of Law": "LAW@LAWSCHOOL",
        "Waterbury (Waterbury Campus)": "WTBY@WATERBURY",
        "UConn Health Center (Medical School)": "UCHC@MEDSCH",
        "UConn Health Center (Sch of Dental Medicine)": "UCHC@DENTAL"
    },
    "subject": {
        "Any subject": "",
        "Asian and Asian American Studies": "AAAS",
        "Accounting": "ACCT",
        "American English Language Institute": "AELI",
        "Africana Studies": "AFRA",
        "Agriculture and Natural Resources": "AGNR",
        "Allied Health Sciences": "AH",
        "Agriculture, Health and Natural Resources": "AHNR",
        "Air Force Studies": "AIRF",
        "Applied Linguistics and Discourse Studies": "ALDS",
        "Advanced Manufacturing for Energy Systems": "AMES",
        "American Studies": "AMST",
        "Anesthesiology": "ANES",
        "Animal Science": "ANSC",
        "Anthropology": "ANTH",
        "Arabic": "ARAB",
        "Agricultural and Resource Economics": "ARE",
        "Arabic and Islamic Studies": "ARIS",
        "Art": "ART",
        "Art History": "ARTH",
        "American Sign Language": "ASLN",
        "Business Administration": "BADM",
        "Basics (Social Work)": "BASC",
        "Biological Sciences": "BIOL",
        "Biostatistics": "BIST",
        "Business Law": "BLAW",
        "Biomedical Engineering": "BME",
        "Dental Basic Medical Sciences": "BSCI",
        "Business": "BUSN",
        "Classics and Ancient Mediterranean Studies": "CAMS",
        "Clinical Dental Science": "CDSC",
        "Civil Engineering": "CE",
        "COOP Education Work Placement": "CEWP",
        "Chemical Engineering": "CHEG",
        "Chemistry": "CHEM",
        "Chinese": "CHIN",
        "Comparative Literary and Cultural Studies": "CLCS",
        "Clinical": "CLIN",
        "Clinical and Translational Research": "CLTR",
        "Cognitive Science": "COGS",
        "Communication": "COMM",
        "Community Organization (Social Work)": "CORG",
        "Computer Science and Engineering": "CSE",
        "Dental Science": "DENT",
        "Dental Residency and Fellowship Program": "DERE",
        "Dermatology": "DERM",
        "Diagnostic Genetic Sciences": "DGS",
        "Dietetics": "DIET",
        "Digital Media and Design": "DMD",
        "Dramatic Arts": "DRAM",
        "Statistical Data Science and Analysis": "DSDA",
        "Direct Service Elective (Social Work)": "DSEL",
        "Electrical and Computer Engineering": "ECE",
        "Economics": "ECON",
        "Education Curriculum and Instruction": "EDCI",
        "Educational Leadership": "EDLR",
        "Ecology and Evolutionary Biology": "EEB",
        "Education": "EGEN",
        "Executive MBA": "EMBA",
        "Emergency Medicine": "EMED",
        "English": "ENGL",
        "Engineering": "ENGR",
        "Environmental Engineering": "ENVE",
        "Environmental Sciences": "ENVS",
        "Educational Psychology": "EPSY",
        "Earth Sciences": "ERTH",
        "European Studies": "ES",
        "Environmental Studies": "EVST",
        "Exploratory": "EXPL",
        "Foundational Dental Science": "FDSC",
        "Field Education (Social Work)": "FED",
        "Family Medicine": "FMED",
        "Finance": "FNCE",
        "French": "FREN",
        "Geography": "GEOG",
        "German": "GERM",
        "General and Professional Studies": "GPS",
        "Graduate School": "GRAD",
        "Human Behavior Elective": "HBEL",
        "Hartford Consortium For Higher Education": "HCHE",
        "Healthcare Management and Insurance Studies": "HCMI",
        "Human Development and Family Sciences": "HDFS",
        "Hebrew and Judaic Studies": "HEJS",
        "History": "HIST",
        "Human Rights": "HRTS",
        "Individuals, Groups, and Families (Social Work)": "IGFP",
        "Italian Literature and Cultural Studies": "ILCS",
        "Internal Medicine": "IMED",
        "Institute of Materials Science": "IMS",
        "India Studies": "INDS",
        "Interdepartmental": "INTD",
        "International Studies": "INTS",
        "Irish": "IRIS",
        "Independent Study (Social Work)": "IS",
        "Institute for Systems Genomics": "ISG",
        "Japanese": "JAPN",
        "Journalism": "JOUR",
        "Kinesiology": "KINS",
        "Korean": "KORE",
        "Landscape Architecture": "LAND",
        "Law": "LAW",
        "Literatures, Cultures, and Languages": "LCL",
        "Linguistics": "LING",
        "Latino and Latin American Studies": "LLAS",
        "School of Medicine": "M",
        "Marine Sciences": "MARN",
        "Maritime Studies": "MAST",
        "Mathematics": "MATH",
        "Molecular and Cell Biology": "MCB",
        "Mechanical Engineering": "ME",
        "Medical Science": "MEDS",
        "Management and Engineering for Manufacturing": "MEM",
        "Management and Entrepreneurship": "MENT",
        "Manufacturing Engineering": "MFGE",
        "Modern Greek": "MGRK",
        "Military Science": "MISI",
        "Marketing": "MKTG",
        "Medical Laboratory Sciences": "MLSC",
        "Materials Science and Engineering": "MSE",
        "Music": "MUSI",
        "Neurology": "NEUR",
        "Natural Resources and the Environment": "NRE",
        "Nursing": "NURS",
        "Nutritional Sciences": "NUSC",
        "OBGYN": "OBGY",
        "Off Campus": "OFFC",
        "OMFS": "OMFS",
        "Operations and Information Management": "OPIM",
        "Orthopaedic": "ORTH",
        "Occupational Safety and Health": "OSH",
        "Pathobiology": "PATH",
        "Pediatrics": "PEDS",
        "Pharmacy - PHAR": "PHAR",
        "Philosophy": "PHIL",
        "Pharmacy - PHRX": "PHRX",
        "Physics": "PHYS",
        "Plant Science": "PLSC",
        "Physiology and Neurobiology": "PNB",
        "Political Science": "POLS",
        "Polymer Science and Engineering": "POLY",
        "Policy Practice (Social Work)": "POPR",
        "Portuguese": "PORT",
        "Public Policy": "PP",
        "Psychiatry": "PSCH",
        "Psychological Sciences": "PSYC",
        "Physical Therapy": "PT",
        "Pathology": "PTHO",
        "Public Health": "PUBH",
        "Radiology": "RADS",
        "Research (Social Work)": "RSCH",
        "Agriculture (RH)": "SAAG",
        "Animal Science (RH)": "SAAS",
        "Natural Resources and the Environment (RH)": "SANR",
        "Pathobiology (RH)": "SAPB",
        "Plant Science (RH)": "SAPL",
        "Agricultural and Resource Economics (RH)": "SARE",
        "Systems Engineering": "SE",
        "Speech, Language and Hearing Science": "SLHS",
        "Sociology": "SOCI",
        "Social Work": "SOWK",
        "Spanish": "SPAN",
        "Sustainable Plant and Soil Systems": "SPSS",
        "Special Topics (Social Work)": "SPTP",
        "Social Work": "SSW",
        "Statistics": "STAT",
        "Surgery": "SURG",
        "Social Work Elective": "SWEL",
        "Transformation": "TRNS",
        "Translation Studies": "TRST",
        "University": "UNIV",
        "Urban and Community Studies": "URBN",
        "Women's, Gender, and Sexuality Studies": "WGSS"
    },
    "C_area": {
        "Any General Education Course Attribute": "",
        "CA1: Arts & Humanities": "course_attribute_CA1",
        "CA2: Social Science": "course_attribute_CA2",
        "CA3: Science & Technology": "course_attribute_CA3",
        "CA3LAB: Science & Tech Lab": "course_attribute_CA3LAB",
        "CA4: Diversity & Multicultural": "course_attribute_CA4",
        "CA4INT: Div & Multi Intl": "course_attribute_CA4INT",
        "COMP: Environmental Literacy": "course_attribute_COMPE",
        "COMP: Quantitative Competency": "course_attribute_COMPQ",
        "COMP: Writing Competency": "course_attribute_COMPW",
        "TOI1: Creativity: Des,Expr,Inn": "course_attribute_TOI1",
        "TOI2: Cultural Dimen Human Exp": "course_attribute_TOI2",
        "TOI3: Div, Equity, Soc Just": "course_attribute_TOI3",
        "TOI4: Environmental Literacy": "course_attribute_TOI4",
        "TOI5: Indiv Values Soc Inst": "course_attribute_TOI5",
        "TOI6: Science & Empirical Inq": "course_attribute_TOI6",
        "TOI6L: Science Emp Inq (Lab)": "course_attribute_TOI6L"
    },
    "hours": {
        "Any hours": "",
        "1 Credits": "1",
        "2 Credits": "2",
        "3 Credits": "3",
        "4 Credits": "4"
    },
    "instruction_method": {
        "Any instruction_method": "",
        "By Arrangement": "AR",
        "Hybrid": "HB",
        "Hybrid Limited": "HL",
        "In Person": "P",
        "In Person Remote": "PR",
        "Online Asynchronous": "OA",
        "Online Blended": "OB",
        "Online Synchronous": "OS"
    }
}


def set_up():
    # Keyword input remains the same
    keyword = input("Key word for search: ")

    # Function to display options and get user choice
    def get_choice(options, category_name):
        print(f"Select {category_name}:")
        for i, option in enumerate(options.keys(), 1):
            print(f"{i}. {option}")
        while True:
            try:
                choice = int(input("Enter the number corresponding to your choice: "))
                if 1 <= choice <= len(options):
                    return list(options.keys())[choice - 1]
                else:
                    print("Invalid choice. Please try again.")
            except ValueError:
                print("Invalid input. Please enter a number.")

    # Get user choices for each category
    season = get_choice(value_switch_case["season_year"], "year season")
    campus = get_choice(value_switch_case["campus"], "campus")
    subject = get_choice(value_switch_case["subject"], "subject")
    C_area = get_choice(value_switch_case["C_area"], "C_area")
    hours = get_choice(value_switch_case["hours"], "hours")
    instruction_method = get_choice(value_switch_case["instruction_method"], "instruction method")


    # return user choices in dictionary
    return {
        "keyword": keyword,
        "season_year": season,
        "campus": campus,
        "subject": subject,
        "C_area": C_area,
        "hours": hours,
        "instruction_method": instruction_method
    }



def convert_query(Set_up_variables):
    filter_list = []
    semester_year = value_switch_case.get("season_year", {}).get(Set_up_variables["season_year"])

    for key, value in Set_up_variables.items():
        if ((value_switch_case.get(key, {}).get(value) == "") or (value_switch_case.get(key, {}).get(value) == '')):
            continue

        if key == "keyword":
            filter_list.append({"field": key,"value": value})

        elif key == "C_area":
            filter_list.append({"field": value,"value": 'Y'})

        elif key == "hours":
            filter_list.append({"field": key,"value": (">="+ value)})
            filter_list.append({"field": (key + "_min"),"value": ("<="+ value)})
        else:
            qstr_value = value_switch_case.get(key, {}).get(value)
            qstr_field = key_value_switch_case.get(key)
            filter_list.append({"field": qstr_field,"value": qstr_value})
            
    return [filter_list,semester_year]

def main():
    user_preferences = set_up()
    filter_list = convert_query(user_preferences)
    print(filter_list[0])
    print(filter_list[1])

    send_to_cleaner(filter_list)

main()