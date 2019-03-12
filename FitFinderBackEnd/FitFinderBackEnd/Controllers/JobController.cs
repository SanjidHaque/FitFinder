using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Job;

namespace FitFinderBackEnd.Controllers
{
    
    public class JobController : ApiController
    {
        private readonly ApplicationDbContext _context;
        public JobController()
        {
            _context = new ApplicationDbContext();
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

        [HttpPut]
        [Route("api/ArchiveJobs")]
        public IHttpActionResult ArchiveJobs(List<Job> jobs)
        {
            foreach (var job in jobs)
            {
                Job getJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Id);
                if (getJob != null) getJob.IsArchived = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/RestoreJobs")]
        public IHttpActionResult RestoreJobs(List<Job> jobs)
        {
            foreach (var job in jobs)
            {
                Job getJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Id);
                if (getJob != null) getJob.IsArchived = false;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/FavouriteJobs")]
        public IHttpActionResult FavouriteJobs(List<Job> jobs)
        {
            foreach (var job in jobs)
            {
                Job getJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Id);
                if (getJob != null) getJob.IsFavourite = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/UnfavouriteJobs")]
        public IHttpActionResult UnfavouriteJobs(List<Job> jobs)
        {
            foreach (var job in jobs)
            {
                Job getJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Id);
                if (getJob != null) getJob.IsFavourite = false;
            }

            _context.SaveChanges();
            return Ok();
        }
    }
}
