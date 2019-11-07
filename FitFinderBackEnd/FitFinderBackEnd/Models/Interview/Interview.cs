﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Interview
{
    public class Interview
    {
        [Key]
        public long Id { get; set; }
        public string InterviewDate { get; set; }
        public string InterviewName { get; set; }
        public string InterviewLocation { get; set; }
        public string InterviewStartTime { get; set; }
        public string InterviewEndTime { get; set; }
        public long InterviewType { get; set; }
        public List<CandidatesForInterview> CandidatesForInterview { get; set; }
        public List<InterviewersForInterview> InterviewersForInterview { get; set; }
        public long InterviewStatus { get; set; }
        public bool IsArchived { get; set; }
        public long CompanyId { get; set; }
    }
}