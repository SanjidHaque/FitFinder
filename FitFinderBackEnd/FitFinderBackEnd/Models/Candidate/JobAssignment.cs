using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Candidate
{
    public class JobAssignment
    {
        public long Id { get; set; }
        public Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public Job.Job Job { get; set; }
        public long? JobId { get; set; }
        public List<PipelineStageScore> StageScores { get; set; }
        public List<PipelineStageCriterionScore> CriteriaScores { get; set; }
        public List<PipelineStageComment> StageComments { get; set; }
        public long CurrentStageId { get; set; }
        public bool IsActive { get; set; }  
    }
}