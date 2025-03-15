import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [searched_data, setsearched_data] = useState({"cse 1010":{"2112":"info1","89902":"info1"}});
    const [cart_data, setcart_data] = useState("requirments info");


    return (
        <DataContext.Provider value={{ searched_data, setsearched_data, cart_data, setcart_data}}>
            {children}
        </DataContext.Provider>
    );
};