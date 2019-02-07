using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Candidate;

namespace FitFinderBackEnd.Models.Settings
{
    public class StageScore
    {
        public long Id { get; set; }
        public JobAssigned JobAssigned { get; set; }
        public long JobAssignedId { get; set; }
        public long Rating { get; set; }
        public long PipelineStageId { get; set; }
        public long CandidateId { get; set; }
        public long JobId { get; set; }
    }
}