from itertools import product
import json
from testing_files.printers import json_printer,schedule_printer
from scheduling_files.class_combiner import combination_maker
import concurrent.futures

def remove_escape_chars(input_str):
    # Replace all instances of \" with an empty string
    return input_str.replace('\\"', '')

def time_slots_overlap(a, b, conflictions):
    """
    Check if two time slots overlap on the same day.
    
    Args:
        slot1 (list): A list of dictionaries representing the first time slot(s).
        slot2 (list): A list of dictionaries representing the second time slot(s).
        conflictions (set): A set of tuples representing conflicting slot pairs.
        
    Returns:
        bool: True if there is an overlap on the same day, False otherwise.
    """
    ps1 = a[0]
    ps2 = a[1]
    if ps1 == "Online Instruction" or ps2 == "Online Instruction" or ps1 == "Does Not Meet" or ps2 == "Does Not Meet" or ps1 == "by arrangement" or ps2 == "by arrangement":
        return False

    slot1 = a[0]
    slot2 = b[0]


    def convert_to_minutes(time_str):
        """
        Convert a time string in "HHMM" format to minutes since midnight.
        
        Args:
            time_str (str): Time in "HHMM" format (24-hour notation).
            
        Returns:
            int: Minutes since midnight.
        """
        if not time_str:
            raise ValueError("Invalid time format")
        if len(time_str) == 3:
            time_str = "0" + time_str
        
        hours = int(time_str[:2])
        minutes = int(time_str[2:])
        return hours * 60 + minutes

    # Precompute minutes for all slots
    for slots in [slot1, slot2]:
        for slot in slots:
            slot["start_min"] = convert_to_minutes(slot["start_time"])
            slot["end_min"] = convert_to_minutes(slot["end_time"])

    # Group slots by meet_day
    def group_by_day(slots):
        groups = {}
        for slot in slots:
            day = slot["meet_day"]
            if day not in groups:
                groups[day] = []
            groups[day].append(slot)
        return groups

    group1 = group_by_day(slot1)
    group2 = group_by_day(slot2)

    # Check for overlapping slots on the same day
    for day in group1:
        if day in group2:
            for s1 in group1[day]:
                for s2 in group2[day]:
                    # Check for overlap
                    if not (s1["end_min"] <= s2["start_min"] or s2["end_min"] <= s1["start_min"]):
                        # Add conflict pair to conflictions set
                        conflict_pair = tuple(sorted([str(s1), str(s2)]))
                        conflictions.add(conflict_pair)
                        return True  # Overlap found

    return False  # No overlap found





# Function to check if a combination of components has no overlapping time slots
def is_valid_combination(components):



    # If there are fewer than 2 components, no conflict check is needed.
    if len(components) < 2:
        return True

    # Prepare all unique pairs (i, j) with i < j.
    pairs = [(i, j) for i in range(len(components)) for j in range(i + 1, len(components))]

    # Define a helper function for checking a pair.
    # To ensure picklability, we assign its __module__ to "__main__".
    def check_pair(pair):
        i, j = pair
        return time_slots_overlap(
            [json.loads(remove_escape_chars(components[i]["meetingTimes"])), components[i]["meets"]],
            [json.loads(remove_escape_chars(components[j]["meetingTimes"])), components[j]["meets"]],
            set()  # New set for each call to avoid conflicts.
        )
    

    # Use a ProcessPoolExecutor to check pairs concurrently.
    with concurrent.futures.ProcessPoolExecutor() as executor:
        # executor.map returns results in order. As soon as a conflict is found, we can exit.
        for result in executor.map(check_pair, pairs):
            if result:
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

