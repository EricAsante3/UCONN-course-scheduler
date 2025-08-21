"use client"
import './calender.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewWeek,} from '@schedule-x/calendar' 
import '@schedule-x/theme-default/dist/index.css'
import { DataContext } from '@/data/Data'
import { useContext } from 'react'

 

function FullCalendar({className}) {
    const {ScheduleBlockStates} = useContext(DataContext);

    const Scheduledata = ScheduleBlockStates.popUpSchedulerBuilder(ScheduleBlockStates.currentScheduleLargePopUp)

    const config = {
    events: Scheduledata.events,
    calendars: Scheduledata.themes,

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
        gridHeight: 766, // Set the height of the calendar
        eventWidth: 100, // Make events take up full width
      },

  }
    
   const calendar = useCalendarApp(config)

  return (
    <div className={`w-full ${className}`}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default FullCalendar