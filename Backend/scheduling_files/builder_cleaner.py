import re
import json


def schedule_cleaner(data, availabilities):
    remove = []
    for i in list(data.keys()):
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