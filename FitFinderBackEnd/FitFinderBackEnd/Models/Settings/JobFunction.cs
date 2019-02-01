using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class JobFunction
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}