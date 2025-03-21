import { useState,useEffect,useContext } from 'react'
import CryptoJS from 'crypto-js';

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import './calender.css'
import { customStyles } from '../../Search_and_Cart_components/Search_block_components/filter/Styles/searchbar_style'


import { DataContext } from '../../../../data/data';

let idCounter = 0;

function generateUniqueId() {
    // Increment the counter and return the new value
    idCounter++;
    return idCounter;
}

const dayMapping = {
  "Online": "Online",
  "Online Instruction": "Online",
  "Does Not Meet": "Does Not Meet",
  "by arrangement": "by arrangement",

  "M": "Monday",
  "Mo": "Monday",
  "MO": "Monday",

  "T": "Tuesday",
  "Tu": "Tuesday", 
  "TU": "Tuesday",

  "W": "Wednesday",
  "We": "Wednesday",
  "WE": "Wednesday",

  "Th": "Thursday",
  "TH": "Thursday",

  "F": "Friday",
  "Fr": "Friday",
  "FR": "Friday"


};

const dayToDate = {
    'Sunday': '2025-08-24',
    'Monday': '2025-08-25',
    'Tuesday': '2025-08-26',
    'Wednesday': '2025-08-27',
    'Thursday': '2025-08-28',
    'Friday': '2025-08-29',
    'Saturday': '2025-08-30',
    "Online": "2025-08-24",
    "Online Instruction": "2025-08-24",
    "Does Not Meet": "2025-08-24",
    "by arrangement": "2025-08-24",
};

function convertTo24HourFormat(timeRange) {
  // Handle "Online" case
  if (timeRange === "Online" || timeRange === "Online Instruction" || timeRange === "Does Not Meet" || timeRange === "by arrangement") {
      return ["00:00", "23:59"]; // Placeholder values
  }


  
  // Extract the time part (e.g., "8:00AM - 9:15AM")
  const timePart = timeRange.split('/')[0].trim(); // Extracts "8:00AM - 9:15AM"

  // Split the input into start time and end time
  const [startPart, endPart] = timePart.split('-').map(s => s.trim()); // ["8:00AM", "9:15AM"]

  // Helper function to parse time and period
  const parseTime = (timeWithPeriod) => {
      // Extract the period (last two characters, e.g., "AM" or "PM")
      const period = timeWithPeriod.slice(-2).toUpperCase(); // "AM" or "PM"
      const time = timeWithPeriod.slice(0, -2); // Remove the last two characters

      // Split into hours and minutes
      const [hour, minute] = time.split(':').map(Number);

      return { hour, minute, period };
  };

  // Parse start and end times
  const start = parseTime(startPart);
  const end = parseTime(endPart);

  // Convert start time to 24-hour format
  let startHour = start.hour;
  if (start.period === "PM" && startHour !== 12) {
      startHour += 12;
  } else if (start.period === "AM" && startHour === 12) {
      startHour = 0;
  }

  // Convert end time to 24-hour format
  let endHour = end.hour;
  if (end.period === "PM" && endHour !== 12) {
      endHour += 12;
  } else if (end.period === "AM" && endHour === 12) {
      endHour = 0;
  }

  // Format the times as HH:MM
  const startTime24h = `${String(startHour).padStart(2, '0')}:${String(start.minute).padStart(2, '0')}`;
  const endTime24h = `${String(endHour).padStart(2, '0')}:${String(end.minute).padStart(2, '0')}`;

  return [startTime24h, endTime24h];
}

