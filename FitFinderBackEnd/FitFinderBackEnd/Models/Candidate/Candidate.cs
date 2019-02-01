using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class Candidate
    {

        public long Id { get; set; }
        public long JobId { get; set; }  
        public string FirstName { get; set; }
        public string LastName  { get; set; }
        public string Email  { get; set; }
        public string Mobile  { get; set; }
        public string Address  { get; set; }
        public string City  { get; set; }
        public string State  { get; set; }
        public string Country  { get; set; }      
        public long SourceId  { get; set; }       
        public List<CandidateEducation> CandidateEducation { get; set; }     
        public List<CandidateExperience> CandidateExperience { get; set; }    
        public List<CandidateAttachment> CandidateAttachment { get; set; }
        public string FacebookUrl { get; set; }   
        public string LinkedInUrl  { get; set; }
        public bool IsArchived  { get; set; }
        public bool IsHired { get; set; }
        public bool IsClosed  { get; set; }
        public string ApplicationDate { get; set; }
    
    }
}