﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class PipelineStage
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public long PipelineId { get; set; }
        public List<PipelineStageCriteria> PipelineStageCriteria { get; set; }
    }
}