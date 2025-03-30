import json
import itertools
import re
from testing_files.printers import json_printer,schedule_printer
from scheduling_files.builder import is_valid_combination


def parse_course_info(course_string):
    # Extract the part inside parentheses
    inside_parentheses = course_string.split("(")[1].split(")")[0]
    course_name = inside_parentheses.split(",")[0].strip()  # Extract "CSE 2050"
    
    # Extract course ID (last part of the string)
    course_id = int(course_string.split(")")[-1])  # Extract "4453"
    
    return {course_name: course_id}

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

        return [combined_dict]














    combinationss = list(itertools.product(*course_lists))
    
    # ✅ General case: When 2 or more courses exist
    combined_dict = {}
    count = 0
    no_count = 0
    dead = 0
    conflict = set()
    no_conflict = set()
    sliceindex = 0
    for i, combination in enumerate(combinationss):
        sliceindex = i


        class_ids = []
        sections = []
        flag_combo = 0
        for cls in combination:
            key = cls[0]
            
            if len(class_lock) != 0:
                key_dic = parse_course_info(key)
                name, value = list(key_dic.items())[0] 
                if name in class_lock and class_lock[name] != value:
                    flag_combo = 1
                    break

                    
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




        key = ".".join(class_ids)  # Create a unique key
        section_list2 = extract_classes(".".join(class_ids))

        for pair in conflict:
            if set(pair).issubset(section_list2):  # Convert tuple to set
                continue





        components = [comp for component in sections for comp in component]
        if is_valid_combination(components,conflict,no_conflict):
            count = count + 1
            combined_dict[key] = [sections]
            if count == 10:
                break
        else:
            no_count = no_count + 1
            if no_count == 1000 or (count < 10 and no_count >= 500):
                dead = 1
                break

        
    if dead == 1:
        return [{"fail": 0, "found": combined_dict}]
    print(sliceindex, "enddddd")
    return [combined_dict,full,not_full,conflict,no_conflict,combinationss,sliceindex]






def combination_maker_continuation(class_lock,availabilities,full,not_full,conflict,no_conflict,combinationss,sliceindex):
        # ✅ General case: When 2 or more courses exist
    full = []
    not_full = []
    combined_dict = {}
    count = 0
    no_count = 0
    dead = 0
    conflict = set()
    no_conflict = set()
    print(sliceindex, "start")

    
    for i, combination in enumerate(itertools.islice(combinationss, sliceindex, None), start=sliceindex):
        sliceindex = i
        class_ids = []
        sections = []
        flag_combo = 0
        for cls in combination:
            key = cls[0]
            
            if len(class_lock) != 0:
                key_dic = parse_course_info(key)
                name, value = list(key_dic.items())[0] 
                if name in class_lock and class_lock[name] != value:
                    flag_combo = 1
                    break

                    
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




        key = ".".join(class_ids)  # Create a unique key
        section_list2 = extract_classes(".".join(class_ids))

        for pair in conflict:
            if set(pair).issubset(section_list2):  # Convert tuple to set
                continue





        components = [comp for component in sections for comp in component]
        if is_valid_combination(components,conflict,no_conflict):
            count = count + 1
            combined_dict[key] = [sections]
            if count == 10:
                break
        else:
            no_count = no_count + 1
            if no_count == 1000 or (count < 10 and no_count >= 500):
                dead = 1
                break

        
    if dead == 1:
        return [{"fail": 0, "found": combined_dict}]

    return [combined_dict,full,not_full,conflict,no_conflict,sliceindex]