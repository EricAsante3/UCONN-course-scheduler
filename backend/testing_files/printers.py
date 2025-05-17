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



def file_exists_in_folder(filename, folder):
    """
    Check if a specific file exists in a given folder.

    Args:
        filename (str): The name of the file (e.g., 'output.txt').
        folder (str): The folder path where to look for the file.

    Returns:
        bool: True if the file exists, False otherwise.
    """
    filepath = os.path.join(folder, filename)
    return os.path.isfile(filepath)


