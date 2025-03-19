import { useState,useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import './calender.css'


function CalendarApp() {
 
  const config = {
    selectedDate: '2025-08-24',
    firstDayOfWeek: 0,
    dayBoundaries: {
      start: '07:00',
      end: '22:00',
    },
    minDate: '2025-08-24',
    maxDate: '2025-08-30',
    views: [createViewWeek()],
      events: [
        {
          id: '1',
          shshs: 'sss',
          title: 'Event 1',
          start: '2025-08-24 11:00',
          end: '2025-08-24 20:00',
        },
      ],

      weekOptions: {
        gridHeight: 200, // Set the height of the calendar
        eventWidth: 100, // Make events take up full width
      },
  
  }



  const calendar = useCalendarApp(config)


  return (

      <ScheduleXCalendar 
      
      calendarApp={calendar} />
  )
}
 
export default CalendarApp