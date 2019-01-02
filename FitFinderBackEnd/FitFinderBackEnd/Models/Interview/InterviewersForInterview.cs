using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Interview
{
    public class InterviewersForInterview
    {
        [Key]
        public string Id { get; set; }
        public Interview Interview { get; set; }
        public string InterviewId { get; set; }
        public string InterviewerId { get; set; }
    }
}