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


