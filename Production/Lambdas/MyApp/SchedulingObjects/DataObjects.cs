using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text.Json;
using System.Xml;

namespace DataObjects
{
    public class CourseEntry
    {
        public required string CourseName;
        public required List<string> AllClassCRNs { get; set; }
        public required List<SectionEntry> SectionEntries { get; set; }
        public required Dictionary<string, Dictionary<string, HashSet<string>>> ConflictDetectionHashMap;

        public CourseEntry()
        {
        }

        public Dictionary<string, object> AddConflictingSection(string conflictCourse, string conflictCrn, string ownCrn)
        {
            if (!ConflictDetectionHashMap[conflictCourse][conflictCrn].Contains(ownCrn))
            {
                ConflictDetectionHashMap[conflictCourse][conflictCrn].Add(ownCrn);

                if (ConflictDetectionHashMap[conflictCourse][conflictCrn].Count == this.AllClassCRNs.Count)
                {
                    ConflictDetectionHashMap[conflictCourse]["conflictCRNs"].Add(conflictCrn);

                    if (ConflictDetectionHashMap[conflictCourse]["conflictCRNs"].Count == (ConflictDetectionHashMap[conflictCourse].Count - 1))
                    {
                        Console.WriteLine("All class section time conflict between" + this.CourseName + conflictCourse);
                        
                        return new Dictionary<string, object>
                        {
                            { "terminate", true },
                            { "value", "All class section time conflict between" + this.CourseName + conflictCourse }
                        };

                    }
                    return new Dictionary<string, object>
                    {
                        { "terminate", false },
                        { "value", "" }
                    };
                }
            }

            return new Dictionary<string, object>
            {
                { "terminate", false },
                { "value", "" }
            };
        }


        public bool CheckConfilict(string conflictClassName, string conflictCrn, string ownCrn)
        {
            return ConflictDetectionHashMap[conflictClassName][conflictCrn].Contains(ownCrn);
        }
    }
}

