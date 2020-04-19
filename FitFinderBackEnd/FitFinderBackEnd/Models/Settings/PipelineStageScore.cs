using System.Collections.Generic;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Settings
{
    public class PipelineStageScore
    {
        public long Id { get; set; }
        public JobAssignment JobAssignment { get; set; }
        public long? JobAssignmentId { get; set; }
        public PipelineStage PipelineStage { get; set; }
        public long? PipelineStageId { get; set; }
        public Candidate.Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public long Rating { get; set; }
    }
}