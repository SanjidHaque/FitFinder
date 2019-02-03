using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class AssignedJobToCandidate
    {
        public long Id { get; set; }
        public long CandidateId { get; set; }
        public long JobId { get; set; }
    }
}