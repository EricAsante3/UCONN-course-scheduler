from associations_finder import find_associated_class_components
import json


def send_txt(courses):
    """Writes json to a .txt file"""
    with open('./clean_response_output.txt', 'w') as file:
            json.dump(courses, file, indent=4)


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
            dict["required"][schd][course["crn"]] = course
        else:
            if "required" not in dict:
                dict["required"] = {}
            dict["required"][schd] = {}
            dict["required"][schd][course["crn"]] = course


def cleaner(raw_course_list):
    cleaned_course_results = {}
    independent_courses = ["IND","LSA"]
    while raw_course_list:
        course = raw_course_list[0]
        raw_course_list.pop(0)
        if course["schd"] in independent_courses:
            course["required"] = ""
        else:
            required = find_associated_class_components(course["code"],course["crn"])
            if len(required) == 0:
                course["required"] = ""
            else:
                for raw_course in reversed(raw_course_list):
                    if raw_course["schd"] in independent_courses:
                        raw_course["required"] = ""
                        dic_appender(cleaned_course_results,raw_course,1,0) # remove and append course to cleaned_course_results
                        raw_course_list.remove(raw_course)
                    else:
                        if raw_course["schd"] in required:
                            if raw_course["crn"] in required[raw_course["schd"]]:
                                    dic_appender(course,raw_course,0,raw_course["schd"]) # append/associate raw_course to course
                                    raw_course_list.remove(raw_course)

        dic_appender(cleaned_course_results,course,1,0) # append course to cleaned_course_results

    send_txt(cleaned_course_results) # Write cleaned_course_results to a .txt file

