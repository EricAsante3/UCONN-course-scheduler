import { useState,useEffect } from 'react'
import CryptoJS from 'crypto-js';

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import './calender.css'





function CalendarApp({schedule_info}) {
 
  let generation = schedule_info

  const config = {
    selectedDate: '2025-08-24',
    firstDayOfWeek: 0,
    dayBoundaries: {
      start: '07:00',
      end: '22:00',
    },    
    calendars: generation["calendarsThemes"],
    minDate: '2025-08-24',
    maxDate: '2025-08-30',
    views: [createViewWeek()],
      events: generation["events"],


  
  }



  const calendar = useCalendarApp(config)


  return (

      <ScheduleXCalendar 
      
      calendarApp={calendar} />
  )
}
 
export default CalendarApp