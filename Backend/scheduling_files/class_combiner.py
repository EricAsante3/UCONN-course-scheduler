import json
import itertools
import re
from testing_files.printers import json_printer,schedule_printer
from scheduling_files.builder import is_valid_combination




def is_subset(arr1, arr2):
    # Convert both arrays to sets and check if arr1 is a subset of arr2
    return set(arr1).issubset(set(arr2))


def extract_classes(data):
    """
    Extracts class names and sections from a formatted string and returns them as a set.
    
    Args:
        data (str): Input string in the format "Storrs(CLASS, _SECTION_)ID.Storrs(...)"
        
    Returns:
        set: A set of strings in the format "CLASS SECTION"
    """
    classes = set()
    
    # Split by periods to separate each course
    for course in data.split('.'):
        # Find the content inside parentheses
        start = course.find('(')
        end = course.find(')')
        
        if start != -1 and end != -1:
            content = course[start+1:end]
            parts = [p.strip() for p in content.split(',')]
            
            if len(parts) == 2:
                class_name = parts[0]
                # Process sections (remove underscores and split)
                sections = parts[1].strip('_').split('__')
                
                for section in sections:
                    section = section.strip('_')
                    if section:
                        classes.add(f"{class_name} {section}")
    
    return classes


def extract_integers(input_string):
    """
    Extracts all integer values between closing bracket `)`, period `.`, or the end of the string.

    Args:
        input_string (str): The input string to process.

    Returns:
        list: A list of extracted integers.
    """
    # Regular expression to match integers after ), ., or end of string
    pattern = r'\)(\d+)|\.(\d+)|(\d+)$'

    # Find all matches
    matches = re.findall(pattern, input_string)

    # Flatten the matches and filter out empty strings
    integers = [int(match) for group in matches for match in group if match]

    return integers



def combination_maker(data,class_lock,availabilities):
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
    json_printer(course_lists, "course_list")
    class_lock_list = list(class_lock.values())

    # ✅ Handle edge case: If only one unique course exists, return its sections
    full = []
    not_full = []
    if len(course_lists) == 1:

        combined_dict = {}
        for cls in course_lists[0]:
            key = cls[0]
            value = cls[1]

            section_list = extract_integers(key)

            if len(class_lock) != 0:
                if is_subset(class_lock_list, section_list) == False:
                    continue

            if set(section_list) & set(full):
                continue


            location = key.split("(")[0]
            subject =  ((key.split(",")[0]).split("(")[1]).split(" ")[0]
            code =  ((key.split(",")[0]).split("(")[1])
            sections = re.findall(r"_(\w+?)_", key)

            flag1 = 0
            for k in sections:
                if k in not_full:
                    continue
                capacity = availabilities[subject][location][f"{code}, {k}"]["Enrollment Capacity"]
                total = availabilities[subject][location][f"{code}, {k}"]["Enrollment Total"]

                if ((capacity - total) <= 0):
                    full.append(k)
                    flag1 = 1
                    break
                else:
                    not_full.append(k)
        
            if flag1:
                continue

            combined_dict[key] = [[value]]

        json_printer(combined_dict,"tytttttttttt")

        return combined_dict















    # ✅ General case: When 2 or more courses exist
    combined_dict = {}
    count = 0
    conflict = set()
    no_conflict = set()
    for combination in itertools.product(*course_lists):  # Cartesian product (all possible choices)
        if count == 10:
            break
        class_ids = []
        sections = []
        flag_combo = 0
        for cls in combination:
            if len(class_lock) != 0 and len(class_ids) != 0:
                if is_subset(class_lock_list, extract_integers(".".join(class_ids))) == False:
                    flag_combo = 1
                    break
                    
            key = cls[0]
            section_list = extract_integers(key)
            if set(section_list) & set(full):
                flag_combo = 1
                break


            if not set(section_list) & set(not_full):

                location = key.split("(")[0]
                subject =  ((key.split(",")[0]).split("(")[1]).split(" ")[0]
                code =  ((key.split(",")[0]).split("(")[1])
                sectionss = re.findall(r"_(\w+?)_", key)

                flag1 = 0
                for k in sectionss:
                    capacity = availabilities[subject][location][f"{code}, {k}"]["Enrollment Capacity"]
                    total = availabilities[subject][location][f"{code}, {k}"]["Enrollment Total"]

                    if ((capacity - total) <= 0):
                        full.append(k)
                        flag1 = 1
                        break
                    else:
                        not_full.append(k)
            
                if flag1:
                    flag_combo = 1
                    break

            class_ids.append(key)
            sections.append(cls[1])


        if flag_combo:
            continue


        json_printer(sections, "combo")


        key = ".".join(class_ids)  # Create a unique key
        section_list2 = extract_classes(".".join(class_ids))

        for pair in conflict:
            if set(pair).issubset(section_list2):  # Convert tuple to set
                continue

        if len(class_lock) != 0:
            if is_subset(class_lock_list, extract_integers(".".join(class_ids))) == False:
                continue

        components = [comp for component in sections for comp in component]
        if is_valid_combination(components,conflict,no_conflict):
            count = count + 1
            combined_dict[key] = [sections]

        


    json_printer(combined_dict, "combined_dict")
    return combined_dict






