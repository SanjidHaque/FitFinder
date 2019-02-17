using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Job;

namespace FitFinderBackEnd.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
    }
}
