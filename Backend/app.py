from flask import Flask, jsonify, request
from flask_cors import CORS

from data_collection_files.filter_list_creator import filter_maker
from data_collection_files.course_fetcher import course_fetcher
from data_collection_files.class_components_files.components_finder import components_adder

from scheduling_files.componet_combiner import pairer
from scheduling_files.builder import schedule_maker

from testing_files.printers import json_printer

# Initialize the Flask application
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) # note to self may change

@app.route('/', methods=['GET'])
def home():
    return "Course scheduler"



# POST: Add a new task
@app.route('/course_scheduler/get_classes', methods=['POST'])
def get_classes():
    '''
        REQUEST BODY MUST BE   
    {
        "alias": "",
        "season_year": "",
        "campus": "",
        "subject": "",
        "C_area": "",
        "hours": "",
        "instruction_method": ""


        "course_attribute_TOI1": "Y  or N"
        "course_attribute_TOI2": "Y  or N"
        "course_attribute_TOI3": "Y  or N"
        "course_attribute_TOI4": "Y  or N"
        "course_attribute_TOI5": "Y  or N"
        "course_attribute_TOI6": "Y  or N"
        "course_attribute_TOI6L": "Y  or N"




        
        "competency_COMPE":
        "competency_COMPQ":
        "competency_COMPW":
        "Any": ""



        "in_person": Y
        "hybrid_blended": Y
        "online": Y

        "honors": Y
        "service_learning": Y
    }
    '''

    # Get the JSON data sent in the request body
    data = request.get_json()
    filter_list = filter_maker(data)
    courses = course_fetcher(filter_list)
    return jsonify(courses)


# POST: Add a new task
@app.route('/course_scheduler/group_class_components', methods=['POST'])
def group_class_components():
    '''
        REQUEST BODY MUST BE   
    {
        "CSE 1010": {Class Info},
        "CSE 2050": {Class Info}
    }
    '''

    # Get the JSON data sent in the request body
    data = request.get_json()
    course_list_with_dependents = {}
    campus = request.args.get('campus')  # Gets 'campus' from the query string

    for key, value in data.items():
        course_list_with_dependents.update(components_adder(value, campus))

    return jsonify(course_list_with_dependents)




# POST: Add a new task
@app.route('/course_scheduler/make_schedule', methods=['POST'])
def make_schedule():
    '''
        REQUEST BODY MUST BE   
    {
        "CSE 1010": {Class Info after components are grouped},
        "CSE 2050": {Class Info after components are grouped}
    }
    '''

    # Get the JSON data sent in the request body
    data = request.get_json()
    classes_with_componets = pairer(data)

    if len(classes_with_componets[1]) == 0:
        schedules = schedule_maker(classes_with_componets[0])
        return jsonify(schedules)
    else:
        return(classes_with_componets)





if __name__ == '__main__':
    app.run(debug=True)