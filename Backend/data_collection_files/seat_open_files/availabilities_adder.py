from .availabilities_finder import availabilities_adder

def requirement_pairer(class_info, campus):
    # Iterate over each class in the dictionary
    for class_name, crn_dict in class_info.items():
        # Iterate over each CRN in the class
        for crn, class_details in crn_dict.items():
            # Extract the base class (lecture)
            base_class = class_details
            data = availabilities_adder(campus, base_class["srcdb"], base_class["code"]) # change campus later
            base_class.update(data[(base_class["code"] + ", " + base_class["no"])])
            # Extract all required components dynamically
            required_components = {}
            if class_details["required"] != "":
                for component_type, component_dict in class_details["required"].items():
                    for req_crn, req_class_details in component_dict.items():
                        req_class_details.update(data[(req_class_details["code"] + ", " + req_class_details["no"])])


def availabilities_helper(obj, availabilities_data):
    # Iterate over a copy of the dictionary's keys
    for key in list(obj.keys()):  # Use list() to create a copy of the keys
        value = obj[key]

        # Check if the value is a dictionary (equivalent to JavaScript's object)
        if isinstance(value, dict):
            # If it's a dictionary, recursively traverse it
            availabilities_helper(value, availabilities_data)

        # Check if the current object represents a course section
        if "code" in obj and "campus" in obj and "no" in obj:
            code_prefix = obj["code"].split(" ")[0]  # Extract course prefix (e.g., "ACCT")
            campus = obj["campus"]
            lookup_key = f"{obj['code']}, {obj['no']}"  # Construct lookup key

            # Check if the required data exists in availabilities_data
            if (code_prefix in availabilities_data and
                campus in availabilities_data[code_prefix] and
                lookup_key in availabilities_data[code_prefix][campus]):
                # Add Professor and instruction_method fields
                obj["Professor"] = availabilities_data[code_prefix][campus][lookup_key]["Professor"]
                obj["instruction_method"] = availabilities_data[code_prefix][campus][lookup_key]["instruction_method"]
            else:
                # If data is not found, set default values
                obj["Professor"] = "Unknown"
                obj["instruction_method"] = "Unknown"