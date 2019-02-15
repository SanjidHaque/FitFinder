using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Candidate
{
    public class JobAssigned
    {
        public long Id { get; set; }
        public Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public Job.Job Job { get; set; }
        public long JobId { get; set; }
        public List<StageScore> StageScore { get; set; }
        public List<CriteriaScore> CriteriaScore { get; set; }
        public List<StageComment> StageComment { get; set; }
        public long CurrentStageId { get; set; }
        public bool IsActive { get; set; }  
    }
}