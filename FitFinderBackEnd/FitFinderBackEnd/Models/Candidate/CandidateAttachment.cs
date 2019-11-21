using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Candidate
{
    public class CandidateAttachment:Attachment
    {
        public Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public bool IsResume { get; set; }
    }
}