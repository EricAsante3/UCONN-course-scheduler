from flask import Flask, jsonify, request
from data_collection_files.filter_list_creator import filter_maker
from data_collection_files.course_fetcher import course_fetcher
from data_collection_files.class_components_files.components_finder import components_adder

from scheduling_files.componet_combiner import pairer
from scheduling_files.builder import schedule_maker

# Initialize the Flask application
app = Flask(__name__)


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
    
    schedules = schedule_maker(classes_with_componets)

    return jsonify(schedules)





if __name__ == '__main__':
    app.run(debug=True)