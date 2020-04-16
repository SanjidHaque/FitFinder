using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class GeneralComment
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public JobAssignment JobAssignment { get; set; }
        public long? JobAssignmentId { get; set; }
    }
}