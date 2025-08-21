"use client"

import { createContext, useState, useRef, useEffect } from "react";
import { SearchBlockModel } from "@/classObjects/systemModels/searchBlockModel";
import { CartModel } from "@/classObjects/systemModels/cartModel";
import { CartBlockModel } from "@/classObjects/systemModels/cartBlockModel";

export const DataContext = createContext();

const CartBlockSingleton = new CartBlockModel()
const SearchBlockSingleton = new SearchBlockModel() 
export const CartSingleton = new CartModel() 


export default function DataProvider({ children }) {




    /// cart states
    const [cartElements, setCartElements] = useState([]);

    const [generationHold, setGenerationHold] = useState(false);

    ///


    /// schedule states
    
    const [scheduling, setScheduling] = useState(false);

    const [validSchedules, setValidSchedules] = useState({"status": 500, "value": []});

    
    useEffect(() => {
        if (!generationHold) {
            setValidSchedules({"status": 500, "value": "Home"})
        }
    }, [generationHold])


    const [currentScheduleSmallPopUp, setCurrentScheduleSmallPopUp] = useState({});
    const [currentScheduleLargePopUp, setCurrentScheduleLargePopUp] = useState({});

    const [smallCalenderPopUpVisiablity, setSmallCalenderPopUpVisiablity] = useState(false);
    const [largeCalenderPopUpVisiablity, setLargeCalenderPopUpVisiablity] = useState(false);

    ///

    // search states 


    const [Campus, setCampus] = useState("Storrs");
    const [Term, setTerm] = useState("Fall 2025");

    const [searchBlockResults, setSearchBlockResults] = useState({"status": 0, "value": {}});
    ///




    function viewClassInclusionStatus(className) {
        return CartSingleton.viewClassInclusionStatus(className)
    }

    function viewProfessorConstraint(className) {
        return CartSingleton.viewProfessorConstraint(className)
    }

    function viewSectionConstraint(className) {
        return CartSingleton.viewSectionConstraint(className)
    }




    function appendToCart(className, classData) {
        if (cartElements.length >= 8) {
            return 500
        }

        const output = CartSingleton.addClass(className, classData)
        setCartElements(CartSingleton.currentCartClasses())
        setGenerationHold(false)
        return output
    }


    function removeFromCart(className) {
        CartSingleton.removeClass(className)
        setCartElements(CartSingleton.currentCartClasses())
        setGenerationHold(false)
    }

    function changeClassInclusion(className) {
        console.log(className)
        CartSingleton.classInclusionChange(className)
        setGenerationHold(false)
    }



    async function ScheduleGeneration() {
        if (generationHold) return 0

        setScheduling(true)
        const PreScheduleOutput = CartSingleton.handlePreScheduleProcessing()
        console.log(CartSingleton.handlePreScheduleProcessing())

        if (PreScheduleOutput["status"] > 200) {

            setValidSchedules(PreScheduleOutput)

        } else {
            const schedulingOutPut = await CartBlockSingleton.schedule(PreScheduleOutput)
            setValidSchedules(JSON.parse(schedulingOutPut))
        }

        setGenerationHold(true)
        setScheduling(false)


    }




    function FullCalenderClassCardProccessing(scheduleDict) {
        return CartSingleton.FullCalenderClassCardProccessing(scheduleDict)
    }


    function popUpSchedulerBuilder(scheduleDict) {
      return CartSingleton.miniScheduleViewProccessing(scheduleDict)
    }

    async function SearchBlockFetch(Class) {
        const output = await SearchBlockSingleton.search(Class, Term, Campus)
        console.log(typeof JSON.parse(output))
        await setSearchBlockResults(JSON.parse(output))
    }



    const SearchBlockStates = { searchBlockResults, setSearchBlockResults, SearchBlockFetch, Campus, Term, setCampus, setTerm, appendToCart, scheduling}
    const CartStates = {cartElements, removeFromCart, ScheduleGeneration, setLargeCalenderPopUpVisiablity, changeClassInclusion, viewClassInclusionStatus, viewProfessorConstraint, viewSectionConstraint,scheduling}
    const ScheduleBlockStates = {largeCalenderPopUpVisiablity, setLargeCalenderPopUpVisiablity, validSchedules, currentScheduleSmallPopUp, smallCalenderPopUpVisiablity, setCurrentScheduleSmallPopUp, setSmallCalenderPopUpVisiablity, popUpSchedulerBuilder, currentScheduleLargePopUp, setCurrentScheduleLargePopUp, FullCalenderClassCardProccessing, scheduling}

    return (
        <DataContext.Provider value={{SearchBlockStates, CartStates, ScheduleBlockStates}}>
            {children}
        </DataContext.Provider>
  );
};
