import { Class } from "../dataModels/classModel.js"


export class Cart {

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
        return Object.keys(this.#cartClasses)
    }


    // check if class already in cart method
    inCartCheck(className) {
        return Object.keys(this.#cartClasses).includes(className);
    }
    



    //add constrant
    sectionConstraintAdder(className, lockedSection) {
        this.#cartClasses[className].constraints["lockedSections"] = lockedSection
    }

    professorConstraintAdder(className, lockedProfessor) {
        this.#cartClasses[className].constraints["lockedProfessor"] = lockedProfessor
    }

    sectionConstraintRemover(className) {
        this.#cartClasses[className].constraints["lockedSections"] = ""
    }

    professorConstraintRemover(className) {
        this.#cartClasses[className].constraints["lockedProfessor"] = ""
    }


    // generate pre-schedule
    handlePreScheduleProcessing() {
        let processedClasses = {};

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



    classInclusionChange(className){
        this.#cartClasses[className].handleInclusionChange()
    }


}








