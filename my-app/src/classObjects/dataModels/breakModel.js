export class Break {

    intervalCount = 0

    breakSchedule = { monday: [{
                "Crn": "BREAK",
                "ClassName": "BREAK",
                "TimeSlots": [
                  570,
                  620
                ]
              }], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [],};

    addInterval(){

    }

    removeInterval(){

    }

    returnIntervalCount(){
        return this.intervalCount
    }

    
    handlePreScheduleProcessing() {
    console.log("BREAKKKKKKKKKKKKKKKKK")
    const AllClassTimeSlots = []
    const AllClassCRNs = []
    AllClassTimeSlots.push({Crn: "BREAK", ClassName: "BREAK", MeetingTime: this.breakSchedule})
    AllClassCRNs.push("BREAK")
        
    return { status: 200, value: {"AllClassCRNs": AllClassCRNs, "SectionEntries": AllClassTimeSlots} }

    }
}