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
        public List<PipelineStageScore> PipelineStageScores { get; set; }
        public List<PipelineStageCriterionScore> PipelineStageCriterionScores { get; set; }
        public List<GeneralComment> GeneralComments { get; set; } 
        public long CurrentPipelineStageId { get; set; }    
    }
}