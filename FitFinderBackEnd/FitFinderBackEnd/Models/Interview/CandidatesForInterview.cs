using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Interview
{
    public class CandidatesForInterview
    {
        public long Id { get; set; }
        public long InterviewId { get; set; }
        public long CandidateId { get; set; }
    }
}