using System.Diagnostics;


namespace DataObjects
{

    public class SchedulingSystem
    {
        int productcount = 0;
        public required int status { get; set; }
        public required Dictionary<string, CourseEntry> value { get; set; }
        public required List<List<SectionEntry>> allSectionEntries = new List<List<SectionEntry>>();

        public Dictionary<string, object> ValidateSchedule(WeeklySchedule input)
        {
            bool invalidSchedule = false;
            bool terminate = false;

            Dictionary<string, object> output = new Dictionary<string, object>
                                                {
                                                    { "status", 0 },
                                                    { "value", "" }
                                                };

            int maxLength = new[]
            {
                input.monday.Count,
                input.tuesday.Count,
                input.wednesday.Count,
                input.thursday.Count,
                input.friday.Count,
                input.saturday.Count,
                input.sunday.Count
            }.Max();

            for (int i = 1; i < maxLength; i++)
            {
                var mondayConflict = i < input.monday.Count ? input.monday[i - 1].TimeSlots[1] > input.monday[i].TimeSlots[0] : false;
                var tuesdayConflict = i < input.tuesday.Count ? input.tuesday[i - 1].TimeSlots[1] > input.tuesday[i].TimeSlots[0] : false;
                var wednesdayConflict = i < input.wednesday.Count ? input.wednesday[i - 1].TimeSlots[1] > input.wednesday[i].TimeSlots[0] : false;
                var thursdayConflict = i < input.thursday.Count ? input.thursday[i - 1].TimeSlots[1] > input.thursday[i].TimeSlots[0] : false;
                var fridayConflict = i < input.friday.Count ? input.friday[i - 1].TimeSlots[1] > input.friday[i].TimeSlots[0] : false;
                var saturdayConflict = i < input.saturday.Count ? input.saturday[i - 1].TimeSlots[1] > input.saturday[i].TimeSlots[0] : false;
                var sundayConflict = i < input.sunday.Count ? input.sunday[i - 1].TimeSlots[1] > input.sunday[i].TimeSlots[0] : false;

                if (mondayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.monday[i].ClassName].AddConflictingSection(input.monday[i - 1].ClassName, input.monday[i - 1].Crn, input.monday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.monday[i - 1].ClassName].AddConflictingSection(input.monday[i].ClassName, input.monday[i].Crn, input.monday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (tuesdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.tuesday[i].ClassName].AddConflictingSection(input.tuesday[i - 1].ClassName, input.tuesday[i - 1].Crn, input.tuesday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.tuesday[i - 1].ClassName].AddConflictingSection(input.tuesday[i].ClassName, input.tuesday[i].Crn, input.tuesday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (wednesdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.wednesday[i].ClassName].AddConflictingSection(input.wednesday[i - 1].ClassName, input.wednesday[i - 1].Crn, input.wednesday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.wednesday[i - 1].ClassName].AddConflictingSection(input.wednesday[i].ClassName, input.wednesday[i].Crn, input.wednesday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (thursdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.thursday[i].ClassName].AddConflictingSection(input.thursday[i - 1].ClassName, input.thursday[i - 1].Crn, input.thursday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.thursday[i - 1].ClassName].AddConflictingSection(input.thursday[i].ClassName, input.thursday[i].Crn, input.thursday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (fridayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.friday[i].ClassName].AddConflictingSection(input.friday[i - 1].ClassName, input.friday[i - 1].Crn, input.friday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.friday[i - 1].ClassName].AddConflictingSection(input.friday[i].ClassName, input.friday[i].Crn, input.friday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (saturdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.saturday[i].ClassName].AddConflictingSection(input.saturday[i - 1].ClassName, input.saturday[i - 1].Crn, input.saturday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.saturday[i - 1].ClassName].AddConflictingSection(input.saturday[i].ClassName, input.saturday[i].Crn, input.saturday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (sundayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.sunday[i].ClassName].AddConflictingSection(input.sunday[i - 1].ClassName, input.sunday[i - 1].Crn, input.sunday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.sunday[i - 1].ClassName].AddConflictingSection(input.sunday[i].ClassName, input.sunday[i].Crn, input.sunday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                }
            }




            if (terminate == false && invalidSchedule == false)
            {
                return new Dictionary<string, object>
                {
                    { "status", 200 },
                    { "value", "" }
                };
            }
            else if (terminate == false && invalidSchedule == true)
            {
                return new Dictionary<string, object>
                {
                    { "status", 400 },
                    { "value", "" }
                };
            }
            else
            {
                return new Dictionary<string, object>
                {
                    { "status", 500 },
                    { "value", (string)output["value"] }
                };
            }

        }

        public static WeeklySchedule MeetingTimeMerger(List<SectionEntry> comboResults)
        {
            var mergedTimeSlots = new WeeklySchedule
            {
                monday = new List<TimeSlotEntry>(),
                tuesday = new List<TimeSlotEntry>(),
                wednesday = new List<TimeSlotEntry>(),
                thursday = new List<TimeSlotEntry>(),
                friday = new List<TimeSlotEntry>(),
                saturday = new List<TimeSlotEntry>(),
                sunday = new List<TimeSlotEntry>()
            };

            foreach (var sectionEntry in comboResults)
            {
                mergedTimeSlots.monday = MergeSortedLists(mergedTimeSlots.monday, sectionEntry.MeetingTime.monday);
                mergedTimeSlots.tuesday = MergeSortedLists(mergedTimeSlots.tuesday, sectionEntry.MeetingTime.tuesday);
                mergedTimeSlots.wednesday = MergeSortedLists(mergedTimeSlots.wednesday, sectionEntry.MeetingTime.wednesday);
                mergedTimeSlots.thursday = MergeSortedLists(mergedTimeSlots.thursday, sectionEntry.MeetingTime.thursday);
                mergedTimeSlots.friday = MergeSortedLists(mergedTimeSlots.friday, sectionEntry.MeetingTime.friday);
                mergedTimeSlots.saturday = MergeSortedLists(mergedTimeSlots.saturday, sectionEntry.MeetingTime.saturday);
                mergedTimeSlots.sunday = MergeSortedLists(mergedTimeSlots.sunday, sectionEntry.MeetingTime.sunday);
            }

            static List<TimeSlotEntry> MergeSortedLists(List<TimeSlotEntry> list1, List<TimeSlotEntry> list2)
            {
                var merged = new List<TimeSlotEntry>(list1.Count + list2.Count);
                int i = 0, j = 0;

                while (i < list1.Count && j < list2.Count)
                {
                    if (list1[i].TimeSlots[0] < list2[j].TimeSlots[0])
                        merged.Add(list1[i++]);
                    else if (list1[i].TimeSlots[0] > list2[j].TimeSlots[0])
                        merged.Add(list2[j++]);
                    else
                    {
                        merged.Add(list1[i]);
                        merged.Add(list2[j]);
                        i++; j++;
                    }
                }

                while (i < list1.Count) merged.Add(list1[i++]);
                while (j < list2.Count) merged.Add(list2[j++]);

                return merged;
            }

            return mergedTimeSlots;
        }

        public IEnumerable<List<SectionEntry>> CartesianProduct(List<List<SectionEntry>> allSectionEntries, int index = 0)
        {
            if (index == allSectionEntries.Count)
            {
                yield return new List<SectionEntry>();
                yield break;
            }

            foreach (var section in allSectionEntries[index])
            {
                foreach (var sectionCombination in CartesianProduct(allSectionEntries, index + 1))
                {
                    bool conflict = false;
                    sectionCombination.Add(section);

                    for (int i = sectionCombination.Count - 2; i >= 0; i--)
                    {
                        conflict = this.value[sectionCombination[i].ClassName].CheckConfilict(sectionCombination[sectionCombination.Count - 1].ClassName, sectionCombination[sectionCombination.Count - 1].Crn, sectionCombination[i].Crn);
                        if (conflict)
                        {
                            break;
                        }
                    }

                    if (conflict)
                    {
                        productcount++;
                        continue;
                    }


                    yield return sectionCombination;
                }
            }
        }

        public SchedulingSystem()
        {
        }

        public void InitializeScheduler()
        {
            Dictionary<string, Dictionary<string, HashSet<string>>> ConflictDetectionHashMap = new Dictionary<string, Dictionary<string, HashSet<string>>>();

            foreach (var CourseEntry in value)
            {
                ConflictDetectionHashMap[CourseEntry.Key] = new Dictionary<string, HashSet<string>>();

                foreach (var crn in CourseEntry.Value.AllClassCRNs)
                {
                    ConflictDetectionHashMap[CourseEntry.Key][crn] = new HashSet<string>();
                }

                ConflictDetectionHashMap[CourseEntry.Key]["conflictCRNs"] = new HashSet<string>();

            }

            foreach (var CourseEntry in value)
            {
                CourseEntry.Value.ConflictDetectionHashMap = ConflictDetectionHashMap;
                allSectionEntries.Add(CourseEntry.Value.SectionEntries);
                CourseEntry.Value.CourseName = CourseEntry.Key;
            }

        }

        public Dictionary<string, object> Schedule()
        {

            List<Dictionary<string, string>> validSchedules = new List<Dictionary<string, string>>();
            Stopwatch stopwatch = Stopwatch.StartNew();

            foreach (var sectionCombination in CartesianProduct(allSectionEntries))
            {

                var mergedTimeSlots = MeetingTimeMerger(sectionCombination);
                Dictionary<string, object> output = ValidateSchedule(mergedTimeSlots);

                if ((int)output["status"] == 200)
                {
                    Dictionary<string, string> validSchedule = new Dictionary<string, string>();
                    foreach (var section in sectionCombination)
                    {
                        validSchedule[section.ClassName] = section.Crn;
                    }

                    validSchedules.Add(validSchedule);

                    if (validSchedules.Count == 200)
                    {
                        break;
                    }

                    continue;
                }

                if ((int)output["status"] == 500)
                {
                    return output;
                }



                if (stopwatch.Elapsed >= TimeSpan.FromSeconds(45))
                {
                    return new Dictionary<string, object>
                    {
                        { "status", 350 },
                        { "value", validSchedules }
                    };
                }
            }

            return new Dictionary<string, object>
            {
                { "status", 200 },
                { "value", validSchedules }
            };

        }
    }

}