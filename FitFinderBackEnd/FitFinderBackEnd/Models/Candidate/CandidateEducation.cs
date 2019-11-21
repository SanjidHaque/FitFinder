using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class CandidateEducation
    {
        public long Id { get; set; }
        public Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public string Name { get; set; }
        public string InstituteName { get; set; }
        public string Result  { get; set; }
        public string StartDate  { get; set; }
        public string EndDate  { get; set; }
    }
}