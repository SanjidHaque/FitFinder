using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class Workflow
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Company Company { get; set; }
        public long? CompanyId { get; set; }
        public List<Pipeline> Pipelines { get; set; }
    }
}