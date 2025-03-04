from itertools import product
import json


# Function to check if two time slots overlap
def time_slots_overlap(slot1, slot2):
    # Convert time slots into comparable format (e.g., start and end times)
    def parse_time_slot(slot):
        print(slot.split())
        day, time = slot.split()
        start, end = time.split("-")
        start_time = convert_to_minutes(start)
        end_time = convert_to_minutes(end)
        return day, start_time, end_time

    def convert_to_minutes(time_str):
        # Convert time string (e.g., "11:15a") to minutes since midnight
        time_str = time_str.replace("a", "").replace("p", "")
        if ":" not in time_str:
            time_str = time_str + ":00"

        hours, minutes = map(int, time_str.split(":"))
        if "p" in time_str and hours != 12:
            hours += 12
        return hours * 60 + minutes

    day1, start1, end1 = parse_time_slot(slot1)
    day2, start2, end2 = parse_time_slot(slot2)

    # Check if the days are the same and time slots overlap
    if day1 == day2 and not (end1 <= start2 or end2 <= start1):
        return True
    return False

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
    classes = list(data.keys())
    class_components = [data[class_name] for class_name in classes]

    # Generate all possible combinations of components
    all_combinations = product(*class_components)

    # Filter out combinations with overlapping time slots
    valid_permutations = []
    for combination in all_combinations:
        # Flatten the combination into a list of components
        components = [comp for component in combination for comp in component]
        if is_valid_combination(components):
            valid_permutations.append(combination)

    return valid_permutations

# Generate and print valid permutations
def main(data):
    valid_permutations = generate_valid_permutations(data)
    for i, permutation in enumerate(valid_permutations, 1):
        print(f"\nPossible Schedule {i}:\n" + "-" * 50)

        # Organize schedule by days of the week
        schedule_by_day = {"Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": []}

        for component in permutation:
            for course in component:
                meets = course['meets']
                crn = course['crn']
                code = course['code']
                title = course['title']
                
                # Extract day and time from the 'meets' string
                days, time = meets.split(" ", 1)
                
                # Map abbreviations to full day names
                day_mapping = {
                    "M": "Monday",
                    "T": "Tuesday",
                    "W": "Wednesday",
                    "Th": "Thursday",
                    "F": "Friday"
                }
                
                for short_day in day_mapping:
                    if short_day in days:
                        schedule_by_day[day_mapping[short_day]].append(f"Class {code},CRN {crn}: {time}")

        # Print the formatted schedule
        for day, classes in schedule_by_day.items():
            if classes:
                print(f"{day}:")
                for cls in classes:
                    print(f"  - {cls}")
        
        print("-" * 50)