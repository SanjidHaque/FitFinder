using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
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
        private SharedService _sharedService;

        public JobController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
            _sharedService = new SharedService();
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

            SharedService sharedService = new SharedService();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                sharedService.DeleteJobAttachment(job.JobAttachments);
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                sharedService.DeleteJobAttachment(job.JobAttachments);
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            job.CompanyId = applicationUser.CompanyId;
            _context.Jobs.Add(job);
            _context.SaveChanges();

            return Ok(new { job,  statusText = _statusTextService.Success });
        }


        [HttpPut]
        [Route("api/EditJob")]
        public IHttpActionResult EditJob(Job job)
        {
            Job getJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Id);
            if (getJob == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            getJob.DepartmentId = job.DepartmentId;
            getJob.Code = job.Code;
            getJob.Description = job.Description;
            getJob.ImmediateSkills = job.ImmediateSkills;
            getJob.IntermediateSkills = job.IntermediateSkills;
            getJob.GoodToHaveSkills = job.GoodToHaveSkills;
            getJob.JobFunctionId = job.JobFunctionId;
            getJob.Title = job.Title;
            getJob.JobTypeId = job.JobTypeId;
            getJob.Location = job.Location;
            getJob.ExperienceStarts = job.ExperienceStarts;
            getJob.ExperienceEnds = job.ExperienceEnds;
            getJob.SalaryStarts = job.SalaryStarts;
            getJob.SalaryEnds = job.SalaryEnds;
            getJob.ClosingDate = job.ClosingDate;
            getJob.Positions = job.Positions;
            getJob.WorkflowId = job.WorkflowId;

            _context.Entry(getJob).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetAllJob")]
        [AllowAnonymous]
        public IHttpActionResult GetAllJob()
        {
            List<Job> jobs = new List<Job>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { jobs, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { jobs, statusText = _statusTextService.UserClaimError });
            }


            jobs = _context.Jobs
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            jobs.ForEach(job =>
            {
                Department department = _context.Departments.FirstOrDefault(x => x.Id == job.DepartmentId);
                job.Department = department;
            });

            return Ok(new { jobs, statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetJob/{jobId}")]
        [AllowAnonymous]
        public IHttpActionResult GetJob(long jobId)
        {
            
            Job job = _context.Jobs.FirstOrDefault(x => x.Id == jobId);

            if (job == null)
            {
                return Ok(new { job, statusText = _statusTextService.ResourceNotFound});
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

            List<PipelineStageCriterion> pipelineStageCriteria = _context.PipelineStageCriteria
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



        [HttpGet]
        [Route("api/GetAllJobSpecificCandidate/{jobId}")]
        [AllowAnonymous]
        public IHttpActionResult GetAllJobSpecificCandidate(long jobId)
        {
            List<JobAssignment> jobAssignments = _context.JobAssignments
                .Where(x => x.JobId == jobId)
                .OrderByDescending(x => x.Id)
                .ToList();

            jobAssignments.ForEach(jobAssignment =>
            {
                Candidate candidate = _context.Candidates
                    .FirstOrDefault(x => x.Id == jobAssignment.CandidateId);

                if (candidate != null)
                {
                    Source source = _context.Sources
                        .FirstOrDefault(x => x.Id == candidate.SourceId);

                    jobAssignment.Candidate = candidate;
                }
            });

            return Ok(new { jobAssignments, statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/AddNewJobAttachment")]
        public IHttpActionResult AddNewJobAttachment(JobAttachment jobAttachment)
        {
            _context.JobAttachments.Add(jobAttachment);
            _context.SaveChanges();
            return Ok(new { jobAttachment.Id, statusText = _statusTextService.Success });
        }



        [HttpPut]
        [Route("api/ArchiveJobs")]
        public IHttpActionResult ArchiveJobs(List<Job> jobs)
        {
            foreach (var job in jobs)
            {
                Job getJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Id);
                if (getJob != null)
                {
                    getJob.IsArchived = true;
                }
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
                if (getJob != null)
                {
                    getJob.IsArchived = false;
                }
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
                if (getJob != null)
                {
                    getJob.IsFavourite = true;
                }
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
        [Route("api/DeleteJobAttachment/{jobAttachmentId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteJobAttachment(long jobAttachmentId)
        {

            JobAttachment jobAttachment = _context.JobAttachments.FirstOrDefault(x => x.Id == jobAttachmentId);
            if (jobAttachment == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            List<JobAttachment> jobAttachments = new List<JobAttachment> {jobAttachment};
            _sharedService.DeleteJobAttachment(jobAttachments);
            _context.JobAttachments.Remove(jobAttachment);
            
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


            bool hasRelation = (_context.JobAssignments.Any(o => o.JobId == jobId)
                                || _context.PipelineStageCriteria.Any(o => o.JobId == jobId));

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }


            List<JobAttachment> jobAttachments = _context.JobAttachments
                .Where(x => x.JobId == jobId)
                .AsNoTracking()
                .ToList();

            List<string> modifiedFileNames = new List<string>();

            jobAttachments.ForEach(jobAttachment =>
            {
                modifiedFileNames.Add(jobAttachment.ModifiedFileName);
            });

            _sharedService.OnDeleteAttachment(modifiedFileNames, "Attachment");

            _context.Jobs.Remove(job);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
            
        }


    }
}
