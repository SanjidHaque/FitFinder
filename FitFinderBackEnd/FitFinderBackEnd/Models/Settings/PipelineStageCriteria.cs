using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class PipelineStageCriteria
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long PipelineStageId { get; set; }
    }
}