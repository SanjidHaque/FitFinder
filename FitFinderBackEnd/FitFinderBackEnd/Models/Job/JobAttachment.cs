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
        public long Id { get; set; }
        public long JobId { get; set; }
        public string FileName { get; set; }
        public string ModifiedFileName { get; set; }
    }
}