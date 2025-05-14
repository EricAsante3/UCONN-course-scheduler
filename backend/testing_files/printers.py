import json

def json_printer(courses, file_name):
    """Writes json to a .txt file""" 
    with open(('./' + file_name + '.txt'), 'w') as file:
            json.dump(courses, file, indent=4)

def write_to_txt(text, filename="output.txt"):
    with open(filename, "w") as file:
        file.write(text)