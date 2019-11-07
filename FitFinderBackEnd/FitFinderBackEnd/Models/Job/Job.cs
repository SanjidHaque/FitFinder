﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Job
{
    public class Job
    {
        public long Id { get; set; }
        public string JobTitle { get; set; }
        public string JobCode { get; set; }
        public string JobDescription { get; set; }
        public string JobImmediate { get; set; }
        public string JobIntermediate { get; set; }
        public string JobGoodToHave { get; set; }
        public string JobLocation { get; set; }
        public Department Department { get; set; }  
        public long? DepartmentId { get; set; }
        public JobFunction JobFunction { get; set; }
        public long? JobFunctionId { get; set; }
        public JobType JobType { get; set; }
        public long? JobTypeId { get; set; }
        public long? JobPositions { get; set; }
        public string JobClosingDate { get; set; }
        public long? JobExperienceStarts { get; set; }
        public long? JobExperienceEnds { get; set; }
        public long? JobSalaryStarts { get; set; }
        public long? JobSalaryEnds { get; set; }
        public List<JobAttachment> JobAttachment { get; set; }
        public bool IsArchived { get; set; }
        public bool IsPublished { get; set; }
        public string JobCreatedDate { get; set; }
        public bool IsFavourite { get; set; }
        public long CompanyId { get; set; }
        public Workflow Workflow { get; set; }
        public long? WorkflowId { get; set; }    
    }
}