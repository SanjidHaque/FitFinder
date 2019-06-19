using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Job;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class JobController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private ApplicationUserManager _userManager;

        public JobController()
        {
            _context = new ApplicationDbContext();
        }


        public JobController(ApplicationUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }



        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        [HttpPost]
        [Route("api/AddNewJob")]
        public IHttpActionResult AddNewJob(Job job)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || job == null)
            {
                return Ok();
            }

            job.CompanyId = applicationUser.CompanyId;

            _context.Jobs.Add(job);
//            foreach (var jobAttachment in job.JobAttachment)
//            {
//                jobAttachment.JobId = job.Id;
//            }
//            _context.JobAttachments.AddRange(job.JobAttachment);

            _context.SaveChanges();
            return Ok(job);
        }

        [HttpGet]
        [Route("api/GetAllJob")]
        [AllowAnonymous]
        public IHttpActionResult GetAllJob()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<Job>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<Job>());
            }


            List<Job> job = _context.Jobs
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .Include(e => e.JobAttachment).OrderBy(x => x.Id).ToList();
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
