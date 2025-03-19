from flask import Flask, jsonify, request
from flask_cors import CORS

from data_collection_files.filter_list_creator import filter_maker
from data_collection_files.course_fetcher import course_fetcher
from data_collection_files.class_components_files.components_finder import components_adder

from scheduling_files.componet_combiner import pairer
from scheduling_files.componet_combiner_no_remove import pairer_no_remove




from data_collection_files.seat_open_files.availabilities_finder import availabilities_adder
from data_collection_files.seat_open_files.availabilities_adder import availabilities_helper



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
        course_list_with_dependents.update(components_adder(value))

    return jsonify(course_list_with_dependents)



@app.route('/course_scheduler/pairer_no_remove', methods=['POST'])
def pair_class_components():
    '''
        REQUEST BODY MUST BE   
    {
        "CSE 1010": {Class Info after components are grouped},
        "CSE 2050": {Class Info after components are grouped}
    }
    '''

    # Get the JSON data sent in the request body
    data = request.get_json()
    classes_with_componets = pairer_no_remove(data)
    return classes_with_componets



@app.route('/course_scheduler/class_availabilities', methods=['POST'])
def class_availabilities():
    '''
        REQUEST BODY MUST BE   
    {
        "campus":...
        "season_year":...
        "subject":...
    }
    '''

    season_year = {
        "Fall 2025": "1258",
        "Spring 2025": "1253",
        "Winter 2025": "1251",
        "Fall 2024": "1248",
        "Spring 2024": "1243"
    }

    # Get the JSON data sent in the request body
    data = request.get_json()



    availabilities = availabilities_adder(data["campus"],season_year[data["season_year"]],data["subject"])
    return availabilities


@app.route('/course_scheduler/availabilities_helper', methods=['POST'])
def availability_helper():
    '''
        REQUEST BODY MUST BE   
    {
        base:
        dic:
        campus
        season_year
        subject
    }
    '''




    season_year = {
        "Fall 2025": "1258",
        "Spring 2025": "1253",
        "Winter 2025": "1251",
        "Fall 2024": "1248",
        "Spring 2024": "1243"
    }

    # Get the JSON data sent in the request body
    data = request.get_json()

    availabilities = availabilities_adder(data["campus"],season_year[data["season_year"]],data["subject"])

    availabilities_helper(data["base"],availabilities)
    return [data["base"],availabilities]

















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