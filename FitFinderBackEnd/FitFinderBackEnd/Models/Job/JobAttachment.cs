using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Job
{
    public class JobAttachment : Attachment
    {
        public Job Job { get; set; }
        public long JobId { get; set; } 
    }
}