"use client"
import './calender.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewWeek,} from '@schedule-x/calendar' 
import '@schedule-x/theme-default/dist/index.css'
import { DataContext } from '@/data/Data'
import { useContext } from 'react'


const test = {"events":[{"id":1,"title":"ACCT 6211","start":"2025-10-22 14:15","end":"2025-10-22 15:30","calendarId":"ACCT6211"},{"id":2,"title":"ECE 2001","start":"2025-10-20 10:10","end":"2025-10-20 11:00","calendarId":"ECE2001"},{"id":3,"title":"ECE 2001","start":"2025-10-21 09:00","end":"2025-10-21 10:45","calendarId":"ECE2001"},{"id":4,"title":"ECE 2001","start":"2025-10-22 10:10","end":"2025-10-22 11:00","calendarId":"ECE2001"},{"id":5,"title":"ECE 2001","start":"2025-10-22 15:45","end":"2025-10-22 17:45","calendarId":"ECE2001"},{"id":6,"title":"ECE 2001","start":"2025-10-24 10:10","end":"2025-10-24 11:00","calendarId":"ECE2001"},{"id":7,"title":"ACCT 2001","start":"2025-10-21 11:00","end":"2025-10-21 12:15","calendarId":"ACCT2001"},{"id":8,"title":"ACCT 2001","start":"2025-10-23 11:00","end":"2025-10-23 12:15","calendarId":"ACCT2001"},{"id":9,"title":"ACCT 2001","start":"2025-10-24 09:05","end":"2025-10-24 09:55","calendarId":"ACCT2001"}],"themes":{"ACCT6211":{"colorName":"ACCT6211","lightColors":{"main":"#c368e5","container":"#fd87ff","onContainer":"#8848a0"}},"ECE2001":{"colorName":"ECE2001","lightColors":{"main":"#5b9d1a","container":"#76cc21","onContainer":"#3f6d12"}},"ACCT2001":{"colorName":"ACCT2001","lightColors":{"main":"#813cfc","container":"#a74eff","onContainer":"#5a2ab0"}}}}





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