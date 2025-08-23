"use client"
import { CloseSquareIcon } from "../Icons/Icons"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/data/Data"
import "../scheduleViews/calender.css"
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewWeek,} from '@schedule-x/calendar' 
import '@schedule-x/theme-default/dist/index.css'
import { createEventsServicePlugin } from '@schedule-x/events-service'

function FullCalendar() {


    const config = {


    selectedDate: '2025-10-19',
    firstDayOfWeek: 0,
    dayBoundaries: {
      start: '07:00',
      end: '22:00',
    },    
    minDate: '2025-10-19',
    maxDate: '2025-10-30',
    views: [createViewWeek()],
      weekOptions: {
        gridHeight: 700, // Set the height of the calendar
        eventWidth: 100, // Make events take up full width
      },

  }
    
   const calendar = useCalendarApp(config)

  return (
    <div onClick={() =>     console.log(eventsService.getAll())
} className={`w-full `}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 








function handleTimeChange(time) {
    const [hours, minutes] = time.split(":").map(Number);
    const minutesAfterMidnight = hours * 60 + minutes;
    console.log(minutesAfterMidnight)
    return minutesAfterMidnight
}










export default function BreakSelectPopUp() {
    const {CartStates} = useContext(DataContext);
    const [locked, setlocked] = useState(false)
    const [weekday, setWeekday] = useState("monday"); // default value

    const [startTimeDisplay, setStartTimeDisplay] = useState("00:00");
    const [endTimeDisplay, setEndTimeDisplay] = useState("00:00");

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    useEffect(() => console.log(weekday), [weekday])
    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-30 "></div>

            <div className="rounded-2xl bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  flex flex- items-center justify-between h-[800px] min-h-[800px] w-[800px] min-w-[800px]">
                <div className="h-full w-[70%] bg-red-700 p-2 flex items-center justify-center">
                    <FullCalendar></FullCalendar>
                </div>

                <div className="h-full w-[30%] bg-blue-700 flex flex-col items-center justify-evenly">

                    <div className="flex items-center justify-center flex-col">
                    <h1>Week Day Select:</h1>
                    <select
                        id="weekday"
                        name="weekday"
                        value={weekday}
                        onChange={(e) => setWeekday(e.target.value)}
                    >
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>

                    <p className="mt-2">Currently selected: {weekday}</p>
                    </div>

                    <div className="flex items-center justify-center flex-col">
                        <h1>Start Time Select:</h1>

                        <input
                            type="time"
                            value={startTimeDisplay}
                        
                            onChange={(e) => {
                                setStartTimeDisplay(e.target.value)
                                setStartTime(handleTimeChange(e.target.value))
                            }}



                        />
                    </div>

                    <div className="flex items-center justify-center flex-col">
                        <h1>End Time Select:</h1>

                        <input
                            type="time"
                            value={endTimeDisplay}
                            onChange={(e) => {
                                setEndTimeDisplay(e.target.value)
                                setEndTime(handleTimeChange(e.target.value))
                            }}
                        />
                    </div>








                    <div onClick={() => {CartStates.setBreakViewPopup(false)}} className="aspect-square w-12">
                        <CloseSquareIcon></CloseSquareIcon>
                    </div>


                    <h1 onClick={() => {
                        console.log([startTime, endTime], weekday)
                        console.log(CartStates.addInterval([startTime, endTime], weekday))
                    }} className="bg-green-400">Submit</h1>




                </div>
            </div>
        </>
    )
}

