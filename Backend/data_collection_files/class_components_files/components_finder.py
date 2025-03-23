import json
import re
from data_collection_files.seat_open_files.availabilities_adder import requirement_pairer
from testing_files.printers import json_printer




def dic_appender(dict,course,select,schd):
    """Append a course json to a corresponding dictionary"""
    if select == 1: # If select is one appending course to cleaned_course_results dictionary
        if course["code"] in dict:
            dict[course["code"]][course["crn"]] = course
        else:
            dict[course["code"]] = {}
            dict[course["code"]][course["crn"]] = course
    else: # If select is one appending course to course dictionary
        if ("required" in dict) and (course["schd"] in dict["required"]):
            dict["required"][schd][re.sub(r"[a-zA-Z]", "", course["no"])] = course
        else:
            if "required" not in dict:
                dict["required"] = {}
            dict["required"][schd] = {}
            dict["required"][schd][re.sub(r"[a-zA-Z]", "", course["no"])] = course


def components_adder(raw_course_list):
    """input [{c1},{c1},]"""


    cleaned_course_results = {}
    for key_crn, class_info in raw_course_list.items():
        if len(class_info["linked_crns"]) == 0:
            class_info["required"] = ""

            dic_appender(cleaned_course_results,class_info,1,0) # append course to cleaned_course_results

        else:
            if class_info["no"].isdigit() and (class_info["schd"] == "LEC"):  # Check if "no" contains only digits
                result = re.split(r'[;,]\s*', class_info["linked_crns"])
                required = list(map(str, result))
                for req_class_info in required:
                    dic_appender(class_info,raw_course_list[req_class_info],0,raw_course_list[req_class_info]["schd"]) # append/associate raw_course to course
                dic_appender(cleaned_course_results,class_info,1,0) # append course to cleaned_course_results

    return cleaned_course_results