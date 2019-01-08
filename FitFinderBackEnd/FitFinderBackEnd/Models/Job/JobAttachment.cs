using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Job
{
    public class JobAttachment
    {
        [Key]
        public string Id { get; set; }
        public Job Job { get; set; }
        public string JobId { get; set; }
        public string FileName { get; set; }
        public string ModifiedFileName { get; set; }
    }
}