import requests
import time
import json
from itertools import zip_longest

from testing_files.printers import write_to_txt
from testing_files.printers import write_to_txt_folder
from testing_files.printers import file_exists_in_folder

from database_files.serverside_functions.query_functions import get_uncompleted_databases

from database_files.miscellaneous_functions import extract_semesters_and_subjects_from_html_stage_1
from database_files.miscellaneous_functions import extract_semesters_from_html_stage_2


url = "https://student.studentadmin.uconn.edu/psc/CSGUE/EMPLOYEE/SA/c/UC_ENROLL.UC_GUEST_CLS_SCH.GBL"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Referer": url,
}

def reestablish_session():
    session = requests.Session()
    response = session.get(url, headers=headers)
    form_data = {
            "ICAJAX": "1",
            "ICNAVTYPEDROPDOWN": "0",
            "ICType": "Panel",
            "ICElementNum": "0",
            "ICAction": "#ICPanel1"}
    response = session.post(url, headers=headers, data=form_data)
    return session
 
def init_call():
    session = requests.Session()
    response = session.get(url, headers=headers)
    semesters, subjects = extract_semesters_and_subjects_from_html_stage_1(response.text)
    return session, subjects, semesters

def stage_1(session,semesters):
    def common_items(d1, d2):
        return dict(d1.items() & d2.items())

    form_data = {"ICAJAX": "1", "ICNAVTYPEDROPDOWN": "0", "ICType": "Panel", "ICElementNum": "0", "ICAction": "#ICPanel1"}
    response = session.post(url, headers=headers, data=form_data)
    semesters_satge1 = extract_semesters_from_html_stage_2(response.text)
    valid_semesters = common_items(semesters_satge1, semesters)
    filtered_semesters = get_uncompleted_databases(valid_semesters)
    return filtered_semesters, session, form_data

def stage_2(session, semesters, subjects, form_data):

    subjects_codes = list(subjects.values())
    semesters_codes = list(semesters.keys())


    form_data.update({
            "ICAction": "UC_DERIVED_GST_SEARCH_PB",

            "UC_CAMPUS_VW1$selmh$1$$0": "N",
            "UC_DERIVED_GST_FLAG2$chk": "Y",
            "UC_DERIVED_GST_FLAG2": "Y",
            "UC_DERIVED_GST_FLAG3$chk": "Y",
            "UC_DERIVED_GST_FLAG3": "Y",
            "UC_DERIVED_GST_ENRL_STAT$chk": "C",

            "CAMPUS_TBL$selmh$0$$0": "Y",
            "CAMPUS_TBL$selm$0$$0": "on",
            "CAMPUS_TBL$selmh$1$$0": "Y",
            "CAMPUS_TBL$selm$1$$0": "on",
            "CAMPUS_TBL$selmh$2$$0": "Y",
            "CAMPUS_TBL$selm$2$$0": "on",
            "UC_CAMPUS_VW$selmh$1$$0": "Y",
            "UC_CAMPUS_VW$selm$1$$0": "on",
            "UC_CAMPUS_VW$selmh$0$$0": "Y",
            "UC_CAMPUS_VW$selm$0$$0": "on"})


    for semester in semesters_codes:
        if semesters[semester] == "1261":
            continue

        form_data["UC_DERIVED_GST_STRM"] = semesters[semester]
        form_data["UC_DERIVED_GST_SUBJECT"] = "ALL"
        form_data["UC_DERIVED_GST_SUBJECT_SRCH"] = ""
        form_data["UC_DERIVED_GST_SUBJECT_SRCH1"] = ""
        form_data["UC_DERIVED_GST_SUB_SUBJECT"] = ""
        response = session.post(url, headers=headers, data=form_data)



        if "Search For Courses" in response.text:
            session = reestablish_session()
            response = session.post(url, headers=headers, data=form_data)

        elif "Your search would return over 600. Please indicate additional criteria (0,0)" in response.text:
            for a, b, c, d in zip_longest(*[iter(subjects_codes)]*4, fillvalue=""):

                if file_exists_in_folder(a+"_"+b+"_"+c+"_"+d+".txt", "./database_files/data/unparsed_data/" + semester):
                    continue
                if file_exists_in_folder(c+"_"+d+".txt", "./database_files/data/unparsed_data/" + semester):
                    continue
                if file_exists_in_folder(a+"_"+b+".txt", "./database_files/data/unparsed_data/" + semester):
                    continue


                form_data["UC_DERIVED_GST_SUBJECT"] = a
                form_data["UC_DERIVED_GST_SUBJECT_SRCH"] = b
                form_data["UC_DERIVED_GST_SUBJECT_SRCH1"] = c
                form_data["UC_DERIVED_GST_SUB_SUBJECT"] = d
                response = session.post(url, headers=headers, data=form_data)

                if "Your search would return over 600. Please indicate additional criteria (0,0)" in response.text:
                    form_data["UC_DERIVED_GST_SUBJECT"] = a
                    form_data["UC_DERIVED_GST _SUBJECT_SRCH"] = b
                    form_data["UC_DERIVED_GST_SUBJECT_SRCH1"] = ""
                    form_data["UC_DERIVED_GST_SUB_SUBJECT"] = ""
                    response = session.post(url, headers=headers, data=form_data)
                    write_to_txt_folder(response.text, a+"_"+b+".txt", "./database_files/data/unparsed_data/" + semester)

                    form_data["UC_DERIVED_GST_SUBJECT"] = c
                    form_data["UC_DERIVED_GST_SUBJECT_SRCH"] = d
                    response = session.post(url, headers=headers, data=form_data)
                    write_to_txt_folder(response.text, c+"_"+d+".txt", "./database_files/data/unparsed_data/" + semester)

                    continue

                if "Search For Courses" in response.text:
                    session = reestablish_session()
                    response = session.post(url, headers=headers, data=form_data)

                write_to_txt_folder(response.text, a+"_"+b+"_"+c+"_"+d+".txt", "./database_files/data/unparsed_data/" + semester)
                time.sleep(3)
        
        elif "Your search did not return any result. Please indicate a different criteria (0,0)" in response.text:
            time.sleep(3)
            continue
        else:
            write_to_txt_folder(response.text, "all.txt", "./database_files/data/unparsed_data/" + semester)
            time.sleep(3)
            continue

    return 0


















if __name__ == "__main__":
    session, subjects, semesters = init_call()
    db_semesters, session, form_data = stage_1(session, semesters)
    stage_2(session, db_semesters, subjects, form_data)