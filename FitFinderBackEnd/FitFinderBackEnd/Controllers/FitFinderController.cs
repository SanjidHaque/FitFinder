﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;

namespace FitFinderBackEnd.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FitFinderController : ApiController
    {
        private ApplicationDbContext _context;

        public FitFinderController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        [Route("api/AddNewCandidate")]
        public IHttpActionResult AddNewCandidate(Candidate candidate)
        {
            if (candidate == null)
            {
                return NotFound();
            }

            _context.CandidateAttachments.AddRange(candidate.CandidateAttachment);
            _context.CandidateEducations.AddRange(candidate.CandidateEducation);
            _context.CandidateExperiences.AddRange(candidate.CandidateExperience);
            _context.Candidates.Add(candidate);
            _context.SaveChanges();
            return Ok();
        }


        [HttpGet]
        [Route("api/Candidate")]
        public IHttpActionResult GetAllCandidate()
        {
            List<Candidate> candidate = _context.Candidates.
                Include(c => c.CandidateEducation).
                Include(d => d.CandidateExperience).
                Include(e => e.CandidateAttachment).ToList();
            return Ok(candidate);
        }

    }
}
