using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Candidate;

namespace FitFinderBackEnd.Models.Settings
{
    public class StageComment
    {
        public long Id { get; set; }
        public JobAssignment JobAssignment { get; set; }
        public long JobAssignmentId { get; set; }
        public long PipelineStageId { get; set; }
        public long CandidateId { get; set; }
        public string Comment { get; set; }
    }
}