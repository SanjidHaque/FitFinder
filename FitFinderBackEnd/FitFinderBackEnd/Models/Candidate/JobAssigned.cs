using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class JobAssigned
    {
        public long Id { get; set; }
        public Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public Job.Job Job { get; set; }
        public long JobId { get; set; }
    }
}