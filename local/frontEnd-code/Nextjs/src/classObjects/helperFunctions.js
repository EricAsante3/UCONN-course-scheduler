function containsArray(mainArr, subArr) {
    return mainArr.some(a => 
        a.length === subArr.length &&
        a.every((val, i) => val === subArr[i])
    );
}


export function sortedInsert(array, value) {

    value.forEach(element => {
      
      if (!containsArray(array, element)) {

        // Find where the new value should go
        let index = array.findIndex(el => el[0] > element[0]);
        
        if (index === -1) {
            // If no element is greater, append at the end
            array.push(element);
        } else {
            // Insert at the found index
            array.splice(index, 0, element);
        }

      }
    
    });
}





export function parseSchedule(input) {

  // Map day abbreviations to full names
  const dayMap = {
    Mo: "monday",
    Tu: "tuesday",
    We: "wednesday",
    Th: "thursday",
    Fr: "friday",
    Sa: "saturday",
    Su: "sunday",
  };

  // Helper: convert "9:30AM" or "12:00PM" to minutes after midnight
  function timeToMinutes(t) {
    let [time, meridian] = t.match(/(\d{1,2}:\d{2})(AM|PM)/).slice(1);
    let [hours, minutes] = time.split(":").map(Number);

    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  // Split by "&" to get each block
  const blocks = input.split("&").map(s => s.trim());

  const schedule = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  for (const block of blocks) {
    // Example block:
    // "5:00PM - 7:00PM / Fr (2025-11-07)"
    // or "9:05AM - 9:55AM / WeFr"
    // Extract times and day part
    const [timePart, dayPartWithDate] = block.split("/").map(s => s.trim());

    // Get start/end times
    const [startStr, endStr] = timePart.split("-").map(s => s.trim());

    const start = timeToMinutes(startStr);
    const end = timeToMinutes(endStr);

    // Extract just day abbreviations, ignore date in parentheses
    // dayPartWithDate could be "Fr (2025-11-07)" or "WeFr"
    // Remove parentheses and spaces
    const dayPart = dayPartWithDate.replace(/\(.*?\)/g, "").trim();

    // The dayPart might be concatenated days like "WeFr" or separated by spaces "Mo We"
    // We'll split into pairs of letters to find days (Mo,Tu,We,Th,Fr,Sa,Su)
    // Regex to find all 2-letter day abbreviations in sequence
    const dayAbbreviations = dayPart.match(/Mo|Tu|We|Th|Fr|Sa|Su/g);

    if (!dayAbbreviations) continue; // no valid days found

    for (const dayAbbr of dayAbbreviations) {
      const fullDay = dayMap[dayAbbr];
      if (fullDay) {
        sortedInsert(schedule[fullDay], [[start, end]])
      }
    }
  }

  return schedule;
}


export function extractSections(str) {
  // Match groups of digits optionally followed by a letter
  return str.match(/\b\d{3}[A-Z]?\b/g) || [];
}

export function convertScheduleToEvents(array, schedule, className = "B1", section) {
  const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  const startSunday = new Date(2025, 9, 19); // 2025-10-19, month 0-indexed

  for (let i = 0; i < days.length; i++) {
    const dayIntervals = schedule[days[i]] || [];
    const date = new Date(startSunday);
    date.setDate(startSunday.getDate() + i);

    for (const interval of dayIntervals) {
        const [startMin, endMin] = interval; // parseSchedule format

        const format = (d, m) => {
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          const hh = String(Math.floor(m / 60)).padStart(2, "0");
          const min = String(m % 60).padStart(2, "0");
          return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
        };

        array.push({
          id: array.length + 1,
          title: className + " - " + section,
          start: format(date, startMin),
          end: format(date, endMin),
          calendarId: className.replace(/\s+/g, "")
        });

    }
  }
}

// Helper: generate a random hex color
export function randomHexColor() {
  // Bright RGB channels for contrast with black
  const r = Math.floor(Math.random() * 106) + 95; // 150 - 255
  const g = Math.floor(Math.random() * 106) + 95; // 150 - 255
  const b = Math.floor(Math.random() * 106) + 95; // 150 - 255

  // Convert to hex and pad
  const hex =
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');

  return hex;
}

// Helper: darken or lighten a hex color
export function adjustHexColor(hex, percent) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, Math.max(0, Math.floor(r * (1 + percent / 100))));
  const newG = Math.min(255, Math.max(0, Math.floor(g * (1 + percent / 100))));
  const newB = Math.min(255, Math.max(0, Math.floor(b * (1 + percent / 100))));

  const toHex = (x) => x.toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}













