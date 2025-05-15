import json
import os

def json_printer(courses, file_name):
    """Writes json to a .txt file""" 
    with open(('./' + file_name + '.txt'), 'w') as file:
            json.dump(courses, file, indent=4)

def write_to_txt(text, filename="output.txt"):
    with open(filename, "w") as file:
        file.write(text)

def write_to_txt_folder(text, filename, folder):
    # Create folder if it doesn't exist
    os.makedirs(folder, exist_ok=True)

    # Full path to the output file
    filepath = os.path.join(folder, filename)

    # Write the text to the file
    with open(filepath, "w") as file:
        file.write(text)

