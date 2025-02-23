from data_collection_files.init_interface import import_call
from scheduling_files.class_componets_combinations import requirement_pairer
from scheduling_files.class_permutations import main

import json

def send_txt(courses):
    """Writes json to a .txt file"""
    with open('./s_output.txt', 'w') as file:
            json.dump(courses, file, indent=4)



def schedulke_maker():
    picked_classes = []  # List to store inputs

    while True:
        if len(picked_classes) != 0:
            print("enter done to generate classes")

        user_input = input("Enter a class... (ex. CSE 1010) ").upper()  # Take input

        if user_input.lower() == "done":  # Check if the user wants to stop
            break

        picked_classes.append(user_input)  # Add input to the list

    classes_to_schedule = {}
    for i in picked_classes:
       filtered_course_list = import_call({
        "alias": i,
        "season_year": "Spring 2025",
        "campus": "Storrs (Main Campus at Storrs)",
        "subject": "",
        "C_area": "",
        "hours": "",
        "instruction_method": ""
        })
       classes_to_schedule.update(requirement_pairer(filtered_course_list))
    main(classes_to_schedule)
       

if __name__ == "__main__":
    schedulke_maker()