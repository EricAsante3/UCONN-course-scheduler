import json
import re
from availabilities_adder import requirement_pairer
from testing_files.json_printer import json_printer




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
            dict["required"][schd][course["no"]] = course
        else:
            if "required" not in dict:
                dict["required"] = {}
            dict["required"][schd] = {}
            dict["required"][schd][course["no"]] = course


def api2_cleaner(raw_course_list):
    """input [{c1},{c1},]"""

    cleaned_course_results = {}
    independent_courses = ["IND","LSA"]
    while raw_course_list:

        for index, i in enumerate(raw_course_list):
            if i["no"].isdigit():  # Check if "no" contains only digits
                course = raw_course_list.pop(index)  # Remove the dictionary by index
                break  # Stop after removing the first match

        if course["schd"] in independent_courses:
            course["required"] = ""
        else:
            result = re.split(r'[;,]\s*', course["linked_crns"])
            required = list(map(str, result))

            if (required[0] == '') or (required[0] == ""):
                course["required"] = ""
            else:
                for raw_course in reversed(raw_course_list):
                    if raw_course["schd"] in independent_courses:
                        raw_course["required"] = ""
                        dic_appender(cleaned_course_results,raw_course,1,0) # remove and append course to cleaned_course_results
                        raw_course_list.remove(raw_course)
                    else:
                        if raw_course["crn"] in required:
                            dic_appender(course,raw_course,0,raw_course["schd"]) # append/associate raw_course to course
                            raw_course_list.remove(raw_course)


        dic_appender(cleaned_course_results,course,1,0) # append course to cleaned_course_results
    json_printer(cleaned_course_results, "before")
    requirement_pairer(cleaned_course_results)
    json_printer(cleaned_course_results, "after")

    return cleaned_course_results