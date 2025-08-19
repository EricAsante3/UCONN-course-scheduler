"use client"

import { createContext, useState, useRef } from "react";
import { SearchBlockModel } from "@/classObjects/systemModels/searchBlockModel";
export const DataContext = createContext();

const SearchBlockSingleton = new SearchBlockModel() 


export default function DataProvider({ children }) {
    const [Campus, setCampus] = useState("Storrs");
    const [Term, setTerm] = useState("Fall 2025");

    const [searchBlockResults, setSearchBlockResults] = useState({"status": 0, "message": {}});







    async function SearchBlockFetch(Class) {
        const output = await SearchBlockSingleton.search(Class, Term, Campus)
        console.log(typeof JSON.parse(output))
        await setSearchBlockResults(JSON.parse(output))
    }

    return (
        <DataContext.Provider value={{ searchBlockResults, setSearchBlockResults, SearchBlockFetch, Campus, Term, setCampus, setTerm}}>
            {children}
        </DataContext.Provider>
  );
};
