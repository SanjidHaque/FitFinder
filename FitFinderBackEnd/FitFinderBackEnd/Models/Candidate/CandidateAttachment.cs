using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class CandidateAttachment
    {

        public long Id { get; set; }
        public long CandidateId { get; set; }
        public string FileName { get; set; }
        public string ModifiedFileName { get; set; }
        public bool IsResume { get; set; }
    }
}