function stringToLightHex(s) {
    // Create a hash of the string using CryptoJS
    const hashValue = CryptoJS.MD5(s).toString();

    // Convert parts of the hash to RGB values
    const r = (parseInt(hashValue.slice(0, 2), 16) % 106) + 150; // Ensure 150-255 range
    const g = (parseInt(hashValue.slice(2, 4), 16) % 106) + 150;
    const b = (parseInt(hashValue.slice(4, 6), 16) % 106) + 150;

    // Convert to hex format
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getDaysFromCombinedString(dayString) {
  // Handle "Online" case
  if (dayString === "Online" || dayString === "Online Instruction" || dayString === "Does Not Meet" || dayString === "by arrangement") {
      return ["Online"];
  }

  // Extract the day part (e.g., "TuTh" from "8:00AM - 9:15AM / TuTh")
  const dayPart = dayString; // Extracts "TuTh"

  // Initialize an empty list to store the full day names
  const days = [];
  let i = 0; // Start index

  while (i < dayPart.length) {
      if (i + 1 < dayPart.length && (dayPart.slice(i, i + 2) === 'TH' || dayPart.slice(i, i + 2) === 'Th' || dayPart.slice(i, i + 2) === 'Tu')) {
          // Check if it's Thursday or Tuesday
          const twoChar = dayPart.slice(i, i + 2);
          days.push(dayMapping[twoChar]); // Add day from map
          i += 2; // Skip next character
      } else {
          days.push(dayMapping[dayPart[i]]); // Add day from map
          i += 1; // Move to the next character
      }
  }
  return days;
}

export function generateEvents(data) {
  const events = [];
  const calendarsThemes = {};
  for (const i of data[0]) {
      for (const k of i) {
          const codeKey = k.code.replace(/ /g, "_");
          if (!calendarsThemes[codeKey]) {
              calendarsThemes[codeKey] = {
                  colorName: codeKey,
                  lightColors: {
                      main: stringToLightHex(codeKey + k.title),
                      container: stringToLightHex(codeKey + k.title),
                      onContainer: '#000000'
                  }
              };
          }

          const id = generateUniqueId().toString();
          const title = `${k.code} (${k.schd}) - ${k.Professor}`;
          
          // Split the input by '&' to handle multiple time ranges
          const timeRanges = k.time.split('&').map(s => s.trim());

          // Initialize an object to store unique time ranges for each day
          const dayTimeMap = {};

          for (const timeRange of timeRanges) {
              // Extract the time part (e.g., "5:00PM - 7:00PM") and day part (e.g., "Fr")
              const [timePart, dayPartWithDate] = timeRange.split('/').map(s => s.trim());
              const dayPart = dayPartWithDate.split(' ')[0]; // Extract "Fr" from "Fr (2025-11-07)"

              // Get the full day name from the mapping
              const fullDay = dayMapping[dayPart] || dayPart; // Fallback to the original if not found

              // If the day doesn't exist in the map, initialize it with an empty array
              if (!dayTimeMap[fullDay]) {
                  dayTimeMap[fullDay] = [];
              }

              // Add the time range to the day's array if it doesn't already exist
              if (!dayTimeMap[fullDay].includes(timePart)) {
                  dayTimeMap[fullDay].push(timePart);
              }
          }

          // Generate events for each unique time range
          for (const [fullDay, timeParts] of Object.entries(dayTimeMap)) {
              for (const timePart of timeParts) {
                  const [startTime24h, endTime24h] = convertTo24HourFormat(timePart);

                  if (fullDay === "Online" || fullDay === undefined || fullDay === "Online Instruction" ) {
                      continue;
                  }
                  if (!(fullDay in dayToDate)) {

                    for (let i of getDaysFromCombinedString(fullDay)){

                      if (i === "Online" || i === undefined || i === "Online Instruction") {
                        continue;
                    }

                      const tempDic = {
                        id: id,
                        title: title,
                        start: `${dayToDate[i]} ${startTime24h}`,
                        end: `${dayToDate[i]} ${endTime24h}`,
                        calendarId: codeKey
                    };
                    events.push(tempDic);
  
                    }


                  } else {

                    const tempDic = {
                      id: id,
                      title: title,
                      start: `${dayToDate[fullDay]} ${startTime24h}`,
                      end: `${dayToDate[fullDay]} ${endTime24h}`,
                      calendarId: codeKey
                  };
                  events.push(tempDic);


                  }




                  


              }
          }
      }
  }

  return { events, calendarsThemes };
}





function CalendarApp({schedule_info, index}) {
    const {settemp_schedule,settemp_events} = useContext(DataContext);



    
 
  let generation = generateEvents(schedule_info)
    generation["index"] = index
  useEffect(() => {
    settemp_events(generation)
    settemp_schedule(schedule_info)

  }, []); 


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