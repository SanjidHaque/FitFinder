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
        public Candidate Candidate { get; set; }
        public long? CandidateId { get; set; }
    }
}