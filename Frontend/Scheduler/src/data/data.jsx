import { createContext, useState,useEffect,useContext,useRef  } from "react";

export const DataContext = createContext();



export const transition_handler =  async (course,setcart_data,cart_data,api_url,temp_ava,semester,setavailabilities_data,individual_classes,setindividual_classes) => {

    let response_json;
    let individual;

    let result;
    let temp_course = Object.keys(course)[0]


    const ava_post = async () => {    
        const response = await fetch((api_url + '/course_scheduler/availabilities_helper'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"base": course, "campus": course[temp_course][Object.keys(course[temp_course])[0]].campus, "season_year": semester, "subject": temp_course.split(" ")[0] }), // Form data automatically sets the appropriate Content-Type
        });
        if (response.ok) {
            const responseData = await response.json(); // Parse the JSON response
            return responseData
        } else {
        return 1
    }
    };


    const postFormData = async () => {    
    const response = await fetch((api_url + '/course_scheduler/group_class_components?campus=' + course[temp_course][Object.keys(course[temp_course])[0]].campus), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course), // Form data automatically sets the appropriate Content-Type
    });
    if (response.ok) {
        const responseData = await response.json(); // Parse the JSON response
        return responseData
    } else {
    return 1
    }
    };

    const individual_classes_post = async () => {    
        const response = await fetch((api_url + '/course_scheduler/pairer_no_remove'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response_json), // Form data automatically sets the appropriate Content-Type
        });
        if (response.ok) {
            const responseData = await response.json(); // Parse the JSON response
            return responseData
        } 
        };



    if (temp_ava){
        result = await ava_post()
        course = result[0]
        response_json = await postFormData()




        setavailabilities_data(prevCartData => {
            if (response_json !== 1) {
                let updatedData = {
                    ...prevCartData,
                    ...result[1] // Adds an empty string to temp_course key1
                };
                return updatedData;
            } else{
                
            }});

    } else{
        response_json = await postFormData()
    }


    individual = await individual_classes_post()






    setindividual_classes(previndividual_classe => {
            if (response_json !== 1) {
                let updatedData = {
                    ...previndividual_classe,
                    ...individual // Adds an empty string to temp_course key1
                };
                return updatedData;
            }
    });

    setcart_data(prevCartData => {
        if (response_json !== 1) {
            let updatedData = {
                ...prevCartData,
                ...response_json // Adds an empty string to temp_course key1
            };
            return updatedData;
        }

    });


    
};



function transition_helper(obj,availabilities_data) {

    // Loop through each key in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Check if the value is an object itself
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          // If it's an object, recursively traverse it
          transition_helper(obj[key],availabilities_data);
        } else {
          // If it's a value (not an object), log or collect it
          obj["Professor"] = availabilities_data[obj["code"].split(" ")[0]][obj["campus"]][obj["code"] + ", " + obj["no"]]["Professor"];
          obj["instruction_method"] = availabilities_data[obj["code"].split(" ")[0]][obj["campus"]][obj["code"] + ", " + obj["no"]]["instruction_method"];
          obj["time"] = availabilities_data[obj["code"].split(" ")[0]][obj["campus"]][obj["code"] + ", " + obj["no"]]["time"];

        }
      }
    }
}




export const DataProvider = ({ children }) => {
    const api_url = 'http://127.0.0.1:5123';  // Immutable message

    const [campus, set_campuss] = useState("-");
    const [semester, set_semester] = useState("-");

    const [class_lock, set_class_lock] = useState({});

    const [searched_data, setsearched_data] = useState({});
    const [transition_data, settransition_data] = useState([]);


    const [availabilities_data, setavailabilities_data] = useState({});
    const [cart_data, setcart_data] = useState({});
    const [init_search, set_init_search] = useState(true);



    const [individual_classes,setindividual_classes] = useState({});

    const [classes_combinations,setclasses_combinations] = useState({});
    const [valid_class_combinations,setvalid_class_combinations] = useState({});
    const [class_combinations,setclass_combinations] = useState({});

    const [newgen,setnewgen] = useState(false);

    class_combinations
    const [temp_events,settemp_events] = useState({});
    const [temp_schedule,settemp_schedule] = useState({});
    const [session_id_user,setsession_id_user] = useState(null);


    useEffect(() => {



    }, [classes_combinations]);class_lock

    useEffect(() => {

    }, [valid_class_combinations]);





    useEffect(() => {

        setvalid_class_combinations({})
        setclasses_combinations({})
        set_init_search(true)
        set_init_search(false)
        setnewgen(false)

    }, [cart_data,class_lock]);




    useEffect(() => {


    }, [campus]);

    useEffect(() => {



    }, [semester]);





    useEffect(() => {


    }, [individual_classes]); 

    useEffect(() => {
    if (transition_data.length !== 0) {
        let course = transition_data[transition_data.length - 1]; // Get last element
        let temp_course = Object.keys(course)[0]
        let c_campus = course[temp_course][Object.keys(course[temp_course])[0]].campus

        if ((temp_course.split(" ")[0]) in availabilities_data){
            if(c_campus in availabilities_data[temp_course.split(" ")[0]]){
                transition_helper(course,availabilities_data)

                setcart_data(prevCartData => {
                    let updatedData = {
                        ...prevCartData,
                        [temp_course]: ""  };
                        return updatedData})


                setindividual_classes(prevCartData => {
                            let updatedData = {
                                ...prevCartData,
                                [temp_course]: ""  };
                                return updatedData})



                transition_handler(course,setcart_data,cart_data,api_url,0,semester,setavailabilities_data,individual_classes,setindividual_classes);

            }
            else{

                setcart_data(prevCartData => {
                    let updatedData = {
                        ...prevCartData,
                        [temp_course]: ""  };
                        return updatedData})
        
                        setindividual_classes(prevCartData => {
                            let updatedData = {
                                ...prevCartData,
                                [temp_course]: ""  };
                                return updatedData})

                

                transition_handler(course,setcart_data,cart_data,api_url,1,semester,setavailabilities_data,individual_classes,setindividual_classes);
                

            }
        }
        else {
            setcart_data(prevCartData => {
                let updatedData = {
                    ...prevCartData,
                    [temp_course]: ""  };
                    return updatedData})

                    setindividual_classes(prevCartData => {
                        let updatedData = {
                            ...prevCartData,
                            [temp_course]: ""  };
                            return updatedData})

                    transition_handler(course,setcart_data,cart_data,api_url,1,semester,setavailabilities_data,individual_classes,setindividual_classes);
                }
        


        settransition_data(prevData => prevData.slice(0, -1)); // Remove last element immutably
    }
    }, [transition_data]); 


    useEffect(() => {


    }, [availabilities_data]); 





    return (
        <DataContext.Provider value={{setsession_id_user, session_id_user,class_combinations,setclass_combinations, newgen, setnewgen, api_url, campus, set_campuss, semester, set_semester, searched_data, setsearched_data, cart_data, setcart_data, transition_data, settransition_data , availabilities_data, setavailabilities_data,individual_classes,setindividual_classes,classes_combinations,setclasses_combinations,valid_class_combinations,setvalid_class_combinations,temp_events,settemp_events,temp_schedule,settemp_schedule, class_lock, set_class_lock,init_search,set_init_search}}>
            {children}
        </DataContext.Provider>
    );
};