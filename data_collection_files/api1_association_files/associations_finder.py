from bs4 import BeautifulSoup
import requests


def api_call(class_code,class_crn):
    url = 'https://catalog.uconn.edu/course-search/api/?page=fose&route=details'
    data = {
        "group": "code:"+ str(class_code),
        "key": "crn:"+ str(class_crn)
    }

    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Request was successful.")
        return response.json().get("linkedhtml")
    else:
        print(f"Failed to send POST request. Status code: {response.status_code}")
    return 0


def response_cleaner(raw_html):
    soup = BeautifulSoup(raw_html, 'lxml')
    crn_dict = {}
    course_sections = soup.find_all('a',class_="course-section")
    for section in course_sections:
        section_type = section.find("div", class_="course-section-schd").text.strip().split(':  ')[1]
        crn = section.find("div", class_="course-section-crn").text.strip().split(":  ")[1]

        if section_type in crn_dict:
            crn_dict[section_type].append(crn)
        else:
            crn_dict[section_type] = [crn]
    return crn_dict


def find_associated_class_components(class_code, class_crn):
    raw_html = api_call(class_code,class_crn) # Returns html containing required associated classes
    associated_classes = response_cleaner(raw_html) # parse html and extract class code and crn numbers only
    return associated_classes


if __name__ == "__main__":
    print(find_associated_class_components("CSE 1010","6057"))