const dayMap = {
  Mo: "monday",
  Tu: "tuesday",
  We: "wednesday",
  Th: "thursday",
  Fr: "friday",
  Sa: "saturday",
  Su: "sunday",
};

const reverseDayMap = Object.fromEntries(
  Object.entries(dayMap).map(([k, v]) => [v, k])
);

const dayOrder = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function minutesToTime(mins) {
  const hour = Math.floor(mins / 60);
  const minute = mins % 60;
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minute.toString().padStart(2, "0")}${ampm}`;
}

function mergeConsecutiveDays(days) {
  if (days.length === 0) return "";
  const sortedDays = days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  let merged = [sortedDays[0]];
  
  for (let i = 1; i < sortedDays.length; i++) {
    const prevIndex = dayOrder.indexOf(sortedDays[i - 1]);
    const currIndex = dayOrder.indexOf(sortedDays[i]);
    const lastMerged = merged[merged.length - 1];
    
    // If previous merged entry is a string (single day), convert to array
    if (Array.isArray(lastMerged)) {
      const lastIndex = dayOrder.indexOf(lastMerged[lastMerged.length - 1]);
      if (currIndex === lastIndex + 1) {
        lastMerged.push(sortedDays[i]);
      } else {
        merged.push([sortedDays[i]]);
      }
    } else {
      if (currIndex === dayOrder.indexOf(lastMerged) + 1) {
        merged[merged.length - 1] = [lastMerged, sortedDays[i]];
      } else {
        merged.push(sortedDays[i]);
      }
    }
  }

  // Convert arrays to concatenated strings
  return merged
    .map(d => (Array.isArray(d) ? d.join("") : d))
    .join("");
}

export function ScheduleObjectToString(schedule) {
  const timeGroups = {};

  for (const [day, ranges] of Object.entries(schedule)) {
    for (const [start, end] of ranges) {
      const timeKey = `${minutesToTime(start)} - ${minutesToTime(end)}`;
      if (!timeGroups[timeKey]) {
        timeGroups[timeKey] = [];
      }
      timeGroups[timeKey].push(reverseDayMap[day]);
    }
  }

  // Convert to final string
  return Object.entries(timeGroups)
    .map(([time, days]) => `${time} / ${mergeConsecutiveDays(days)}`)
    .join(", ");
}

export function getNextTerms(currentDate = new Date(), n = 3) {
  const terms = ['Winter', 'Spring', 'Summer', 'Fall'];
  const month = currentDate.getMonth() + 1; // getMonth() is 0-based in JS
  let currentTerm;

  if ([1, 2].includes(month)) {
    currentTerm = 'Winter';
  } else if ([3, 4, 5].includes(month)) {
    currentTerm = 'Spring';
  } else if ([6, 7, 8].includes(month)) {
    currentTerm = 'Summer';
  } else {
    currentTerm = 'Fall';
  }

  let termIndex = terms.indexOf(currentTerm);
  let year = currentDate.getFullYear();
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(`${terms[termIndex]} ${year}`);
    termIndex = (termIndex + 1) % terms.length;
    if (termIndex === 0) {
      year += 1; // wrap back to Winter, increment year
    }
  }
  result.reverse()
  return result;
}