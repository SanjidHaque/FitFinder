﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class JobFunction
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
    }
}