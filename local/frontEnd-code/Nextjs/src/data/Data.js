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
    const [detailedViewPopUpVisiablity, setDetailedViewPopUpVisiablity] = useState(false);
    const [detailedViewContent, setDetailedViewContent] = useState({});

    ///


    const [breakViewPopup, setBreakViewPopup] = useState(false);






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


    const [Campus, setCampus] = useState("None");
    const [Term, setTerm] = useState("None");

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






    function sectionConstraintAdder(className, lockedSection) {
        setGenerationHold(false)
        return CartSingleton.sectionConstraintAdder(className, lockedSection)
    }

    function sectionConstraintRemover(className) {
        setGenerationHold(false)
        return CartSingleton.sectionConstraintRemover(className)
    }


    function professorConstraintAdder(className, lockedProfessor) {
        setGenerationHold(false)
        return CartSingleton.professorConstraintAdder(className, lockedProfessor)
    }

    function professorConstraintRemover(className) {
        setGenerationHold(false)
        return CartSingleton.professorConstraintRemover(className)
    }










    function clearCart() {
        CartSingleton.clearClasses()
        setCartElements(CartSingleton.currentCartClasses())
        setGenerationHold(false)
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


    function addInterval(interval, weekDay) {
        const outPut = CartSingleton.BreakModel.addInterval(interval, weekDay)
        setCartElements(CartSingleton.currentCartClasses())
        setGenerationHold(false)
        return outPut
    }


    function removeInterval(weekDay, index) {
        CartSingleton.BreakModel.removeInterval(weekDay, index)
        setCartElements(CartSingleton.currentCartClasses())
        setGenerationHold(false)
    }




    function returnBreakIntervals() {
        return CartSingleton.BreakModel.returnBreakIntervals()
    }


    function removeFromCart(className) {
        if (className === "BREAK") {
            CartSingleton.BreakModel.handleDelete()
            setCartElements(CartSingleton.currentCartClasses())
            setGenerationHold(false)
            return
        }
        CartSingleton.removeClass(className)
        setCartElements(CartSingleton.currentCartClasses())
        setGenerationHold(false)
    }

    function changeClassInclusion(className) {
        CartSingleton.classInclusionChange(className)
        setGenerationHold(false)
    }




    function returnClassColor(className) {
        return CartSingleton.returnClassColor(className)
    }








    async function ScheduleGeneration() {
        if (generationHold) return 0

        setScheduling(true)
        const PreScheduleOutput = CartSingleton.handlePreScheduleProcessing()
        if (PreScheduleOutput["status"] > 200) {

            setValidSchedules(PreScheduleOutput)

        } else {
            const schedulingOutPut = await CartBlockSingleton.schedule(PreScheduleOutput)
            setValidSchedules(schedulingOutPut)
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
        await setSearchBlockResults(JSON.parse(output))
    }

    function detailedViewPreProccesor(className) {
        return CartSingleton.detailedViewPreProccesor(className)
    }

    const SearchBlockStates = { searchBlockResults, setSearchBlockResults, SearchBlockFetch, Campus, Term, setCampus, setTerm, appendToCart, clearCart, scheduling}
    const CartStates = {Campus, cartElements, removeFromCart, ScheduleGeneration, setLargeCalenderPopUpVisiablity, changeClassInclusion, viewClassInclusionStatus, scheduling, returnClassColor, viewProfessorConstraint, viewSectionConstraint, professorConstraintRemover, professorConstraintAdder, sectionConstraintRemover, sectionConstraintAdder, detailedViewPreProccesor, detailedViewPopUpVisiablity, setDetailedViewPopUpVisiablity, detailedViewContent, setDetailedViewContent, addInterval, setBreakViewPopup, breakViewPopup, returnBreakIntervals, popUpSchedulerBuilder, removeInterval, generationHold}
    const ScheduleBlockStates = {largeCalenderPopUpVisiablity, setLargeCalenderPopUpVisiablity, validSchedules, currentScheduleSmallPopUp, smallCalenderPopUpVisiablity, setCurrentScheduleSmallPopUp, setSmallCalenderPopUpVisiablity, popUpSchedulerBuilder, currentScheduleLargePopUp, setCurrentScheduleLargePopUp, FullCalenderClassCardProccessing, scheduling, returnClassColor, viewSectionConstraint, sectionConstraintRemover, sectionConstraintAdder, detailedViewPopUpVisiablity, breakViewPopup} 

    
    return (
        <DataContext.Provider value={{SearchBlockStates, CartStates, ScheduleBlockStates}}>
            {children}
        </DataContext.Provider>
  );
};
