using System.Collections.Generic;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Candidate
{
    public class Candidate
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName  { get; set; }
        public string Email  { get; set; }
        public string Mobile  { get; set; }
        public string Address  { get; set; }
        public string City  { get; set; }
        public string State  { get; set; }
        public string Country  { get; set; }
        public Source Source { get; set; }  
        public long SourceId  { get; set; }       
        public List<CandidateEducation> CandidateEducations { get; set; }     
        public List<CandidateExperience> CandidateExperiences { get; set; }    
        public List<CandidateAttachment> CandidateAttachments { get; set; }
        public List<JobAssignment> JobAssignments { get; set; }   
        public string FacebookUrl { get; set; }   
        public string LinkedInUrl  { get; set; }
        public string GitHubUrl { get; set; }     
        public bool IsArchived  { get; set; }
        public bool IsHired { get; set; }
        public bool IsClosed  { get; set; }
        public string ApplicationDate { get; set; }
        public bool IsFavourite { get; set; }
        public string CandidateImagePath { get; set; }
        public Company Company { get; set; }    
        public long? CompanyId { get; set; } 
    
    }
}