import { Class } from "../dataModels/classModel.js"
import { Break } from "../dataModels/breakModel.js"
import { convertScheduleToEvents } from "../helperFunctions.js"

export class CartModel {

    BreakModel = new Break()

    #cartClasses = {}
    
    constructor() {
    }


    detailedViewPreProccesor(className) {
        return this.#cartClasses[className].detailedViewPreProccesor(className)
    }

    addClass(className, classList) { /// edge case already in cart

        if (!(Object.keys(this.#cartClasses).includes(className))){
            this.#cartClasses[className] = new Class(className, classList)
            return 200
        }

        return 500
    }


    // removeclass
    removeClass(className) {

        if (Object.keys(this.#cartClasses).includes(className)) {
            delete this.#cartClasses[className];
            return 200
        }

        return 500
    }



    clearClasses() {
        this.#cartClasses = {}
        return 200
    }


    // #classesInCart
    currentCartClasses() {
        let output = Object.keys(this.#cartClasses)
        if (this.BreakModel.returnIntervalCount() > 0) {
            output.unshift("BREAK")
        }
        
        return output
    }


    // check if class already in cart method
    inCartCheck(className) {
        return Object.keys(this.#cartClasses).includes(className);
    }
    

    //add constrant
    sectionConstraintAdder(className, lockedSection) {
        this.#cartClasses[className].constraints["lockedSections"] = lockedSection
    }

    sectionConstraintRemover(className) {
        this.#cartClasses[className].constraints["lockedSections"] = ""
    }


    viewSectionConstraint(className) {
        return this.#cartClasses[className].constraints["lockedSections"]
    }


    professorConstraintAdder(className, lockedProfessor) {
        this.#cartClasses[className].constraints["lockedProfessor"] = lockedProfessor
    }

    professorConstraintRemover(className) {
        this.#cartClasses[className].constraints["lockedProfessor"] = ""
    }

    viewProfessorConstraint(className) {
        return this.#cartClasses[className].constraints["lockedProfessor"]
    }

    // generate pre-schedule
    handlePreScheduleProcessing() {
        let processedClasses = {};

        if (Object.values(this.#cartClasses).length === 0) {
            return {"status": 500, "value": "No classes in cart to schedule"};
        }

        if (this.BreakModel.inclusionStatus && this.BreakModel.intervalCount > 0) {
            processedClasses["BREAK"] = this.BreakModel.handlePreScheduleProcessing()["value"]
        }

        for (const cartClass of Object.values(this.#cartClasses)) {

            if (cartClass.viewInclusionStatus()) {
                const output = cartClass.handlePreScheduleProcessing();

                if (output["status"] === 500) {
                    return output; 
                }
                processedClasses[cartClass.className] = output["value"];
            }
        }

        if (Object.keys(processedClasses).length <= 0){
            return {"status": 500, "value": "No classes enabled to schedule"};
        }


        return {"status": 200, "value": processedClasses};
    }

    classInclusionChange(className) {
        if (className === "BREAK") {
            this.BreakModel.handleInclusionChnage()
            return
        }
        this.#cartClasses[className].handleInclusionChange()
    }

    returnClassColor(className) {
        return this.#cartClasses[className].colorTheme.container
    }

    viewClassInclusionStatus(className) {
        return this.#cartClasses[className].viewInclusionStatus()
    }

    miniScheduleViewProccessing(scheduleDict){
        const eventArray = []
        const eventColorThemes = {}

        for (const [className, CRN] of Object.entries(scheduleDict)) {
            if (className === "BREAK") {
                eventArray.push(...this.BreakModel.handleCalenderProcessing())
                eventColorThemes["BREAK"] = {colorName: "BREAK", lightColors: this.BreakModel.colorTheme}
                continue
            }
            const classSection = this.#cartClasses[className].parsedSections[CRN]
            eventArray.push(...classSection.events)
            eventColorThemes[className.replace(/\s+/g, "")] = {colorName: className.replace(/\s+/g, ""), lightColors: this.#cartClasses[className].colorTheme}
        }
        return {events: eventArray, themes: eventColorThemes}      
    }

    FullCalenderClassCardProccessing(scheduleDict){
        const classData = []

        for (const [className, CRN] of Object.entries(scheduleDict)) {
            if (className === "BREAK"){
                classData.push({className: "BREAK", Prof: "", seats: "", crn: "", instructionMode: ""})
                continue
            }
            classData.push({className: this.#cartClasses[className].parsedSections[CRN].className, Prof: this.#cartClasses[className].parsedSections[CRN].professor, seats: this.#cartClasses[className].parsedSections[CRN].sectionAvailableSeats, crn: this.#cartClasses[className].parsedSections[CRN].completeSectionCrn, instructionMode: this.#cartClasses[className].parsedSections[CRN].instructionMode})
        }
        return classData
    }


}








