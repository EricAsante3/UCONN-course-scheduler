import { createContext, useState,useEffect,useContext,useRef  } from "react";

export const DataContext = createContext();



export const transition_handler =  async (course,setcart_data,cart_data,api_url,campus) => {

    const postFormData = async () => {    
            const response = await fetch((api_url + '/course_scheduler/group_class_components?campus=' + campus), {
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


    let response_json = await postFormData()

    setcart_data(prevCartData => {
        if (response_json !== 1) {
            let updatedData = {
                ...prevCartData,
                ...response_json // Adds an empty string to temp_course key1
            };
            return updatedData;
        } else{
            
        }

    });


    
  };










export const DataProvider = ({ children }) => {

    const api_url = 'http://127.0.0.1:5000';  // Immutable message

    const [campus, set_campuss] = useState("Storrs");
    const [semester, set_semester] = useState("Fall 2025");
    const [searched_data, setsearched_data] = useState({});
    const [transition_data, settransition_data] = useState([]);
    const [cart_data, setcart_data] = useState({});






    useEffect(() => {

        console.log(cart_data)

    }, [cart_data]); 


    useEffect(() => {
    if (transition_data.length !== 0) {
        let course = transition_data[transition_data.length - 1]; // Get last element

        let temp_course = Object.keys(course)[0]
        setcart_data(prevCartData => {
            let updatedData = {
                ...prevCartData,
                [temp_course]: ""  };
                return updatedData})

        settransition_data(prevData => prevData.slice(0, -1)); // Remove last element immutably
        transition_handler(course,setcart_data,cart_data,api_url,campus);
    }
    }, [transition_data]); 







    return (
        <DataContext.Provider value={{ api_url, campus, set_campuss, semester, set_semester, searched_data, setsearched_data, cart_data, setcart_data, transition_data, settransition_data}}>
            {children}
        </DataContext.Provider>
    );
};