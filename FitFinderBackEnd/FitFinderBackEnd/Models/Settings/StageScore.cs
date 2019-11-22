using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Settings
{
    public class StageScore : Stage
    {
        public long Rating { get; set; }
    }
}