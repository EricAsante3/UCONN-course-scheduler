from associations_adder import cleaner
import requests
import json

def api_call(filter_list):
    url = 'https://catalog.uconn.edu/course-search/api/?page=fose&route=search'
    data = {
        "other": {
            "srcdb": str(filter_list[1])
        },
        "criteria": filter_list[0]
    }

    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Request was successful.")
        # Print the response JSON data (if the response is in JSON format)


        with open('./raw_response_output.txt', 'w') as file:
            json.dump(response.json().get("results"), file, indent=4)  # Write the JSON to the file with indentation for readability
        return response.json().get("results")

    else:
        print(f"Failed to send POST request. Status code: {response.status_code}")
    return 0


def send_to_cleaner(filter_list):
    unfiltered_course_info = api_call(filter_list)
    cleaner(unfiltered_course_info)
