namespace DataObjects
{
    public class SectionEntry
    {
        public required string Crn { get; set; }
        public required string ClassName { get; set; }
        public required WeeklySchedule MeetingTime { get; set; }
    }


    public class WeeklySchedule
    {
        public required List<TimeSlotEntry> monday { get; set; }
        public required List<TimeSlotEntry> tuesday { get; set; }
        public required List<TimeSlotEntry> wednesday { get; set; }
        public required List<TimeSlotEntry> thursday { get; set; }
        public required List<TimeSlotEntry> friday { get; set; }
        public required List<TimeSlotEntry> saturday { get; set; }
        public required List<TimeSlotEntry> sunday { get; set; }
    }


    public class TimeSlotEntry
    {
        public required string Crn { get; set; }
        public required string ClassName { get; set; }
        public required List<int> TimeSlots { get; set; }
    }
}