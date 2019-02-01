using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

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
        public long DepartmentId { get; set; }
        public long JobFunctionalityId { get; set; }
        public long EmploymentTypeId { get; set; }
        public string JobPositions { get; set; }
        public string JobClosingDate { get; set; }
        public string JobExperienceStarts { get; set; }
        public string JobExperienceEnds { get; set; }
        public string JobSalaryStarts { get; set; }
        public string JobSalaryEnds { get; set; }
        public List<JobAttachment> JobAttachment { get; set; }
    }
}