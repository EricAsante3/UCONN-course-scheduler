import { Class } from "../dataModels/classModel.js"
import { Break } from "../dataModels/breakModel.js"

export class CartModel {

    BreakModel = new Break()

    #cartClasses = {}
    
    constructor() {
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

        if (this.BreakModel.returnIntervalCount() > 0) {
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
        return {"status": 200, "value": processedClasses};
    }


    classInclusionChange(className) {
        this.#cartClasses[className].handleInclusionChange()
    }

    viewClassInclusionStatus(className) {
        return this.#cartClasses[className].viewInclusionStatus()
    }


}








