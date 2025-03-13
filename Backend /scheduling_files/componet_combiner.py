import itertools
import json
import copy



def pairer(class_info):

    # Iterate over each class in the dictionary
    class_componets = {(list(class_info.keys())[0]): []}
    for class_name, crn_dict in class_info.items():
        # Iterate over each CRN in the class
        for crn, class_details in crn_dict.items():
            # Extract the base class (lecture)
            base_class = class_details
            if base_class["Seats Available"] == 0:
                continue

            # Extract all required components dynamically
            required_components = {}


            if class_details["required"] == "":
                base_class.pop("required", None)
                class_componets[(list(class_info.keys())[0])].append([base_class])

            elif (len(class_details["required"]) == 1):


                for component_type, component_dict in class_details["required"].items():
                    required_components[component_type] = [
                        value for value in component_dict.values() if value["Seats Available"] != 0
                    ]

                
                base_class.pop("required", None)

                component_lists = []
                for comp in required_components:
                    component_lists.append(required_components[comp])
                
                combinations = list(itertools.product([base_class], *component_lists))
                class_componets[(list(class_info.keys())[0])].extend(combinations)



            else:
                required_parts = class_details["required"]
                base_class_copy = copy.deepcopy(base_class)
                base_class_copy.pop("required", None)
                required_parts_keys = list(required_parts.keys())
                startindex = len(required_parts_keys)-1
                for i in class_details["required"][required_parts_keys[startindex]]:
                    if class_details["required"][required_parts_keys[startindex]][i]["Seats Available"] == 0:
                        continue
                    temp_list = []
                    temp_list.append(base_class_copy)
                    temp_list.append(class_details["required"][required_parts_keys[startindex]][i])
                    for m in range(0,len(required_parts_keys)-1):
                        if (i in class_details["required"][required_parts_keys[m]]):
                            temp_list.append(class_details["required"][required_parts_keys[m]][i])
                    class_componets[(list(class_info.keys())[0])].append(temp_list)


                        
    if [] in list(class_componets.values()):
        return None

    return class_componets