from associated_classes_finder import find_associated_class_components
import requests
import json


def send_txt(courses):
    with open('./clean_response_output.txt', 'w') as file:
            json.dump(courses, file, indent=4)


def dic_appender(dict,course,select,schd):
    if select == 1:
        if course["code"] in dict:
            dict[course["code"]][course["crn"]] = course
        else:
            dict[course["code"]] = {}
            dict[course["code"]][course["crn"]] = course
    else:
        if ("required" in dict) and (course["schd"] in dict["required"]):
            dict["required"][schd][course["crn"]] = course
        else:
            if "required" not in dict:
                dict["required"] = {}
            dict["required"][schd] = {}
            dict["required"][schd][course["crn"]] = course


def cleaner(raw_course_list):
    cleaned_course_results = {}
    while raw_course_list:
        course = raw_course_list[0]
        raw_course_list.pop(0)
        required = find_associated_class_components(course["code"],course["crn"])

        for raw_course in reversed(raw_course_list):
            if raw_course["schd"] == "LSA":
                dic_appender(cleaned_course_results,raw_course,1,0)
                raw_course_list.remove(raw_course)
            else:
                if raw_course["schd"] in required:
                    if raw_course["crn"] in required[raw_course["schd"]]:
                            dic_appender(course,raw_course,0,raw_course["schd"])
                            raw_course_list.remove(raw_course)

        dic_appender(cleaned_course_results,course,1,0)
    send_txt(cleaned_course_results)

