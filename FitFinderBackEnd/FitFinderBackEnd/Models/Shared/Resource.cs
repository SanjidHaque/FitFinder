using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Models.Shared
{
    public class Resource 
    {
        public long Id { get; set; }
        public string Name { get; set; }        
        public Company Company { get; set; }
        public long? CompanyId { get; set; }
    }
}