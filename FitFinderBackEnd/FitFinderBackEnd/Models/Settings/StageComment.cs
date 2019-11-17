using FitFinderBackEnd.Models.Candidate;

namespace FitFinderBackEnd.Models.Settings
{
    public class StageComment
    {
        public long Id { get; set; }
        public JobAssignment JobAssignment { get; set; }
        public long? JobAssignmentId { get; set; }
        public PipelineStage PipelineStage { get; set; }    
        public long PipelineStageId { get; set; }
        public Candidate.Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public string Comment { get; set; }
    }
}