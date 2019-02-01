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
            _context.Candidates.Add(candidate);

            foreach (var candidateEducation in candidate.CandidateEducation)
            {
                candidateEducation.Id = candidate.Id;
            }
            foreach (var candidateExperience in candidate.CandidateExperience)
            {
                candidateExperience.Id = candidate.Id;
            }

            foreach (var candidateAttachment in candidate.CandidateAttachment)
            {
                candidateAttachment.Id = candidate.Id;
            }


            _context.CandidateAttachments.AddRange(candidate.CandidateAttachment);
            _context.CandidateEducations.AddRange(candidate.CandidateEducation);
            _context.CandidateExperiences.AddRange(candidate.CandidateExperience);
            
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
                Include(e => e.CandidateAttachment).OrderBy(x => x.Id).ToList();
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
            _context.Interviews.Add(interview);
            
            foreach (var candidatesForInterview in interview.CandidatesForInterview)
            {
                candidatesForInterview.Id = interview.Id;
            }

            foreach (var interviewersForInterview in interview.InterviewersForInterview)
            {
                interviewersForInterview.Id = interview.Id;
            }

            _context.CandidatesForInterviews.AddRange(interview.CandidatesForInterview);
            _context.InterviewersForInterviews.AddRange(interview.InterviewersForInterview);
           
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllInterview")]
        public IHttpActionResult GetAllInterview()
        {
            List<Interview> interview = _context.Interviews.
                Include(c => c.CandidatesForInterview).
                Include(d => d.InterviewersForInterview).OrderBy(x => x.Id).ToList();
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

            _context.Jobs.Add(job);
            foreach (var jobAttachment in job.JobAttachment)
            {
                jobAttachment.JobId = job.Id;
            }
            _context.JobAttachments.AddRange(job.JobAttachment);
           
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllJob")]
        public IHttpActionResult GetAllJob()
        {
            List<Job> job = _context.Jobs.
                Include(e => e.JobAttachment).OrderBy(x => x.Id).ToList();
            return Ok(job);
        }

        [HttpGet]
        [Route("api/GetAllJobType")]
        public IHttpActionResult GetAllJobType()
        {
            List<JobType> jobTypes = _context.JobTypes.OrderBy(x => x.Id).ToList();
            return Ok(jobTypes);
        }

        

        [HttpGet]
        [Route("api/GetAllSource")]
        public IHttpActionResult GetAllSource()
        {
            List<Source> sources = _context.Sources.OrderBy(x => x.Id).ToList();
            return Ok(sources);
        }

        [HttpGet]
        [Route("api/GetAllJobFunction")]
        public IHttpActionResult GetAllJobFunction()
        {
            List<JobFunction> jobFunctions = _context.JobFunctions.OrderBy(x => x.Id).ToList();
            return Ok(jobFunctions);
        }

        [HttpGet]
        [Route("api/GetAllDepartment")]
        public IHttpActionResult GetAllDepartment()
        {
            List<Department> departments = _context.Departments.OrderBy(x => x.Id).ToList();
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

        [HttpPut]
        [Route("api/EditJobType")]
        public IHttpActionResult EditJobType(JobType jobType)
        {
            if (jobType == null)
            {
                return NotFound();
            }

            JobType getJobType = _context.JobTypes.FirstOrDefault(x => x.Id == jobType.Id);

            if (getJobType == null)
            {
                return NotFound();
            }
            getJobType.Name = jobType.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditJobFunction")]
        public IHttpActionResult EditJobFunction(JobFunction jobFunction)
        {
            if (jobFunction == null)
            {
                return NotFound();
            }

            JobFunction getJobFunction = _context.JobFunctions.FirstOrDefault(x => x.Id == jobFunction.Id);

            if (getJobFunction == null)
            {
                return NotFound();
            }
            getJobFunction.Name = jobFunction.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditDepartment")]
        public IHttpActionResult EditDepartment(Department department)
        {
            if (department == null)
            {
                return NotFound();
            }

            Department getDepartment = _context.Departments.FirstOrDefault(x => x.Id == department.Id);

            if (getDepartment == null)
            {
                return NotFound();
            }

            getDepartment.Name = department.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditSource")]
        public IHttpActionResult EditSource(Source source)
        {
            if (source == null)
            {
                return NotFound();
            }

            Source getSource = _context.Sources.FirstOrDefault(x => x.Id == source.Id);

            if (getSource == null)
            {
                return NotFound();
            }
            getSource.Name = source.Name;
            _context.SaveChanges();

            return Ok();
        }

    }


}

