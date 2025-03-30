from flask import Flask, jsonify, request, session
from flask_session import Session
import json
import redis
import os
import secrets
import ast
import pickle

from flask_cors import CORS

from data_collection_files.filter_list_creator import filter_maker
from data_collection_files.course_fetcher import course_fetcher
from data_collection_files.class_components_files.components_finder import components_adder

from data_collection_files.seat_open_files.availabilities_finder import availabilities_adder
from data_collection_files.seat_open_files.availabilities_adder import availabilities_helper

from scheduling_files.componet_combiner import pairer
from scheduling_files.componet_combiner_no_remove import pairer_no_remove
from scheduling_files.class_combiner import combination_maker





from scheduling_files.builder import schedule_maker
from scheduling_files.class_combiner import combination_maker
from scheduling_files.class_combiner import combination_maker_continuation
from testing_files.printers import json_printer

# Initialize the Flask application
app = Flask(__name__)
CORS(app) # note to self may change

app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY', secrets.token_hex(32))  # Secure & dynamic
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.Redis(host='localhost', port=6380, db=0, decode_responses=True)

Session(app)

redis_client = redis.Redis(host='localhost', port=6380, db=0, decode_responses=True)



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



@app.route('/course_scheduler/pairer_no_remove', methods=['POST']) # pass this to ethan section possilbel class componets
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
        "Summer 2025": "1255",
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
        "Summer 2025": "1255",
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
@app.route('/course_scheduler/combinations_maker', methods=['POST'])
def make_combinations():

    if 'session_id' not in session:
        session['session_id'] = request.cookies.get('session', str(hash(request.remote_addr)))  # Assign a session ID if not set
        session.modified = True  # Make sure to update the session

    session_id = session['session_id']
    data = request.get_json()

    class_combinations = combination_maker(data["classes"],data["lock"],data["availabilities"])
    if len(class_combinations) != 1:
        redis_client.set(f"full:{session_id}", str(class_combinations[1]))
        redis_client.set(f"not_full:{session_id}", str(class_combinations[2]))
        redis_client.set(f"conflict:{session_id}", str(class_combinations[3]))
        redis_client.set(f"no_conflict:{session_id}", str(class_combinations[4]))
        redis_client.set(f"combinationss:{session_id}", str(class_combinations[5]))
        redis_client.set(f"sliceindex:{session_id}", str(class_combinations[6]))

    return {"classes":class_combinations[0],"session":session_id}

# POST: Add a new task
@app.route('/course_scheduler/combinations_maker_continue', methods=['POST'])
def make_combinations_continue():
    data = request.get_json()
    session_id = data["session_id"]

    # Retrieve values from Redis and use ast.literal_eval to convert them to Python objects
    full = redis_client.get(f"full:{session_id}")
    not_full = redis_client.get(f"not_full:{session_id}")
    conflict = redis_client.get(f"conflict:{session_id}")
    no_conflict = redis_client.get(f"no_conflict:{session_id}")
    combinationss = redis_client.get(f"combinationss:{session_id}")
    sliceindex = redis_client.get(f"sliceindex:{session_id}")
    # Safely convert string representations of Python objects to actual objects

    full = eval(full) if full else None
    not_full = eval(not_full) if not_full else None
    conflict = eval(conflict) if conflict else None
    no_conflict = eval(no_conflict) if no_conflict else None
    combinationss = eval(combinationss) if combinationss else None
    sliceindex = eval(sliceindex) if sliceindex else None


    class_combinations = combination_maker_continuation(data["lock"],data["ava"],full,not_full,conflict,no_conflict,combinationss,sliceindex)

    if len(class_combinations) != 1:
        redis_client.set(f"full:{session_id}", str(class_combinations[1]))
        redis_client.set(f"not_full:{session_id}", str(class_combinations[2]))
        redis_client.set(f"conflict:{session_id}", str(class_combinations[3]))
        redis_client.set(f"no_conflict:{session_id}", str(class_combinations[4]))
        redis_client.set(f"sliceindex:{session_id}", str(class_combinations[5]))

    if class_combinations[0] == {}:
        return "done"
        
    return class_combinations[0]







if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5123)