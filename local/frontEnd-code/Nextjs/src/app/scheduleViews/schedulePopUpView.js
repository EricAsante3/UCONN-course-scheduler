"use client"
import './calender.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewWeek,} from '@schedule-x/calendar' 
import '@schedule-x/theme-default/dist/index.css'
import { DataContext } from '@/data/Data'
import { useContext } from 'react'







function PopUpCalendar({className}) {
    const {ScheduleBlockStates} = useContext(DataContext);

    const config = {
    calendars: ScheduleBlockStates.currentScheduleSmallPopUp.themes,
    selectedDate: '2025-10-19',
    firstDayOfWeek: 0,
    dayBoundaries: {
      start: '07:00',
      end: '22:00',
    },    
    minDate: '2025-10-19',
    maxDate: '2025-10-30',
    views: [createViewWeek()],
    events: ScheduleBlockStates.currentScheduleSmallPopUp.events,
      weekOptions: {
        gridHeight: 200, // Set the height of the calendar
        eventWidth: 100, // Make events take up full width
      },

  }
    
   const calendar = useCalendarApp(config)

  return (
    <div className={`w-[400px] ${className}`}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default PopUpCalendar