"use client"
import { CloseSquareIcon } from "../Icons/Icons"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/data/Data"
import "../scheduleViews/calender.css"
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewWeek,} from '@schedule-x/calendar' 
import '@schedule-x/theme-default/dist/index.css'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { motion } from "framer-motion"

function minutesToTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  let ampm = hours >= 12 ? "pm" : "am";

  // Convert 24h → 12h format
  hours = hours % 12;
  if (hours === 0) hours = 12;

  // Pad minutes with leading 0 if needed
  let minsStr = mins < 10 ? "0" + mins : mins;

  return `${hours}:${minsStr}${ampm}`;
}

function intervalToTimeString(interval) {
  let [start, end] = interval;
  return `${minutesToTime(start)} - ${minutesToTime(end)}`;
}


function FullCalendar({calenderEvents}) {
    const config = {
    events: calenderEvents.events,
    calendars: calenderEvents.themes,

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
    <div className={`w-full `}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 

function handleTimeChange(time) {
    const [hours, minutes] = time.split(":").map(Number);
    const minutesAfterMidnight = hours * 60 + minutes;
    return minutesAfterMidnight
}










export default function BreakSelectPopUp() {
    const {CartStates} = useContext(DataContext);
    const [reload, setReload] = useState(false)
    const [weekday, setWeekday] = useState("monday"); // default value

    const constBreakIntervals = CartStates.returnBreakIntervals()
    const calenderEvents = CartStates.popUpSchedulerBuilder({"BREAK": "BREAK"})


    const [startTimeDisplay, setStartTimeDisplay] = useState("08:00");
    const [endTimeDisplay, setEndTimeDisplay] = useState("17:00");

    const [startTime, setStartTime] = useState(480);
    const [endTime, setEndTime] = useState(1020);

    const [status, setStatus] = useState({status: 200, value: ""});


    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-30 "></div>

            <div className="mainBoxes rounded-2xl bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  flex flex- items-center justify-between h-[800px] min-h-[800px] w-[620px] min-w-[620px] xl:w-[640px] xl:min-w-[800px]">
                <div className="h-full w-[70%]  p-2 flex items-center justify-center">
                    <FullCalendar key={reload} calenderEvents={calenderEvents}></FullCalendar>
                </div>

                <div className="relative h-full w-[30%]  flex flex-col items-center justify-evenly p-2 space-y-2 mb-4">

                        <div onClick={() => {CartStates.setBreakViewPopup(false)}} className="aspect-square w-16 cursor-pointer">
                            <CloseSquareIcon></CloseSquareIcon>
                        </div>

                    <div className="flex flex-col  h-1/2 w-full bg-Text p-2  rounded-2xl text-background space-y-8">

                        <h2 className="font-bold text-lg text-center">Add Break Interval</h2>

                        <div className="flex flex-col w-full items-center justify-center ">
                        <h1 className="">Week Day Select:</h1>
                        <select
                            className="bg-Highlight/20 cursor-pointer"
                            id="weekday"
                            name="weekday"
                            value={weekday}
                            onChange={(e) => setWeekday(e.target.value)}
                        >
                            <option className="text-Text bg-background" value="monday">Monday</option>
                            <option className="text-Text bg-background" value="tuesday">Tuesday</option>
                            <option className="text-Text bg-background" value="wednesday">Wednesday</option>
                            <option className="text-Text bg-background" value="thursday">Thursday</option>
                            <option className="text-Text bg-background" value="friday">Friday</option>
                            <option className="text-Text bg-background" value="saturday">Saturday</option>
                            <option className="text-Text bg-background" value="sunday">Sunday</option>
                        </select>

                        </div>




                        <div className="flex items-center justify-center flex-col">
                            <h1>Start Time Select:</h1>
                            <input
                                type="time"
                                value={startTimeDisplay}
                                className="bg-Highlight/20 cursor-pointer"
                                onChange={(e) => {
                                    setStartTimeDisplay(e.target.value)
                                    setStartTime(handleTimeChange(e.target.value))
                                }}

                            />
                        </div>

                        <div className="flex items-center justify-center flex-col">
                            <div className="">
                                <h1>End Time Select:</h1>
                            </div>

                            <input
                                type="time"
                                value={endTimeDisplay}
                                className="bg-Highlight/20 cursor-pointer"
                                onChange={(e) => {
                                    setEndTimeDisplay(e.target.value)
                                    setEndTime(handleTimeChange(e.target.value))
                                }}
                            />
                        </div>

                        <div className="w-xl text-center  absolute -top-4  right-32">
                            { status.status > 200 ?
                                <h2 className="text-white font-bold bg-redColor">{status.value}</h2>
                                
                                :
                                <h2 className="text-white font-bold bg-greenColor">{status.value}</h2>
                            }
                        </div>


                        <motion.h2 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => {
                            setStatus(CartStates.addInterval([startTime, endTime], weekday))
                            setReload(!reload)
                        }} className="w-full text-center text-2xl font-bold bg-Highlight/20 rounded-full cursor-pointer">ADD</motion.h2>

                    </div>


                    <div className="flex flex-col  h-1/2 w-full bg-Text p-2  rounded-2xl text-background space-y-4">

                        <h2 className="font-bold text-lg text-center">Remove Interval</h2>

                        <div className="w-full h-full overflow-y-scroll flex flex-col p-2 space-y-1">


                            {Object.entries(constBreakIntervals).map(([day, intervals]) => (
                            <div key={day}>

                                {intervals.length > 0 ? (
                                intervals.map((interval, i) => (

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => {CartStates.removeInterval(day, i )
                                                        setReload(!reload)
                                                        setStatus({status: 200, value: ""})

        }} 
        className="w-full cursor-pointer" key={i}>
                                        <div className="flex flex-row space-x-4">
                                            <h1 className="font-bold ">{day}</h1>
                                            <h1>X</h1>
                                        </div>

                                        
                                        <p  key={i}>{intervalToTimeString(interval)}</p> 
                                    </motion.div>

                                    

                                    
                                ))
                                ) : (
                                    null
                                )}

                            </div>
                            ))}






                        </div>

                    </div>




                </div>
            </div>
        </>
    )
}

