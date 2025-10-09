"use client"
import { useEffect, useState, useContext, useRef } from "react"
import { DataContext } from "@/data/Data"
import { classAlias } from "./classAlias"
import { motion } from "framer-motion"
import { getNextTerms } from "@/classObjects/helperFunctions"




export default function LeftSide({divRef, setLeadClass, loadingSearch, setLoadingSearch}) {
    const previousSearch = useRef(null)
    const [currentInput, setCurrentInput] = useState("");
    const {SearchBlockStates} = useContext(DataContext);
    const [terms, setTerms] = useState([]);
    const [inputStatus, setinputStatus] = useState(true);

    useEffect(() => {
        setTerms(getNextTerms())
    }, [])

    useEffect(() => {
    }, [terms])

    const scrollToTop = () => {
        if (divRef.current) {
          divRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    };


    async function action(inputarray) {
        setLoadingSearch(true)
        await SearchBlockStates.SearchBlockFetch(inputarray[0])
        if (inputarray.length > 1) setLeadClass(inputarray[0] + " " + inputarray[1])
        else setLeadClass(null)
        setLoadingSearch(false)
        previousSearch.current = inputarray[0]
    }


    async function handleSubmit (Class) {
        let output = await validSearch(Class)
        setinputStatus(output)
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
                    return true
                } else {
                    setLeadClass(null)
                    return true
                }

            } else {
                if (!classAlias.includes(inputarray[0])) return false
                await action(inputarray)
                return true
            }

        } else {
                if (!classAlias.includes(inputarray[0])) return false
                await action(inputarray)
                return true
            }
    }


  return (

    <div className="grid grid-rows-[40%_60%] p-2 rounded-2xl">

    <div className="flex flex-col justify-start mt-4">

        <div className="flex items-center mb-4 justify-between">
            <h2 className="w-fit text-3xl font-bold">Search</h2>

            { !inputStatus ?
                <div >
                    <h2 className="text-xs mt-2 text-redColor w-full text-center">Invalid Department Code</h2>
                </div>
            :
                null
            }
        </div>

        <div className="flex flex-col">

            <input 
                id="department"
                name="department"
                type="text"

                style={{
                    border: !inputStatus ? "1px solid red" : "none",
                }}

                className="smallBoxes w-full bg-Highlight rounded-lg p-2 focus:outline-none "
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        scrollToTop()
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
                placeholder="Type Here..."
                disabled={loadingSearch}
            />

            <label htmlFor="department" className="pt-2 pb-2 text-[10px] text-Text ">Enter department: (e.g., CSE or CSE 1010)</label>
        </div>

        <div className="mt-2 flex flex-row justify-start items-start w-full space-x-4 text-Text ">

            <div  className="w-full text-Text ">  
                <h2 className=" text-xs text-Text ">Select Term:</h2>              
                <select className="smallBoxes w-full cursor-pointer text-Text bg-background text-ellipsis " disabled={loadingSearch} value={SearchBlockStates.Term} onChange={(e) => {
                SearchBlockStates.setTerm(e.target.value)
                SearchBlockStates.clearCart()
                setLeadClass(null)
                SearchBlockStates.setSearchBlockResults({"status": 0, "value": {}})
                previousSearch.current = null
                }}>                        
                    <option className="text-Text bg-background" value="None">---</option>


                    { terms.map((term, index) => {
                        return <option key={index} className="text-Text bg-background" value={term}>{term}</option>
                        })
                    }

                </select>
            </div>

            <div  className="w-full text-Text">
                <h2 className=" text-xs text-Text ">Select Campus:</h2>              
                <select className="smallBoxes w-full cursor-pointer text-Text text-ellipsis bg-background" disabled={loadingSearch} value={SearchBlockStates.Campus} onChange={(e) => {
                    SearchBlockStates.setCampus(e.target.value)
                    setLeadClass(null)
                    SearchBlockStates.setSearchBlockResults({"status": 0, "value": {}})
                    previousSearch.current = null
                    }}>  
                    <option className="text-Text bg-background" value="None">---</option>
                    <option className="text-Text bg-background" value="Storrs">Storrs</option>
                    <option className="text-Text bg-background" value="Hartford">Hartford</option>
                    <option className="text-Text bg-background" value="Stamford">Stamford</option>
                    <option className="text-Text bg-background" value="Waterbury">Waterbury</option>
                    <option className="text-Text bg-background" value="Avery Point">Avery Point</option>
                </select>
            </div>
            
        </div>

    </div>


    <div className="flex flex-col">
        <h2 className="text-3xl font-bold">
            Student Resources
        </h2>

        <div className="h-full w-full p-2 overflow-y-scroll space-y-4">

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Need networking or resume help?</h2>
                <motion.div onClick={() => window.open( "https://career.uconn.edu/meet-with-a-career-coach/", "_blank")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className=" flex cursor-pointer">
                    <h2 className="bg-navyBlue rounded-lg text-sm p-3 text-center text-white font-semibold">Meet with a Career Coach</h2>
                </motion.div>
            </div>


            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Have questions about your academics, curriculum, or major?</h2>
                <motion.div whileHover={{ scale: 1.05 }} onClick={() => window.open( "https://advising.uconn.edu", "_blank")} whileTap={{ scale: 0.9 }} className="flex cursor-pointer">
                    <h2 className="bg-navyBlue rounded-lg text-sm p-3 text-white font-semibold">Meet an Academic Advisor</h2>
                </motion.div>
            </div>


            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Need help with math or writing courses?</h2>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => window.open( "https://library.uconn.edu/services/tutoring/", "_blank")}  className="flex cursor-pointer">
                    <h2 className="bg-navyBlue rounded-lg text-sm p-3 text-center text-white font-semibold">Visit the Q/W center</h2>
                </motion.div>
            </div>

        </div>
    </div>

    </div>

  )}
