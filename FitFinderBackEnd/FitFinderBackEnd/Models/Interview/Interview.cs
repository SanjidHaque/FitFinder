using System.Collections.Generic;
using FitFinderBackEnd.Models.Settings;
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
        public List<CandidateForInterview> CandidatesForInterview { get; set; }
        public List<InterviewerForInterview> InterviewersForInterview { get; set; }
        public bool IsArchived { get; set; }
        public string HiringManagerName { get; set; }
        public long? ConfirmedCandidate { get; set; }
        public long? DeclinedCandidate { get; set; }    
    }
}