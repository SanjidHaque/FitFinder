using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class CandidateAttachment
    {
        [Key]
        public string Id { get; set; }
        public Candidate Candidate { get; set; }
        public string CandidateId { get; set; }
        public string FileName { get; set; }
        public string FilePath  { get; set; }
        public bool IsResume { get; set; }
    }
}