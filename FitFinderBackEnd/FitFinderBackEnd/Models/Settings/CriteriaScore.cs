﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Candidate;

namespace FitFinderBackEnd.Models.Settings
{
    public class CriteriaScore
    {
        public long Id { get; set; }
        public JobAssignment JobAssignment { get; set; }
        public long? JobAssignmentId { get; set; }
        public long Rating { get; set; }
        public PipelineStageCriterion PipelineStageCriterion { get; set; }
        public long PipelineStageCriterionId { get; set; }
        public Candidate.Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
    }
}