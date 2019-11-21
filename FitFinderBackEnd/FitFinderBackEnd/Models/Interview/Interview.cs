using System.Collections.Generic;
using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Interview
{
    public class Interview : Resource
    {
        public string Date { get; set; }
        public string Location { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string InterviewType { get; set; }
        public List<CandidatesForInterview> CandidatesForInterview { get; set; }
        public List<InterviewersForInterview> InterviewersForInterview { get; set; }
        public string InterviewStatus { get; set; }
        public bool IsArchived { get; set; }
    }
}