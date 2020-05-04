using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Settings;
using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Job
{
    public class Job
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string ImmediateSkills { get; set; }
        public string IntermediateSkills { get; set; }
        public string GoodToHaveSkills { get; set; }
        public string Location { get; set; }
        public Department Department { get; set; }  
        public long? DepartmentId { get; set; }
        public JobFunction JobFunction { get; set; }
        public long? JobFunctionId { get; set; }
        public JobType JobType { get; set; }
        public long? JobTypeId { get; set; }
        public long? Positions { get; set; }
        public string ClosingDate { get; set; }
        public long? ExperienceStarts { get; set; }
        public long? ExperienceEnds { get; set; }
        public long? SalaryStarts { get; set; }
        public long? SalaryEnds { get; set; }
        public List<JobAttachment> JobAttachments { get; set; }
        public bool IsArchived { get; set; }
        public bool IsPublished { get; set; }
        public string PostingDate { get; set; }
        public bool IsFavourite { get; set; }
        public Company Company { get; set; }    
        public long? CompanyId { get; set; }
        public Workflow Workflow { get; set; }
        public long WorkflowId { get; set; }
        public long? TotalCandidates { get; set; }
        public long? NewCandidates { get; set; }
        public long? ActiveCandidates { get; set; }
        public long? HiredCandidates { get; set; }
    }
}