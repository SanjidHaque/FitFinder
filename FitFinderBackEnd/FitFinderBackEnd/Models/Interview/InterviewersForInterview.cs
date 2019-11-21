using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Interview
{
    public class InterviewersForInterview
    {
        public long Id { get; set; }
        public Interview Interview { get; set; }    
        public long? InterviewId { get; set; }
        public UserAccount UserAccount { get; set; }        
        public long UserAccountId { get; set; }     
    }
}