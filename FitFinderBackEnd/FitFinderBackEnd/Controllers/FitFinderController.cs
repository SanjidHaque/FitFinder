using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Interview;
using FitFinderBackEnd.Models.Job;

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

        [HttpPost]
        [Route("api/UploadAttachments")]
        public IHttpActionResult UploadAttachments()
        {              
            var httpRequest = HttpContext.Current.Request;          
            for (int i = 0; i<  httpRequest.Files.Count; i++)
            {
                var postedFile = httpRequest.Files[i];
                var filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + postedFile.FileName);
                postedFile.SaveAs(filePath);        
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllCandidate")]
        public IHttpActionResult GetAllCandidate()
        {
            List<Candidate> candidate = _context.Candidates.
                Include(c => c.CandidateEducation).
                Include(d => d.CandidateExperience).
                Include(e => e.CandidateAttachment).ToList();
            return Ok(candidate);
        }


        [HttpPost]
        [Route("api/AddNewInterview")]
        public IHttpActionResult AddNewInterview(Interview interview)
        {
            if (interview == null)
            {
                return NotFound();
            }

            _context.CandidatesForInterviews.AddRange(interview.CandidatesForInterview);
            _context.InterviewersForInterviews.AddRange(interview.InterviewersForInterview);
            _context.Interviews.Add(interview);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllInterview")]
        public IHttpActionResult GetAllInterview()
        {
            List<Interview> interview = _context.Interviews.
                Include(c => c.CandidatesForInterview).
                Include(d => d.InterviewersForInterview).ToList();
            return Ok(interview);
        }


        [HttpPost]
        [Route("api/AddNewJob")]
        public IHttpActionResult AddNewJob(Job job)
        {
            if (job == null)
            {
                return NotFound();
            }
            _context.JobAttachments.AddRange(job.JobAttachment);
            _context.Jobs.Add(job);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllJob")]
        public IHttpActionResult GetAllJob()
        {
            List<Job> job = _context.Jobs.
                Include(e => e.JobAttachment).ToList();
            return Ok(job);
        }
    }
}
