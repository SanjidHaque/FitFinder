using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class CandidateExperience
    {
        [Key]
        public string Id { get; set; }
        public Candidate Candidate { get; set; }
        public string CandidateId { get; set; }
        public string EmployerName { get; set; }
        public string Designation { get; set; }
        public string Role { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public bool IsCurrent { get; set; }
    }
}