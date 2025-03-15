import json


day_mapping = {
    "Online":"Online",
    "M": "Monday",
    "T": "Tuesday",
    "W": "Wednesday",
    "Th": "Thursday",
    "TH": "Thursday",
    "F": "Friday"
}


def get_days_from_combined_string(day_string):
    # Initialize an empty list to store the full day names
    if day_string == "Online":
        return["Online"]
    
    days = []

    i = 0  # Start index
    while i < len(day_string):
        if i + 1 < len(day_string) and ((day_string[i:i+2] == 'TH') or (day_string[i:i+2] == 'Th')):  # Check if it's Thursday
            days.append(day_mapping['TH'])
            i += 2  # Skip next character ('H' in 'TH')
        else:
            days.append(day_mapping[day_string[i]])  # Add day from map
            i += 1  # Move to the next character
    return days

def json_printer(courses, file_name):
    """Writes json to a .txt file""" 
    with open(('./' + file_name + '.txt'), 'w') as file:
            json.dump(courses, file, indent=4)

def schedule_printer(valid_permutations, file_name):
    """Writes json to a .txt file""" 
# Open a file to write the output (e.g., 'schedule.txt') in write mode ('w')
    with open('schedule.txt', 'w') as file:
        for i, permutation in enumerate(valid_permutations, 1):
            # Write the schedule header to the file
            file.write(f"\nPossible Schedule {i}:\n" + "-" * 50 + "\n")

            # Organize schedule by days of the week
            schedule_by_day = {"Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": []}

            for component in permutation:
                for course in component:
                    meets = course['meets']
                    crn = course['crn']
                    code = course['code']
                    
                    # Extract day and time from the 'meets' string
                    if meets == "Online Instruction":
                        days = "Online"
                        time = "Asynchronous"
                    else:
                        days, time = meets.split(" ", 1)
                    
                    # Map abbreviations to full day names
                    for short_day in get_days_from_combined_string(days):
                        schedule_by_day[short_day].append(f"Class {code}, CRN {crn}: {time}")

            # Write the formatted schedule to the file
            for day, classes in schedule_by_day.items():
                if classes:
                    file.write(f"{day}:\n")
                    for cls in classes:
                        file.write(f"  - {cls}\n")
            
            # Write the separator line at the end of each schedule
            file.write("-" * 50 + "\n")
