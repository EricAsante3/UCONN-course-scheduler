import re
import json

def is_subset(arr1, arr2):
    # Convert both arrays to sets and check if arr1 is a subset of arr2
    return set(arr1).issubset(set(arr2))



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



def schedule_cleaner(data, availabilities, class_lock):
    remove = []



    for i in list(data.keys()):
        if len(class_lock) != 0:
            if is_subset(list(class_lock.values()), extract_integers(i)) == False:
                remove.append(i)
                continue


        parts = i.split(".")
        for i in parts:
            if i in remove:
                continue
            location = i.split("(")[0]
            subject =  ((i.split(",")[0]).split("(")[1]).split(" ")[0]
            code =  ((i.split(",")[0]).split("(")[1])

            sections = re.findall(r"_(\w+?)_", i)
            for k in sections:
                capacity = availabilities[subject][location][f"{code}, {k}"]["Enrollment Capacity"]
                total = availabilities[subject][location][f"{code}, {k}"]["Enrollment Total"]
                if ((capacity - total) <= 0):
                    remove.append(i)
                    break


    data = {k: v for k, v in data.items() if not any(sub in k for sub in remove)}
    return data