using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text.Json;
using System.Xml;

namespace DataObjects
{


    public class RootPayload
    {


        public Dictionary<string, object> final(WeeklySchedule input)
        {
            bool invalidSchedule = false;
            bool terminate = false;
            Dictionary<string, object> output = new Dictionary<string, object>
                                                {
                                                    { "status", 0 },
                                                    { "message", "" }
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
                    output = this.value[input.monday[i].ClassName].AddConflictSection(input.monday[i - 1].ClassName, input.monday[i - 1].Crn, input.monday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.monday[i - 1].ClassName].AddConflictSection(input.monday[i].ClassName, input.monday[i].Crn, input.monday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (tuesdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.tuesday[i].ClassName].AddConflictSection(input.tuesday[i - 1].ClassName, input.tuesday[i - 1].Crn, input.tuesday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.tuesday[i - 1].ClassName].AddConflictSection(input.tuesday[i].ClassName, input.tuesday[i].Crn, input.tuesday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (wednesdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.wednesday[i].ClassName].AddConflictSection(input.wednesday[i - 1].ClassName, input.wednesday[i - 1].Crn, input.wednesday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.wednesday[i - 1].ClassName].AddConflictSection(input.wednesday[i].ClassName, input.wednesday[i].Crn, input.wednesday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (thursdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.thursday[i].ClassName].AddConflictSection(input.thursday[i - 1].ClassName, input.thursday[i - 1].Crn, input.thursday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.thursday[i - 1].ClassName].AddConflictSection(input.thursday[i].ClassName, input.thursday[i].Crn, input.thursday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (fridayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.friday[i].ClassName].AddConflictSection(input.friday[i - 1].ClassName, input.friday[i - 1].Crn, input.friday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.friday[i - 1].ClassName].AddConflictSection(input.friday[i].ClassName, input.friday[i].Crn, input.friday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }

                if (saturdayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.saturday[i].ClassName].AddConflictSection(input.saturday[i - 1].ClassName, input.saturday[i - 1].Crn, input.saturday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.saturday[i - 1].ClassName].AddConflictSection(input.saturday[i].ClassName, input.saturday[i].Crn, input.saturday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }
                }


                if (sundayConflict)
                {
                    invalidSchedule = true;
                    output = this.value[input.sunday[i].ClassName].AddConflictSection(input.sunday[i - 1].ClassName, input.sunday[i - 1].Crn, input.sunday[i].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                    output = this.value[input.sunday[i - 1].ClassName].AddConflictSection(input.sunday[i].ClassName, input.sunday[i].Crn, input.sunday[i - 1].Crn);
                    if ((bool)output["terminate"])
                    {
                        terminate = true;
                        break;
                    }

                }




                Console.WriteLine($"{mondayConflict}, {tuesdayConflict}, {wednesdayConflict}, {thursdayConflict}. {fridayConflict}, {saturdayConflict}, {sundayConflict}");
            }




            if (terminate == false && invalidSchedule == false)
            {
                return new Dictionary<string, object>
                {
                    { "status", 200 },
                    { "message", "" }
                };
            }
            else if (terminate == false && invalidSchedule == true)
            {
                return new Dictionary<string, object>
                {
                    { "status", 400 },
                    { "message", "" }
                };
            }
            else
            {
                return new Dictionary<string, object>
                {
                    { "status", 500 },
                    { "message", (string)output["message"] }
                };
            }

        }

        public WeeklySchedule TimeSlotMerger(List<SectionEntry> input)
        {
            var schedule = new WeeklySchedule
            {
                monday = new List<TimeSlotEntry>(),
                tuesday = new List<TimeSlotEntry>(),
                wednesday = new List<TimeSlotEntry>(),
                thursday = new List<TimeSlotEntry>(),
                friday = new List<TimeSlotEntry>(),
                saturday = new List<TimeSlotEntry>(),
                sunday = new List<TimeSlotEntry>()
            };


            foreach (var dict in input)
            {
                schedule.monday = MergeSortedLists(schedule.monday, dict.Time.monday);
                schedule.tuesday = MergeSortedLists(schedule.tuesday, dict.Time.tuesday);
                schedule.wednesday = MergeSortedLists(schedule.wednesday, dict.Time.wednesday);
                schedule.thursday = MergeSortedLists(schedule.thursday, dict.Time.thursday);
                schedule.friday = MergeSortedLists(schedule.friday, dict.Time.friday);
                schedule.saturday = MergeSortedLists(schedule.saturday, dict.Time.saturday);
                schedule.sunday = MergeSortedLists(schedule.sunday, dict.Time.sunday);

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
                        merged.Add(list1[i]); // Avoid duplicates
                        i++; j++;
                    }
                }

                // Add remaining elements
                while (i < list1.Count) merged.Add(list1[i++]);
                while (j < list2.Count) merged.Add(list2[j++]);

                return merged;
            }












            return schedule;

        }


        public IEnumerable<List<SectionEntry>> CartesianProduct(List<List<SectionEntry>> arrays, int index = 0)
        {
            if (index == arrays.Count)
            {
                yield return new List<SectionEntry>();
                yield break;
            }

            foreach (var item in arrays[index])
            {
                foreach (var product in CartesianProduct(arrays, index + 1))
                {
                    Boolean output = false;

                    product.Add(item);


                    if (product.Count > 1)
                    {

                        for (int i = product.Count - 2; i >= 0; i--)
                        {
                            output = this.value[product[i].ClassName].CheckConfilict(product[product.Count - 1].ClassName, product[product.Count - 1].Crn, product[i].Crn);
                            Console.WriteLine(output);
                            if (output)
                            {
                                break;
                            }
                        }


                    }

                    if (output)
                    {
                        continue;
                    }



                    yield return product;
                }
            }
        }



        public required int status { get; set; }

        public required Dictionary<string, CourseEntry> value { get; set; }

        public required List<List<SectionEntry>> TotalAlltimeslots = new List<List<SectionEntry>>();




        public RootPayload()
        {
        }

        public void InitializeScheduler()
        {
            Dictionary<string, Dictionary<string, HashSet<string>>> tempdic = new Dictionary<string, Dictionary<string, HashSet<string>>>();

            foreach (var CourseEntry in value)
            {
                tempdic[CourseEntry.Key] = new Dictionary<string, HashSet<string>>();

                foreach (var crn in CourseEntry.Value.AllClassCRNs)
                {
                    tempdic[CourseEntry.Key][crn] = new HashSet<string>();
                }

                tempdic[CourseEntry.Key]["conflictCRNs"] = new HashSet<string>();

            }

            foreach (var CourseEntry in value)
            {
                CourseEntry.Value.ConflictDetectionHashMap = tempdic;
                TotalAlltimeslots.Add(CourseEntry.Value.AllClassTimeSlots);


                CourseEntry.Value.CourseName = CourseEntry.Key;
                CourseEntry.Value.Initializer();
            }

        }




        public Dictionary<string, object> Scheduler()
        {
            int skipcount = 0;
            int successcount = 0;

            List<Dictionary<string, string>> validSchedules = new List<Dictionary<string, string>>();

            foreach (var combo in CartesianProduct(TotalAlltimeslots))
            {
                var mergedTimeSlots = TimeSlotMerger(combo);
                Dictionary<string, object> output = final(mergedTimeSlots);
                if ((int)output["status"] == 200)
                {
                    Dictionary<string, string> validSchedule = new Dictionary<string, string>();
                    foreach (var element in combo)
                    {
                        validSchedule[element.ClassName] = element.Crn;
                    }

                    validSchedules.Add(validSchedule);
                    successcount++;
                    continue;
                }

                if ((int)output["status"] == 500)
                {
                    return output;
                }

                skipcount++;
            }
            
            Console.WriteLine("ssssssssssssssssssssssssss");

            Console.WriteLine(skipcount);
            Console.WriteLine(successcount);

            return new Dictionary<string, object>
            {
                { "status", 200 },
                { "message", validSchedules }
            };

        }












    }


    public class CourseEntry
    {

        public required int CRNcount;
        public required string CourseName;



        public required List<string> AllClassCRNs { get; set; }
        public required List<SectionEntry> AllClassTimeSlots { get; set; }
        public required Dictionary<string, Dictionary<string, HashSet<string>>> ConflictDetectionHashMap;

        public CourseEntry()
        {
        }

        public void Initializer()
        {
            this.CRNcount = this.AllClassCRNs.Count;
        }





        public void Test()
        {
            string json = JsonSerializer.Serialize(this.ConflictDetectionHashMap, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(json);
        }



        public Dictionary<string, object> AddConflictSection(string conflictClassName, string conflictCrn, string crn)
        {

            if (!ConflictDetectionHashMap[conflictClassName][conflictCrn].Contains(crn))
            {
                ConflictDetectionHashMap[conflictClassName][conflictCrn].Add(crn);

                if (ConflictDetectionHashMap[conflictClassName][conflictCrn].Count == CRNcount)
                {
                    ConflictDetectionHashMap[conflictClassName]["conflictCRNs"].Add(conflictCrn);

                    if (ConflictDetectionHashMap[conflictClassName]["conflictCRNs"].Count == (ConflictDetectionHashMap[conflictClassName].Count - 1))
                    {
                        Console.WriteLine("Conflict between" + this.CourseName + conflictClassName);


                        return new Dictionary<string, object>
                        {
                            { "terminate", true },
                            { "message", "Conflict between" + this.CourseName + conflictClassName }
                        };

                    }
                    return new Dictionary<string, object>
                    {
                        { "terminate", false },
                        { "message", "" }
                    };
                }
            }

            return new Dictionary<string, object>
            {
                { "terminate", false },
                { "message", "" }
            };
        }



        public bool CheckConfilict(string conflictClassName, string conflictCrn, string crn)
        {
            return ConflictDetectionHashMap[conflictClassName][conflictCrn].Contains(crn);
        }

    }






    public class SectionEntry()
    {
        public required string Crn { get; set; }
        public required string ClassName { get; set; }
        public required WeeklySchedule Time { get; set; }
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