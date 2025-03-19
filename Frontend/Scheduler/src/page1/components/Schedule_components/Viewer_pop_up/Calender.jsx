import { useState,useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import './calender.css'




let idCounter = 0;

function generateUniqueId() {
    // Increment the counter and return the new value
    idCounter++;
    return idCounter;
}


function allEqual(array) {
  if (array.length === 0) return true; // Edge case: empty array
  const firstElement = array[0];
  return array.reduce((isEqual, element) => isEqual && element === firstElement, true);
}

const dayMapping = {
  "Online": "Online",
  "M": "Monday",
  "T": "Tuesday",
  "W": "Wednesday",
  "Th": "Thursday",
  "TH": "Thursday",
  "F": "Friday"
};

const dayToDate = {
  'Sunday': '2025-08-24',
  'Monday': '2025-08-25',
  'Tuesday': '2025-08-26',
  'Wednesday': '2025-08-27',
  'Thursday': '2025-08-28',
  'Friday': '2025-08-29',
  'Saturday': '2025-08-30'
};

function convertTo24HourFormat(timeRange) {
  // Split the input into start time, end time, and period (AM/PM)
  const period = timeRange.slice(-1); // Last character (a or p)
  const timePart = timeRange.slice(0, -1); // Remove the last character
  const [startTime, endTime] = timePart.split('-');

  // Helper function to parse time (handle cases without minutes)
  const parseTime = (time) => {
      const parts = time.split(':');
      const hour = parseInt(parts[0], 10);
      const minute = parts.length > 1 ? parseInt(parts[1], 10) : 0; // Default to 0 if minutes are missing
      return [hour, minute];
  };

  // Convert start time to 24-hour format
  let [startHour, startMinute] = parseTime(startTime);
  if (period === 'p' && startHour !== 12) {
      startHour += 12;
  } else if (period === 'a' && startHour === 12) {
      startHour = 0;
  }

  // Convert end time to 24-hour format
  let [endHour, endMinute] = parseTime(endTime);
  if (period === 'p' && endHour !== 12) {
      endHour += 12;
  } else if (period === 'a' && endHour === 12) {
      endHour = 0;
  }

  // Format the times as HH:MM
  const startTime24h = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
  const endTime24h = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

  return [startTime24h, endTime24h];
}

function splitMultipleSlots(slot) {
  // Strip leading/trailing spaces and split by semicolon
  return slot.split(";").map(s => s.trim()).filter(s => s);
}

function getDaysFromCombinedString(dayString) {
  // Initialize an empty list to store the full day names
  if (dayString === "Online") {
      return ["Online"];
  }

  const days = [];
  let i = 0; // Start index

  while (i < dayString.length) {
      if (i + 1 < dayString.length && (dayString.slice(i, i + 2) === 'TH' || dayString.slice(i, i + 2) === 'Th')) {
          // Check if it's Thursday
          days.push(dayMapping['TH']);
          i += 2; // Skip next character ('H' in 'TH')
      } else {
          days.push(dayMapping[dayString[i]]); // Add day from map
          i += 1; // Move to the next character
      }
  }
  return days;
}

function generateEvents(data) {
  const events = [];

  for (const i of data[0]) {
      for (const k of i) {
          const id = generateUniqueId().toString();
          const title = `${k.code} (${k.schd})`;
          console.log(k.meets)
          let placed = [];
          for (const m of splitMultipleSlots(k.meets)) {
                if (placed.includes(m)) {
                  continue;
                  } else {
                    placed.push(m)
                  }

              const [dayString, timeRange] = m.split(" ");
              const days = getDaysFromCombinedString(dayString);
              const [startTime24h, endTime24h] = convertTo24HourFormat(timeRange);
              console.log([startTime24h, endTime24h])
              console.log(m)
              console.log("---------------------------")
              for (const q of days) {
                  if (q === "Online") {
                      continue;
                  }

                  const tempDic = {
                      id: id,
                      title: title,
                      start: `${dayToDate[q]} ${startTime24h}`,
                      end: `${dayToDate[q]} ${endTime24h}`
                  };
                  events.push(tempDic);
              }
          }
      }
  }

  return events;
}





function CalendarApp({schedule_info}) {
 
  let events = generateEvents(schedule_info)

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
      events: events,

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