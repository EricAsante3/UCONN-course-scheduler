import json
import itertools
import re


def combination_maker(data):
    # Extract all class identifiers and their sections
    class_sections = []
    for course, instructors in data.items():
        for instructor, sections in instructors.items():
            for section_id, section_data in sections.items():
                class_sections.append((section_id, section_data))

    # Create combinations of class pairs (only between different courses)
    combined_dict = {}
    for (class1, sections1), (class2, sections2) in itertools.combinations(class_sections, 2):
        # Ensure the classes are from different courses

        start_index1 = class1.find('(') + 1
        end_index1 = class1.find(',')
        result1 = class1[start_index1:end_index1]


        start_index2 = class2.find('(') + 1
        end_index2 = class2.find(',')
        result2 = class2[start_index2:end_index2]

        if result1 != result2:
            key = f"{class1}.{class2}"
            combined_dict[key] = [sections1, sections2]

    return combined_dict



