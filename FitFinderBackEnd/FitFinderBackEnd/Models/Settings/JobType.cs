using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class JobType
    {
       
        public long Id { get; set; }
        public string Name { get; set; }
        public Company Company { get; set; }
        public long CompanyId { get; set; }
    }
}