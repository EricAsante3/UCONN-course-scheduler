import hashlib


day_mapping = {
    "Online":"Online",
    "M": "Monday",
    "T": "Tuesday",
    "W": "Wednesday",
    "Th": "Thursday",
    "TH": "Thursday",
    "F": "Friday"
}


day_to_date = {
    'Sunday': '2025-08-24',
    'Monday': '2025-08-25',
    'Tuesday': '2025-08-26',
    'Wednesday': '2025-08-27',
    'Thursday': '2025-08-28',
    'Friday': '2025-08-29',
    'Saturday': '2025-08-30'
}

def convert_to_24_hour_format(time_range):
    # Split the input into start time, end time, and period (AM/PM)
    time_part, period = time_range[:-1], time_range[-1]
    start_time, end_time = time_part.split('-')
    
    # Convert start time to 24-hour format
    start_hour, start_minute = map(int, start_time.split(':'))
    if period == 'p' and start_hour != 12:
        start_hour += 12
    elif period == 'a' and start_hour == 12:
        start_hour = 0
    
    # Convert end time to 24-hour format
    end_hour, end_minute = map(int, end_time.split(':'))
    if period == 'p' and end_hour != 12:
        end_hour += 12
    elif period == 'a' and end_hour == 12:
        end_hour = 0
    
    # Format the times as HH:MM
    start_time_24h = f"{start_hour:02d}:{start_minute:02d}"
    end_time_24h = f"{end_hour:02d}:{end_minute:02d}"
    
    return start_time_24h, end_time_24h


def split_multiple_slots(slot):
        # Strip leading/trailing spaces and split by semicolon
    return [s.strip() for s in slot.split(";") if s.strip()]

def string_to_light_hex(s):
    # Create a hash of the string
    hash_value = hashlib.md5(s.encode()).hexdigest()
    
    # Convert parts of the hash to RGB values
    r = (int(hash_value[:2], 16) % 106) + 150  # Ensure 150-255 range
    g = (int(hash_value[2:4], 16) % 106) + 150
    b = (int(hash_value[4:6], 16) % 106) + 150
    
    # Convert to hex format
    return f'#{r:02X}{g:02X}{b:02X}'



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



    
events = []
calendars_themes = {}

for i in data[0]:
    for k in i:
        if k["code"].replace(" ", "_") not in calendars_themes:
            temp_dic2 = {}
            temp_dic2
            calendars_themes[k["code"].replace(" ", "_")] = {}
            calendars_themes[k["code"].replace(" ", "_")]["colorName"] = k["code"].replace(" ", "_")
            calendars_themes[k["code"].replace(" ", "_")]["lightColors"] = {}
            calendars_themes[k["code"].replace(" ", "_")]["lightColors"]["main"] = string_to_light_hex((k["code"].replace(" ", "_")))
            calendars_themes[k["code"].replace(" ", "_")]["lightColors"]["container"] = string_to_light_hex(k["code"].replace(" ", "_"))
            calendars_themes[k["code"].replace(" ", "_")]["lightColors"]["onContainer"] = '#000000'


        id = k["code"] + ", " + k["no"]
        title = k["code"] + " (" + k["schd"] + ")"
        graphed = []
        for m in split_multiple_slots(k["meets"]):
            if m in graphed:
                continue
            graphed.append(m)
            
            days = get_days_from_combined_string(m.split(" ")[0])
            time = convert_to_24_hour_format(m.split(" ")[1])
            for q in days:
                if q == "Online":
                    continue
                temp_dic = {}
                temp_dic["id"] = id
                temp_dic["title"] = title
                temp_dic["start"] = day_to_date[q] + " " + time[0]
                temp_dic["end"] = day_to_date[q] + " " + time[1]
                events.append(temp_dic)







