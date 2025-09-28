import { extractSections, parseSchedule, sortedInsert } from "../helperFunctions.js";
import { convertScheduleToEvents } from "../helperFunctions.js"


export class PrimarySection {
    validcompleteSection = true
    dependentSections = {}
    completeSectionSchedule = { monday: new Set(), tuesday: new Set(), wednesday:new Set(), thursday: new Set(), friday: new Set(), saturday: new Set(), sunday: new Set(),};
    completeSectionCrn = null
    events = []
    sectionAvailableSeats = 0

    constructor(classInfo) {

        this.crn = classInfo.crn
        this.className = classInfo.subject + " " + classInfo.catalogNbr
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
            this.time = structuredClone(classInfo.time)
            this.completeSectionSchedule = structuredClone(classInfo.completeSectionSchedule)
            convertScheduleToEvents(this.events, this.time, this.className, this.classSection)
        } else {
            this.time = parseSchedule(classInfo.time)
            this.completeSectionSchedule = parseSchedule(classInfo.time)
            convertScheduleToEvents(this.events, this.time, this.className, this.classSection)
        }

        this.availableSeats = Number.isInteger(classInfo.availableSeats)
            ? (classInfo.availableSeats < 0 ? 0 : classInfo.availableSeats)
            : null;

        if(this.crn != ""){
            this.sectionAvailableSeats = this.availableSeats
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
            convertScheduleToEvents(this.events, data.time, data.className, data.classSection)
        })

        this.completeSectionCrn = data[data.length - 1].crn
        this.validcompleteSection = data[data.length - 1].openSeats()
        this.dependentSections = data

        this.sectionAvailableSeats = data[data.length - 1].availableSeats




    }




    openSeats() {
        return 0 < this.availableSeats
    }

}



export class DependentSection {

    constructor(classInfo) {
        this.crn = classInfo.crn
        this.subject = classInfo.subject
        this.className = classInfo.subject + " " + classInfo.catalogNbr
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