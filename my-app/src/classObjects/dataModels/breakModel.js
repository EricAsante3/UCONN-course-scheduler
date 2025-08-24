import { convertScheduleToEvents } from "../helperFunctions.js"
import { sortedInsert } from "../helperFunctions.js";

export class Break {




    inclusionStatus = true
    colorTheme = {
            main: "#546253",
            container: "#546253",
            onContainer: "#000000",
        };

  intervalCount = 0


  breakSchedule = {
                    "monday": [],
                    "tuesday": [],
                    "wednesday": [],
                    "thursday": [],
                    "friday": [],
                    "saturday": [],
                    "sunday": []
                  }


    addInterval(interval, weekDay) {
      // 1. Validate input
      if (interval[1] <= interval[0]) {
        return { status: 500, value: "Invalid Input: End time must be after Start time" };
      }

      // 2. Clone existing schedule
      let cloneArray = structuredClone(this.breakSchedule[weekDay]);

      console.log(cloneArray)
      // 3. Insert while keeping sorted
      sortedInsert(cloneArray, [interval]);

      // 4. Check for overlaps
      for (let i = 0; i < cloneArray.length - 1; i++) {
        if (cloneArray[i][1] > cloneArray[i + 1][0]) {
          return { status: 500, value: "Selected time interval conflicts with existing interval" };
        }
      }

      // 5. Save updated schedule
      this.breakSchedule[weekDay] = structuredClone(cloneArray)
      
      this.intervalCount = this.intervalCount + 1

      return { status: 200, value: "Successfully Added Interval" };
    }




    removeInterval(weekDay, index) {
      this.breakSchedule[weekDay].splice(index, 1)
      this.intervalCount = this.intervalCount - 1
    }







    returnBreakIntervals() {
      return this.breakSchedule
    }




    returnIntervalCount(){
        return this.intervalCount
    }

    handleInclusionChnage () {
      this.inclusionStatus = !this.inclusionStatus
    }

    handleDelete () {
      this.breakSchedule = {
                    "monday": [],
                    "tuesday": [],
                    "wednesday": [],
                    "thursday": [],
                    "friday": [],
                    "saturday": [],
                    "sunday": []
                    }
      this.intervalCount = 0
      console.log(this.intervalCount)
      console.log("ssssssssssssssssssss")
      this.inclusionStatus = true

    }

    
    handleCalenderProcessing() {
      const events = []
      convertScheduleToEvents(events, this.breakSchedule, "BREAK", "BREAK")
      console.log(events)
      return events
    }

    handlePreScheduleProcessing() {

    const output = Object.fromEntries(
      Object.entries(this.breakSchedule).map(([day, slots]) => [
        day,
        slots.map(([start, end]) => ({
          Crn: "BREAK",
          ClassName: "BREAK",
          TimeSlots: [start, end]
        }))
      ])
    );

    const AllClassTimeSlots = []
    const AllClassCRNs = []
    AllClassTimeSlots.push({Crn: "BREAK", ClassName: "BREAK", MeetingTime: output})
    AllClassCRNs.push("BREAK")
    return { status: 200, value: {"AllClassCRNs": AllClassCRNs, "SectionEntries": AllClassTimeSlots} }

    }
}