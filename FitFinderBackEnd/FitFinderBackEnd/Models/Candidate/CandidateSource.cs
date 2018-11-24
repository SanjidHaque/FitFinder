﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Candidate
{
    public class CandidateSource
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
    }
}