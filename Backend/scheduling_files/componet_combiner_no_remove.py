import itertools
import json
import copy

def pairer_no_remove(class_info):

    # Iterate over each class in the dictionary
    class_componets = {key: {} for key in class_info.keys()}
    for class_name, crn_dict in class_info.items():
        # Iterate over each CRN in the class
        for crn, class_details in crn_dict.items():
            # Extract the base class (lecture)
            base_class = class_details

            # Extract all required components dynamically
            required_components = {}


            if class_details["required"] == "":
                base_class.pop("required", None)
                if base_class["Professor"] in class_componets[class_name]:
                    class_componets[class_name][base_class["Professor"]].update({f'{base_class["campus"]}({base_class["code"]}, {base_class["no"]}){base_class["crn"]}': [base_class]})        
                else:
                    class_componets[class_name][base_class["Professor"]] = {}
                    class_componets[class_name][base_class["Professor"]].update({f'{base_class["campus"]}({base_class["code"]}, {base_class["no"]}){base_class["crn"]}': [base_class]})        


            elif (len(class_details["required"]) == 1):
                for component_type, component_dict in class_details["required"].items():
                    required_components[component_type] = [
                        value for value in component_dict.values()
                    ]
                base_class.pop("required", None)
                component_lists = []
                for comp in required_components:
                    component_lists.append(required_components[comp])
                combinations = list(itertools.product([base_class], *component_lists))
                result_dict = { f"{lst[-1]['campus']}({lst[-1]['code']}, {lst[-1]['no']}){lst[-1]['crn']}": lst for lst in combinations }
                if base_class["Professor"] in class_componets[class_name]:
                    class_componets[class_name][base_class["Professor"]].update(result_dict)
                else:
                    class_componets[class_name][base_class["Professor"]] = {}
                    class_componets[class_name][base_class["Professor"]].update(result_dict)

            else:
                required_parts = class_details["required"]
                base_class_copy = copy.deepcopy(base_class)
                base_class_copy.pop("required", None)
                required_parts_keys = list(required_parts.keys())
                startindex = len(required_parts_keys)-1
                for i in class_details["required"][required_parts_keys[startindex]]:
                    temp_list = []
                    temp_list.append(base_class_copy)
                    temp_list.append(class_details["required"][required_parts_keys[startindex]][i])
                    for m in range(0,len(required_parts_keys)-1):
                        if (i in class_details["required"][required_parts_keys[m]]):
                            temp_list.append(class_details["required"][required_parts_keys[m]][i])                    
                    if base_class["Professor"] in class_componets[class_name]:
                        class_componets[class_name][base_class["Professor"]].update({f'{temp_list[-1]["campus"]}({temp_list[-1]["code"]}, {temp_list[-1]["no"]}){temp_list[-1]["crn"]}': temp_list})        
                    else:
                        class_componets[class_name][base_class["Professor"]] = {}
                        class_componets[class_name][base_class["Professor"]].update({f'{temp_list[-1]["campus"]}({temp_list[-1]["code"]}, {temp_list[-1]["no"]}){temp_list[-1]["crn"]}': temp_list})        


    return class_componets