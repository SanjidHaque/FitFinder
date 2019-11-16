using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Job;
using FitFinderBackEnd.Models.Settings;
using FitFinderBackEnd.Services;
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
        private StatusTextService _statusTextService;

        public JobController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
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
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            job.CompanyId = applicationUser.CompanyId;

            _context.Jobs.Add(job);
//            foreach (var jobAttachment in job.JobAttachment)
//            {
//                jobAttachment.JobId = job.Id;
//            }
//            _context.JobAttachments.AddRange(job.JobAttachment);

            _context.SaveChanges();
            return Ok(new { job,  statusText = _statusTextService.Success });
        }


        [HttpPut]
        [Route("api/EditJob")]
        public IHttpActionResult EditJob(Job job)
        {
            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetAllJob")]
        [AllowAnonymous]
        public IHttpActionResult GetAllJob()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }


            List<Job> job = _context.Jobs
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            return Ok(new { job, statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetJob/{jobId}")]
        [AllowAnonymous]
        public IHttpActionResult GetJob(long jobId)
        {
            
            Job job = _context.Jobs.FirstOrDefault(x => x.Id == jobId);

            if (job == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound});
            }

            List<JobAttachment> jobAttachments = _context.JobAttachments
                .Where(x => x.JobId == jobId)
                .ToList();

            Workflow workflow = _context.Workflows.FirstOrDefault(x => x.Id == job.WorkflowId);

            if (workflow == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            List<Pipeline> pipelines = _context.Pipelines
                .Where(x => x.WorkflowId == workflow.Id)
                .ToList();

            List<PipelineStage> pipelineStages = _context.PipelineStages
                .Where(x => x.Pipeline.WorkflowId == workflow.Id)
                .ToList();

            List<PipelineStageCriteria> pipelineStageCriterias = _context.PipelineStageCriterias
                .Where(x => x.PipelineStage.Pipeline.WorkflowId == workflow.Id 
                            && (x.JobId == job.Id || x.JobId == null))
                .ToList();


            Department department = _context.Departments
                .FirstOrDefault(x => x.Id == job.DepartmentId);

            JobFunction jobFunction = _context.JobFunctions
                .FirstOrDefault(x => x.Id == job.JobFunctionId);

            JobType jobType = _context.JobTypes
                .FirstOrDefault(x => x.Id == job.JobTypeId);

            return Ok(new {job, statusText = _statusTextService.Success });
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
            return Ok(new { statusText = _statusTextService.Success });
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
            return Ok(new { statusText = _statusTextService.Success });
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
             return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/UnfavouriteJobs")]
        public IHttpActionResult UnfavouriteJobs(List<Job> jobs)
        {
            foreach (var job in jobs)
            {
                Job getJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Id);
                if (getJob != null)
                {
                    getJob.IsFavourite = false;
                }
            }

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpDelete]
        [Route("api/DeleteJob/{jobId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteJob(long jobId)
        {
            Job job = _context.Jobs.FirstOrDefault(x => x.Id == jobId);

            if (job == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            try
            {
                _context.Jobs.Remove(job);
                _context.SaveChanges();

                return Ok(new { statusText = _statusTextService.Success });
            }
            catch (DbUpdateException)
            {
                return Ok(new { statusText = _statusTextService.ReportingPurposeIssue });
            }
        }


    }
}
