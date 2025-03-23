import re
import json

def RC_string_converter(input_string):
    # Regular expression to match the pattern
    pattern = re.compile(r'(\d+)\s+for\s+RC\s+([\w\s-]+?)\s+majors')
    
    # Find all matches in the input string
    matches = pattern.findall(input_string)
    
    # Create a dictionary to store the results
    result = {}
    
    for match in matches:
        count = int(match[0])
        major = match[1].strip()  # Remove any extra whitespace
        
        # If the major is already in the result, add the count to the existing value
        if major in result:
            result[major] += count
        else:
            result[major] = count
    
    # Convert the dictionary to a JSON string
    json_output = json.dumps(result, indent=4)
    
    return json_output

# Example usage
if __name__ == "__main__":
    input_string = "3 for RC Mathematics majors"
    json_output = RC_string_converter(input_string)
    print(json_output)