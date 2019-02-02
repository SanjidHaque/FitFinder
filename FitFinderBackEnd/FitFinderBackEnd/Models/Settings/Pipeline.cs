using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class Pipeline
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<PipelineStage> PipelineStage { get; set; }
    }
}