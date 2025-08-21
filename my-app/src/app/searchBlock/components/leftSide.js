"use client"
import { useEffect, useState, useContext, useRef } from "react"
import { DataContext } from "@/data/Data"
import { classAlias } from "./classAlias"






export default function LeftSide({setLeadClass, loadingSearch, setLoadingSearch}) {
    const previousSearch = useRef(null)
    const [currentInput, setCurrentInput] = useState("");
    const {SearchBlockStates} = useContext(DataContext);


    async function action(inputarray) {
        setLoadingSearch(true)
        console.log("loadini")
        await SearchBlockStates.SearchBlockFetch(inputarray[0])
        if (inputarray.length > 1) setLeadClass(inputarray[0] + " " + inputarray[1])
        else setLeadClass(null)
        setLoadingSearch(false)
        previousSearch.current = inputarray[0]
    }


    async function handleSubmit (Class) {
        validSearch(Class)
    }


    async function validSearch(inputString) {
        let inputarray = inputString.split(" ")
        inputarray = inputarray.filter(item => item !== "")

        if (inputarray.length > 2 ){
            return false
        }
    
        if (!/^[a-zA-Z]+$/.test(inputarray[0])) return false

        if (previousSearch.current !== null) {
            if (inputarray[0] === previousSearch.current) {
                if (inputarray.length > 1) {
                    setLeadClass(inputarray[0] + " " + inputarray[1])
                } else {
                    setLeadClass(null)
                }

            } else {
                if (!classAlias.includes(inputarray[0])) return false
                await action(inputarray)
            }

        } else {
                if (!classAlias.includes(inputarray[0])) return false
                await action(inputarray)
            }
    }

    useEffect(() => {console.log(loadingSearch)}, [currentInput, loadingSearch])

  return (

    <div className="grid grid-rows-[40%_60%] p-2 rounded-2xl">

    <div className="flex flex-col justify-start mt-4">

        <div className="flex items-center mb-4 justify-between">
            <h1 className="w-fit">Search</h1>
        </div>





        <input id="smallBoxes"
            className="w-full bg-Highlight rounded-lg p-2 focus:outline-none"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(currentInput)
                }
                const allowed = /[A-Z0-9 ]/;
                const key = e.key.toUpperCase();
                
                if (
                e.key === "Backspace" ||
                e.key === "Delete" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Tab"
                ) {
                return;
                }

                if (!allowed.test(key)) {
                e.preventDefault();
                }
            }}
            placeholder="CSE or CSE 1010... etc"
            disabled={loadingSearch}
        />

        

        <div className="mt-4 flex flex-row justify-start items-start w-full space-x-4">

            <div className="w-full">                
                <select className="w-full" disabled={loadingSearch} value={SearchBlockStates.Term} onChange={(e) => {
                SearchBlockStates.setTerm(e.target.value)
                setLeadClass(null)
                SearchBlockStates.setSearchBlockResults({"status": 0, "value": {}})
                previousSearch.current = null
                }}>                        
                    <option value="Fall 2025">Fall 2025</option>
                    <option value="Spring 2026">Spring 2026</option>
                    <option value="Summer 2026">Summer 2026</option>
                    <option value="Fall 2026">Fall 2026</option>

                </select>
            </div>

            <div className="w-full">                
                <select className="w-full" disabled={loadingSearch} value={SearchBlockStates.Campus} onChange={(e) => {
                    SearchBlockStates.setCampus(e.target.value)
                    setLeadClass(null)
                    SearchBlockStates.setSearchBlockResults({"status": 0, "value": {}})
                    previousSearch.current = null
                    }}>  

                    <option value="Storrs">Storrs</option>
                    <option value="Hartford">Hartford</option>
                    <option value="Stamford">Stamford</option>
                    <option value="Waterbury">Waterbury</option>
                    <option value="Avery Point">Avery Point</option>
                </select>
            </div>
            
        </div>



    </div>


    <div className="flex ">
    Student Resources
    </div>

    </div>

  )}