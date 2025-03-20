import json
import itertools
import re

def combination_maker(data):
    class_sections = {}  # Dictionary to map course names to their sections
    
    # Extract all class identifiers and sections efficiently
    for course, instructors in data.items():
        for instructor, sections in instructors.items():
            for section_id, section_data in sections.items():
                start_index = section_id.find('(') + 1
                end_index = section_id.find(',')
                course_name = section_id[start_index:end_index]

                if course_name not in class_sections:
                    class_sections[course_name] = []  # Initialize list for this course
                class_sections[course_name].append((section_id, section_data))

    course_lists = list(class_sections.values())  # Convert dict values to a list of lists

    # ✅ Handle edge case: If only one unique course exists, return its sections
    if len(course_lists) == 1:
        combined_dict = {cls[0]: [cls[1]] for cls in course_lists[0]}
        return combined_dict

    # ✅ General case: When 2 or more courses exist
    combined_dict = {}
    for combination in itertools.product(*course_lists):  # Cartesian product (all possible choices)
        class_ids = [cls[0] for cls in combination]
        sections = [cls[1] for cls in combination]
        key = ".".join(class_ids)  # Create a unique key
        combined_dict[key] = sections

    return combined_dict






