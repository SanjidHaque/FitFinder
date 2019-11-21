using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Shared
{
    public class Stage
    {
        public long Id { get; set; }
        public JobAssignment JobAssignment { get; set; }
        public long? JobAssignmentId { get; set; }
        public PipelineStage PipelineStage { get; set; }
        public long PipelineStageId { get; set; }
        public Candidate.Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
    }
}