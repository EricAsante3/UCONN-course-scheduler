from itertools import product
import json
from testing_files.printers import json_printer,schedule_printer
from scheduling_files.class_combiner import combination_maker


# Function to check if two time slots overlap
def time_slots_overlap(slot1, slot2):
    # Handle the case where either slot is "Online Instruction"
    if slot1 == "Online Instruction" or slot2 == "Online Instruction" or slot1 == "Does Not Meet" or slot2 == "Does Not Meet" or slot1 == "by arrangement" or slot2 == "by arrangement":
        return False

    # Split multiple day-time pairs separated by semicolons
    def split_multiple_slots(slot):
        # Strip leading/trailing spaces and split by semicolon
        return [s.strip() for s in slot.split(";") if s.strip()]

    # Convert time slots into comparable format (e.g., start and end times)
    def parse_time_slot(slot):
        # Split the day and time parts
        parts = slot.split()
        if len(parts) < 2:
            raise ValueError("Invalid time slot format")

        day_part = parts[0]
        time_part = " ".join(parts[1:])  # Handle cases where time part has spaces

        # Split start and end times
        if "-" not in time_part:
            raise ValueError("Invalid time range format")

        start, end = time_part.split("-")
        start_time = convert_to_minutes(start.strip())
        end_time = convert_to_minutes(end.strip())

        # Parse days
        days = get_days_from_combined_string(day_part)
        return days, start_time, end_time

    def convert_to_minutes(time_str):
        # Handle edge cases where time_str might be empty or invalid
        if not time_str:
            raise ValueError("Empty time string")

        # Remove 'a' or 'p' and handle edge cases
        time_str = time_str.lower().replace("a", "").replace("p", "")
        if ":" not in time_str:
            time_str += ":00"  # Assume minutes are 00 if not provided

        try:
            hours, minutes = map(int, time_str.split(":"))
        except ValueError:
            raise ValueError("Invalid time format")

        # Handle 12-hour to 24-hour conversion
        if "p" in time_str.lower() and hours != 12:
            hours += 12
        if "a" in time_str.lower() and hours == 12:
            hours = 0  # Handle midnight case

        return hours * 60 + minutes

    def get_days_from_combined_string(day_str):
        # Map day abbreviations to full day names
        day_map = {
            "M": "Monday",
            "T": "Tuesday",
            "W": "Wednesday",
            "Th": "Thursday",
            "F": "Friday",
            "S": "Saturday",
            "Su": "Sunday",
        }

        # Handle multiple days (e.g., "MWF", "TTh")
        days = []
        i = 0
        while i < len(day_str):
            if i + 1 < len(day_str) and day_str[i:i+2] in day_map:
                days.append(day_map[day_str[i:i+2]])
                i += 2
            elif day_str[i] in day_map:
                days.append(day_map[day_str[i]])
                i += 1
            else:
                raise ValueError(f"Invalid day abbreviation: {day_str[i]}")
        return days

    # Split slots into individual day-time pairs
    try:
        slots1 = split_multiple_slots(slot1)
        slots2 = split_multiple_slots(slot2)
    except ValueError as e:
        print(f"Error splitting time slots: {e}")
        return False

    # Compare all pairs of slots
    for s1 in slots1:
        try:
            day1, start1, end1 = parse_time_slot(s1)
        except ValueError as e:
            print(f"Error parsing time slot '{s1}': {e}")
            continue

        for s2 in slots2:
            try:
                day2, start2, end2 = parse_time_slot(s2)
            except ValueError as e:
                print(f"Error parsing time slot '{s2}': {e}")
                continue

            # Check if the days overlap and time slots overlap
            if set(day1).intersection(set(day2)) and not (end1 <= start2 or end2 <= start1):
                return True

    return False    # Handle the case where either slot is "Online Instruction"


    def split_multiple_slots(slot):
        # Strip leading/trailing spaces and split by semicolon
        return [s.strip() for s in slot.split(";") if s.strip()]

    # Convert time slots into comparable format (e.g., start and end times)
    def parse_time_slot(slot):
        # Split the day and time parts
        parts = slot.split()
        if len(parts) < 2:
            raise ValueError("Invalid time slot format")

        day_part = parts[0]
        time_part = " ".join(parts[1:])  # Handle cases where time part has spaces

        # Split start and end times
        if "-" not in time_part:
            raise ValueError("Invalid time range format")

        start, end = time_part.split("-")
        start_time = convert_to_minutes(start.strip())
        end_time = convert_to_minutes(end.strip())

        # Parse days
        days = get_days_from_combined_string(day_part)
        return days, start_time, end_time

    def convert_to_minutes(time_str):
        # Handle edge cases where time_str might be empty or invalid
        if not time_str:
            raise ValueError("Empty time string")

        # Remove 'a' or 'p' and handle edge cases
        time_str = time_str.lower().replace("a", "").replace("p", "")
        if ":" not in time_str:
            time_str += ":00"  # Assume minutes are 00 if not provided

        try:
            hours, minutes = map(int, time_str.split(":"))
        except ValueError:
            raise ValueError("Invalid time format")

        # Handle 12-hour to 24-hour conversion
        if "p" in time_str.lower() and hours != 12:
            hours += 12
        if "a" in time_str.lower() and hours == 12:
            hours = 0  # Handle midnight case

        return hours * 60 + minute
# Function to check if a combination of components has no overlapping time slots
def is_valid_combination(components):
    for i in range(len(components)):
        for j in range(i + 1, len(components)):
            if time_slots_overlap(components[i]["meets"], components[j]["meets"]):
                return False
    return True

# Function to generate all valid permutations of classes
def generate_valid_permutations(data):
    # Extract all classes and their components


    # Generate all possible combinations of components
    all_combinations = combination_maker(data)
    new_dict = {key: {} for key in all_combinations.keys()}
    # Filter out combinations with overlapping time slots
    valid_permutations = []
    for combination in list(all_combinations.values()):
        # Flatten the combination into a list of components
        components = [comp for component in combination for comp in component]
        if is_valid_combination(components):
            valid_permutations.append(combination)


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
def schedule_maker(data):
    valid_permutations = generate_valid_permutations(data)
    return valid_permutations

