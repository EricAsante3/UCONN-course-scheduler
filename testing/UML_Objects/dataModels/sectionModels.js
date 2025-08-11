import { extractSections, parseSchedule, sortedInsert } from "../helperFunctions.js";


export class PrimarySection {
    validcompleteSection = true
    #dependentSections = {}
    completeSectionSchedule = { monday: new Set(), tuesday: new Set(), wednesday:new Set(), thursday: new Set(), friday: new Set(), saturday: new Set(), sunday: new Set(),};
    completeSectionCrn = null


    constructor(classInfo) {

        this.crn = classInfo.crn
        this.subject = classInfo.subject
        this.catalogNbr = classInfo.catalogNbr
        this.classSection = classInfo.classSection
        this.academicCareer = classInfo.academicCareer
        this.units = classInfo.units
        this.campus = classInfo.campus
        this.title = classInfo.title
        this.requiredSections = classInfo.requiredSections
        this.instructionMode = classInfo.instructionMode
        this.professor =  classInfo.professor

        if (classInfo instanceof PrimarySection) {
            this.time = this.completeSectionSchedule = structuredClone(classInfo.time)
        } else {
            this.time = this.completeSectionSchedule = parseSchedule(classInfo.time)
        }

        this.availableSeats = Number.isInteger(classInfo.availableSeats)
            ? (classInfo.availableSeats < 0 ? 0 : classInfo.availableSeats)
            : null;

        if(this.crn != ""){
            this.completeSectionCrn = this.crn
        }

    }


    addDependents(data) {

        data.forEach(data => {
            for (const day of Object.keys(data.time)) {
                if (data.time[day].length > 0) {
                    sortedInsert(this.completeSectionSchedule[day], data.time[day])
                }
            }
        })

        this.completeSectionCrn = data[data.length - 1].crn
        this.validcompleteSection = data[data.length - 1].openSeats()
        this.#dependentSections = data




    }




    openSeats() {
        return 0 < this.availableSeats
    }

}



export class DependentSection {

    constructor(classInfo) {
        this.crn = classInfo.crn
        this.subject = classInfo.subject
        this.catalogNbr = classInfo.catalogNbr
        this.classSection = classInfo.classSection
        this.academicCareer = classInfo.academicCareer
        this.units = classInfo.units
        this.campus = classInfo.campus
        this.title = classInfo.title
        this.requiredSections = extractSections(classInfo.requiredSections)
        this.instructionMode = classInfo.instructionMode
        this.time = parseSchedule(classInfo.time)
        this.availableSeats = Number.isInteger(classInfo.availableSeats)
            ? (classInfo.availableSeats < 0 ? 0 : classInfo.availableSeats)
            : null;
    }

    openSeats() {
        return 0 < this.availableSeats
    }

}