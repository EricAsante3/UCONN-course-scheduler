import requests
from testing_files.printers import json_printer

api_url = "https://classes.uconn.edu/api/?page=fose&route=search"






def api_call(filter_list, url):
    """
    Retrives raw couse info from Uconn's couse search API endpoint 
    For classes that fall under given prefrences specified in filter_list

    Args:
    filter_list (type: Array[2]): # Note. fitler_list is first created in init_interface.py's convert_query function.
        - Array[0] is another array containing dictionaries of user specified preferences, Ex. {"field": "campus","value": "Storrs (Main Campus at Storrs)"}
        - Array[1] contains encoded year and season, Ex. 1253 - Spring 2025
    
    Returns:
    if call successful: 
        raw_course_list (type: Array containing dictinaries of class info): #Ex. [{c1 info},{c2 info}]
    else
        raise ValueError
    """ 

    # Structure User Prefrences 
    data = {
        "other": {
            "srcdb": str(filter_list[1])
        },
        "criteria": filter_list[0]
    }

    # Send post request
    response = requests.post(url, json=data)
     
    if response.status_code == 200:
        # return raw_course_list if successful
        raw_course_list = response
        return raw_course_list
    else:
        return None

def orginizer(raw_course_list,campus):
    """input: [{c1},{c1}]   ouput: {"cse 1010": [], "cse 1020": []}"""
    orgnized_cousre_list = {}
    for course in raw_course_list:
        course["campus"] = campus

        if course["stat"] != "X":
            if (course["code"] in orgnized_cousre_list):
                orgnized_cousre_list[course["code"]][course["crn"]] = course
            else:
                orgnized_cousre_list[course["code"]] = {}
                orgnized_cousre_list[course["code"]][course["crn"]] = course
    return orgnized_cousre_list

def course_fetcher(filter_list):
    raw_course_list = api_call(filter_list, api_url)
    if (raw_course_list == None) or ("fatal" in raw_course_list.json()):
        return None
    else:
        orgnized_courses = orginizer(raw_course_list.json()["results"], filter_list[2])
        return orgnized_courses