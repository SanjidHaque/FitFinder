using System.Collections.Generic;

namespace FitFinderBackEnd.Models.Settings
{
    public class Company
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyPhoneNumber { get; set; }
        public string AdminUserName { get; set; }
        public string AdminFullName { get; set; }
        public string AdminEmail { get; set; }
        public string AdminPhoneNumber { get; set; }
        public string JoiningDateTime { get; set; }
        public List<Candidate.Candidate> Candidates { get; set; }
        public List<Interview.Interview> Interviews { get; set; }
        public List<Job.Job> Jobs { get; set; }
        public List<Workflow> Workflows { get; set; }
        public List<Source> Sources { get; set; }
        public List<Department> Departments { get; set; }
        public List<JobFunction> JobFunctions { get; set; }
        public List<JobType> JobTypes { get; set; }
        public List<RejectedReason> RejectedReasons { get; set; }
        public List<WithdrawnReason> WithdrawnReasons { get; set; }
        public List<ApplicationUser> ApplicationUsers { get; set; } 
    }   
}
