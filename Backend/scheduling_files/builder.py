from itertools import product
import re

import json
from testing_files.printers import json_printer,schedule_printer



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


def remove_escape_chars(input_str):
    # Replace all instances of \" with an empty string
    return input_str.replace('\\"', '')


def time_slots_overlap(a, b):
    """
    Check if two time slots overlap on the same day.
    
    Args:
        a (tuple): (meeting_times_list, meets_info_string)
        b (tuple): (meeting_times_list, meets_info_string)
        
    Returns:
        bool: True if there is an overlap on the same day, False otherwise.
    """
    # Early exit for non-meeting cases
    NON_MEETING_TYPES = {"Online Instruction", "Does Not Meet", "by arrangement"}
    
    # Handle cases where either slot is a non-meeting type
    if (isinstance(a[1], str) and a[1] in NON_MEETING_TYPES) or (isinstance(b[1], str) and b[1] in NON_MEETING_TYPES):
        return False

    slot1 = a[0]  # This is the list of meeting times
    slot2 = b[0]  # This is the list of meeting times

    # If either slot has no meeting times (empty list), they can't overlap
    if not slot1 or not slot2:
        return False

    # Convert time strings to minutes and group by day in one pass
    def process_slot(slot):
        day_map = {}
        for meeting in slot:
            try:
                day = meeting["meet_day"]
                # Handle 3-digit times by padding with leading zero
                start_str = meeting["start_time"].zfill(4)
                end_str = meeting["end_time"].zfill(4)
                
                start = int(start_str[:2]) * 60 + int(start_str[2:])
                end = int(end_str[:2]) * 60 + int(end_str[2:])
                
                if day not in day_map:
                    day_map[day] = []
                day_map[day].append((start, end))
            except (KeyError, ValueError, AttributeError):
                continue
        return day_map

    day_map1 = process_slot(slot1)
    day_map2 = process_slot(slot2)

    # Check for overlapping slots on common days
    for day in day_map1:
        if day in day_map2:
            # Get all time ranges for this day
            times1 = day_map1[day]
            times2 = day_map2[day]
            
            # Check all combinations for this day
            for (s1, e1) in times1:
                for (s2, e2) in times2:
                    if max(s1, s2) < min(e1, e2):
                        return True

    return False


# Function to check if a combination of components has no overlapping time slots
def is_valid_combination(components, conflict,no_conflict):
    time_slots = []
    
    for component in components:
        # Pre-process the meeting times once per component
        processed_time = json.loads(remove_escape_chars(component["meetingTimes"]))
        meets = component["meets"]
        time_slots.append((processed_time, meets, component["code"] + " " + component["no"],component["code"]))
    
    # Check for overlaps
    for i in range(len(time_slots)):
        for j in range(i + 1, len(time_slots)):
            if time_slots[i][3] != time_slots[j][3] and (time_slots[i][2], time_slots[j][2]) not in no_conflict:
                if (time_slots[i][2], time_slots[j][2]) in conflict:
                    return False
                if time_slots_overlap(time_slots[i][:2], time_slots[j][:2]):
                    conflict.add((time_slots[i][2], time_slots[j][2]))
                    return False
                else:
                    no_conflict.add((time_slots[i][2], time_slots[j][2]))
                
    return True

# Function to generate all valid permutations of classes
def generate_valid_permutations(class_combinations):
    print("iiiiiiiiiiiiiiiiiiiiiiiiiii")
    # Extract all classes and their components
    json_printer(class_combinations, "all2combo")

    unvalid = set()
    remove = []
    valid_permutations = []
    new_dict = {}

    count = 0
    for key, combination_list in class_combinations.items():

        print(unvalid)
        print(extract_classes(key))

        if any(set(pair).issubset(extract_classes(key)) for pair in unvalid):
            continue


        if count == 10:
            break



        components = [comp for component in combination_list for comp in component]
        json_printer(components, "combo_builder")

        if is_valid_combination(components):
            valid_permutations.append(combination_list)
            new_dict[key] = {}
            count = count + 1
        else:
            remove.append(key)
            continue




    for i in valid_permutations:
        crn = []
        for k in i:
            crn.append(k[-1]["crn"])

        for key in new_dict:
            if all(word in key for word in crn):  # Check if all words are in the key
                new_dict[key] = [i]  # Change the value to 1 if the condition is true
    
    valid_permutations = {key: value for key, value in new_dict.items() if value}

    return valid_permutations


# Generate and print valid permutations
def schedule_maker(class_combinations):

    valid_permutations = generate_valid_permutations(class_combinations)
    return valid_permutations

