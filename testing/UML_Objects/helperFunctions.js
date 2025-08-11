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

