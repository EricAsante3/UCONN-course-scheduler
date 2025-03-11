from data_collection_files.init_interface import import_call
from scheduling_files.class_componets_combinations import requirement_pairer
from scheduling_files.class_permutations import main
import json
from testing_files.json_printer import json_printer

"""
to do: 
1. 10   10 classes full
2. online classes
"""




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
    

    json_printer(main(classes_to_schedule), "classes")
       

if __name__ == "__main__":
    schedulke_maker()