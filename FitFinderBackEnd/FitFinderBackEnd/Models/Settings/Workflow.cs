using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Shared;

namespace FitFinderBackEnd.Models.Settings
{
    public class Workflow : Resource
    {
        public List<Pipeline> Pipelines { get; set; }
    }
}