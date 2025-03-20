function convertTo24HourFormat(timeRange) {
    // Handle "Online" case
    if (timeRange === "Online") {
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

console.log(convertTo24HourFormat("12:20PM - 1:10PM / MoWeFr")); // Output: ["11:00", "12:15"]
