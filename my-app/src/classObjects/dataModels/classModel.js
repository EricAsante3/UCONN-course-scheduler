import { PrimarySection, DependentSection } from "./sectionModels.js"
import { randomHexColor, adjustHexColor } from "../helperFunctions.js";


function handlePrimarySectionObjectCreation(data) {
    const classObject = new PrimarySection(data)
    return classObject
}


function handleDependentSectionObjectCreation(data) {
    const classObject = new DependentSection(data)
    return classObject
}






export class Class {

    parsedSections = {}
    #inclusion = true
    constraints = {"lockedSections": "", "lockedProfessor": ""}
    colorTheme = {}

    constructor(className, sectionData) {
        this.className = className;        
        this.parseSectionData(sectionData)

        const mainColor = randomHexColor();
        const containerColor = adjustHexColor(mainColor, 30); // 30% lighter
        const onContainerColor = adjustHexColor(mainColor, -30); // 30% darker
        
        this.colorTheme = {
            main: mainColor,
            container: containerColor,
            onContainer: onContainerColor,
        };
    }



    parseSectionData(sectionData) {
        const tempDependentSectionStorage = {}
        const tempPrimarySectionStorage = {}

        sectionData.forEach(section => {
        
            // Primary section that contains dependent sections 
            if ((section.crn == '') && (section.units == '')) {
                const primarySectionObject = handlePrimarySectionObjectCreation(section)
                tempPrimarySectionStorage[this.className + ' ' + primarySectionObject.classSection] = primarySectionObject
            }



            // Primary section that contains no dependent sections 
            if ((section.crn != '') && (section.requiredSections == '')) {
                const primarySectionObject = handlePrimarySectionObjectCreation(section)
                this.parsedSections[primarySectionObject.crn] = primarySectionObject
            }



            // Dependent section ... 
            if ((section.crn == '') && (section.units != '') && (section.requiredSections == '')) {
                const dependentSectionObject = handleDependentSectionObjectCreation(section)
                tempDependentSectionStorage[this.className + ' ' + dependentSectionObject.classSection] = dependentSectionObject
            }


        });






        sectionData.forEach(section => {


            // True Dependent Section
            if ((section.crn != '') && (section.units != '') && (section.requiredSections != '')) {
                const dependentSectionObject = handleDependentSectionObjectCreation(section)

                // Complete section requeries more than 1 sectiosn
                if(dependentSectionObject.requiredSections.length < 1){

                    let primarySectionObject = tempPrimarySectionStorage[this.className + ' ' + dependentSectionObject.requiredSections[0]]
                    let primarySectionObjectCopy = new PrimarySection(primarySectionObject)
                    primarySectionObjectCopy.addDependents([dependentSectionObject])
                    this.parsedSections[primarySectionObjectCopy.completeSectionCrn] = primarySectionObjectCopy

                } else {

                    let primarySectionObject = tempPrimarySectionStorage[this.className + ' ' + dependentSectionObject.requiredSections[0]]
                    let primarySectionObjectCopy = new PrimarySection(primarySectionObject)

                    let tempDependentsList = []
                    dependentSectionObject.requiredSections.slice(1).forEach(dependentSectionID => {
                        const tempDependentSectionObject = tempDependentSectionStorage[this.className + ' ' + dependentSectionID]
                        tempDependentsList.push(tempDependentSectionObject);
                    });

                    tempDependentsList.push(dependentSectionObject);
                    primarySectionObjectCopy.addDependents(tempDependentsList)
                    this.parsedSections[primarySectionObjectCopy.completeSectionCrn] = primarySectionObjectCopy
                }
            }
        });

    }


    // method for schedule build lock section and prpoffesor full section
    handlePreScheduleProcessing() {
        // LOCK CASE
        if (this.constraints["lockedSections"] !== "") {
            const desiredSection = this.constraints["lockedSections"]
            let converted = Object.fromEntries(Object.entries(this.parsedSections[desiredSection].completeSectionSchedule).map(([key, value]) => [key, (value).map((value) => ({"Crn": this.parsedSections[desiredSection].completeSectionCrn, "ClassName": this.parsedSections[desiredSection].className, "TimeSlots": value}))]));
            return { status: 200, value: {"AllClassCRNs": [this.parsedSections[desiredSection].completeSectionCrn], "AllClassTimeSlots": [{Crn: this.parsedSections[desiredSection].completeSectionCrn, ClassName: this.parsedSections[desiredSection].className, MeetingTime: converted}]} }
        }

        // professor LOCK
        if (this.constraints["lockedProfessor"] !== "") {
            const AllClassTimeSlots = []
            const AllClassCRNs = []

            Object.values(this.parsedSections).forEach(element => {
                if (element.openSeats() && element.validcompleteSection) {
                    if (element.professor === this.constraints["lockedProfessor"]){
                        let converted = Object.fromEntries(Object.entries(element.completeSectionSchedule).map(([key, value]) => [key, (value).map((value) => ({"Crn": element.completeSectionCrn, "ClassName": element.className, "TimeSlots": value}))]));
                        AllClassTimeSlots.push({Crn: element.completeSectionCrn, ClassName: element.className, MeetingTime: converted})
                        AllClassCRNs.push(element.completeSectionCrn)
                    }
                }
            })

            return { status: 200, value: {"AllClassCRNs": AllClassCRNs, "AllClassTimeSlots": AllClassTimeSlots} }
        }

        // NO LOCK CASE
        const AllClassTimeSlots = []
        const AllClassCRNs = []
        Object.values(this.parsedSections).forEach(element => {
            if (element.openSeats() && element.validcompleteSection) {
                let converted = Object.fromEntries(Object.entries(element.completeSectionSchedule).map(([key, value]) => [key, (value).map((value) => ({"Crn": element.completeSectionCrn, "ClassName": element.className, "TimeSlots": value}))]));
                AllClassTimeSlots.push({Crn: element.completeSectionCrn, ClassName: element.className, MeetingTime: converted})
                AllClassCRNs.push(element.completeSectionCrn)
            }
        })

        if (0 < AllClassCRNs.length) {
            return { status: 200, value: {"AllClassCRNs": AllClassCRNs, "SectionEntries": AllClassTimeSlots} }
        } else {
            return { status: 500, value: "error no open classes for " + this.className }
        }

    }



    // metod for full view
    handleSectionView() {
        return this.parsedSections
    }
    
    handleInclusionChange(){
        this.#inclusion = !(this.#inclusion)
    }

    viewInclusionStatus() {
        return this.#inclusion
    }

}