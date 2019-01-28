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
using FitFinderBackEnd.Models.Settings;

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

        [HttpGet]
        [Route("api/GetAllJobType")]
        public IHttpActionResult GetAllJobType()
        {
            List<JobType> jobTypes = _context.JobTypes.ToList();
            return Ok(jobTypes);
        }

        [HttpGet]
        [Route("api/GetAllTag")]
        public IHttpActionResult GetAllTag()
        {
            List<Tag> tags = _context.Tags.ToList();
            return Ok(tags);
        }

        [HttpGet]
        [Route("api/GetAllSource")]
        public IHttpActionResult GetAllSource()
        {
            List<Source> sources = _context.Sources.ToList();
            return Ok(sources);
        }

        [HttpGet]
        [Route("api/GetAllJobFunction")]
        public IHttpActionResult GetAllJobFunction()
        {
            List<JobFunction> jobFunctions = _context.JobFunctions.ToList();
            return Ok(jobFunctions);
        }

        [HttpGet]
        [Route("api/GetAllDepartment")]
        public IHttpActionResult GetAllDepartment()
        {
            List<Department> departments = _context.Departments.ToList();
            return Ok(departments);
        }



        [HttpPost]
        [Route("api/AddNewDepartment")]
        public IHttpActionResult AddNewDepartment(Department department)
        {
            if (department == null)
            {
                return NotFound();
            }
            _context.Departments.Add(department);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("api/AddNewTag")]
        public IHttpActionResult AddNewTag(Tag tag)
        {
            if (tag == null)
            {
                return NotFound();
            }
            _context.Tags.Add(tag);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("api/AddNewSource")]
        public IHttpActionResult AddNewSource(Source source)
        {
            if (source == null)
            {
                return NotFound();
            }
            _context.Sources.Add(source);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("api/AddNewJobFunction")]
        public IHttpActionResult AddNewJobFunction(JobFunction jobFunction)
        {
            if (jobFunction == null)
            {
                return NotFound();
            }
            _context.JobFunctions.Add(jobFunction);
            _context.SaveChanges();
            return Ok();
        }


        [HttpPost]
        [Route("api/AddNewJobType")]
        public IHttpActionResult AddNewJobType(JobType jobType)
        {
            if (jobType == null)
            {
                return NotFound();
            }
            _context.JobTypes.Add(jobType);
            _context.SaveChanges();
            return Ok();
        }

    }


}

