import itertools
import json

def send_txt(courses):
    """Writes json to a .txt file"""
    with open('./paired_class_components.txt', 'w') as file:
            json.dump(courses, file, indent=4)

def requirement_pairer(class_info):
    # Iterate over each class in the dictionary
    send_txt(class_info)
    class_componets = {(list(class_info.keys())[0]): []}
    for class_name, crn_dict in class_info.items():
        # Iterate over each CRN in the class
        for crn, class_details in crn_dict.items():
            # Extract the base class (lecture)
            base_class = class_details
            # Extract all required components dynamically
            required_components = {}
            if class_details["required"] == "":
                base_class.pop("required", None)
                class_componets[(list(class_info.keys())[0])].append([base_class])
            elif (len(class_details["required"]) == 1):
                for component_type, component_dict in class_details["required"].items():
                    required_components[component_type] = list(component_dict.values())
                base_class.pop("required", None)
                component_lists = [required_components[comp] for comp in required_components]
                combinations = list(itertools.product([base_class], *component_lists))
                class_componets[(list(class_info.keys())[0])].extend(combinations)
            else:
                print("jj")

    send_txt(class_componets)
    return class_componets
         




if __name__ == "__main__":
    requirement_pairer()