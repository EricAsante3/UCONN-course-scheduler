import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const api_url = 'http://127.0.0.1:5000';  // Immutable message


    const [campus, set_campuss] = useState("Storrs");
    const [semester, set_semester] = useState("Fall 2025");


    const [searched_data, setsearched_data] = useState({});
    
    const [cart_data, setcart_data] = useState("requirments info");


    return (
        <DataContext.Provider value={{ api_url, campus, set_campuss, semester, set_semester, searched_data, setsearched_data, cart_data, setcart_data}}>
            {children}
        </DataContext.Provider>
    );
};