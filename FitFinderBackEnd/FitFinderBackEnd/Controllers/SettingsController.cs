using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Settings;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class SettingsController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private ApplicationUserManager _userManager;

        public SettingsController()
        {
            _context = new ApplicationDbContext();
        }

        public SettingsController(ApplicationUserManager userManager,
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
        [HttpGet]
        [Route("api/GetAllJobType")]
        public IHttpActionResult GetAllJobType()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<JobType>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<JobType>());
            }

            List<JobType> jobTypes = _context.JobTypes
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderBy(x => x.Id)
                .ToList();
            return Ok(jobTypes);
        }



        [HttpGet]
        [Route("api/GetAllSource")]
        public IHttpActionResult GetAllSource()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<Source>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<Source>());
            }

            List<Source> sources = _context.Sources
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderBy(x => x.Id).ToList();
            return Ok(sources);
        }

        [HttpGet]
        [Route("api/GetAllJobFunction")]
        public IHttpActionResult GetAllJobFunction()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<JobFunction>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<JobFunction>());
            }

            List<JobFunction> jobFunctions = _context.JobFunctions
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderBy(x => x.Id).ToList();
            return Ok(jobFunctions);
        }

        [HttpGet]
        [Route("api/GetAllDepartment")]
        public IHttpActionResult GetAllDepartment()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<Department>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<Department>());
            }

            List<Department> departments = _context.Departments
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderBy(x => x.Id).ToList();
            return Ok(departments);
        }




        [HttpPost]
        [Route("api/AddNewDepartment")]
        public IHttpActionResult AddNewDepartment(Department department)
        {

            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || department == null)
            {
                return Ok();
            }

            department.CompanyId = applicationUser.CompanyId;
            _context.Departments.Add(department);
            _context.SaveChanges();
            return Ok(department);
        }



        [HttpPost]
        [Route("api/AddNewSource")]
        public IHttpActionResult AddNewSource(Source source)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || source == null)
            {
                return Ok();
            }

            source.CompanyId = applicationUser.CompanyId;
            _context.Sources.Add(source);
            _context.SaveChanges();
            return Ok(source);
        }

        [HttpPost]
        [Route("api/AddNewJobFunction")]
        public IHttpActionResult AddNewJobFunction(JobFunction jobFunction)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || jobFunction == null)
            {
                return Ok();
            }

            jobFunction.CompanyId = applicationUser.CompanyId;
            _context.JobFunctions.Add(jobFunction);
            _context.SaveChanges();
            return Ok(jobFunction);
        }


        [HttpPost]
        [Route("api/AddNewJobType")]
        public IHttpActionResult AddNewJobType(JobType jobType)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || jobType == null)
            {
                return Ok();
            }

            jobType.CompanyId = applicationUser.CompanyId;
            _context.JobTypes.Add(jobType);
            _context.SaveChanges();
            return Ok(jobType);
        }

        [HttpPut]
        [Route("api/EditJobType")]
        public IHttpActionResult EditJobType(JobType jobType)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || jobType == null)
            {
                return Ok();
            }


            JobType getJobType = _context.JobTypes.FirstOrDefault(x => x.Id == jobType.Id && x.CompanyId == applicationUser.CompanyId);

            if (getJobType == null)
            {
                return Ok();
            }
            getJobType.Name = jobType.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditJobFunction")]
        public IHttpActionResult EditJobFunction(JobFunction jobFunction)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || jobFunction == null)
            {
                return Ok();
            }


            JobFunction getJobFunction = _context.JobFunctions.FirstOrDefault(x => x.Id == jobFunction.Id && x.CompanyId == applicationUser.CompanyId);

            if (getJobFunction == null)
            {
                return Ok();
            }
            getJobFunction.Name = jobFunction.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditDepartment")]
        public IHttpActionResult EditDepartment(Department department)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || department == null)
            {
                return Ok();
            }


            Department getDepartment = _context.Departments.FirstOrDefault(x => x.Id == department.Id && x.CompanyId == applicationUser.CompanyId);

            if (getDepartment == null)
            {
                return Ok();
            }
            getDepartment.Name = department.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditSource")]
        public IHttpActionResult EditSource(Source source)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || source == null)
            {
                return Ok();
            }


            Source getSource = _context.Sources.FirstOrDefault(x => x.Id == source.Id && x.CompanyId == applicationUser.CompanyId);

            if (getSource == null)
            {
                return Ok();
            }
            getSource.Name = source.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Route("api/AddNewRejectedReason")]
        public IHttpActionResult AddNewRejectedReason(RejectedReason rejectedReason)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || rejectedReason == null)
            {
                return Ok();
            }

            rejectedReason.CompanyId = applicationUser.CompanyId;
            _context.RejectedReasons.Add(rejectedReason);
            _context.SaveChanges();
            return Ok(rejectedReason);
        }

        [HttpPost]
        [Route("api/AddNewWithdrawnReason")]
        public IHttpActionResult AddNewWithdrawnReason(WithdrawnReason withdrawnReason)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || withdrawnReason == null)
            {
                return Ok();
            }

            withdrawnReason.CompanyId = applicationUser.CompanyId;
            _context.WithdrawnReasons.Add(withdrawnReason);
            _context.SaveChanges();
            return Ok(withdrawnReason);
        }

        [HttpGet]
        [Route("api/GetAllRejectedReason")]
        public IHttpActionResult GetAllRejectedReason()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<RejectedReason>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<RejectedReason>());
            }

            List<RejectedReason> rejectedReasons = _context.RejectedReasons
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderBy(x => x.Id).ToList();
            return Ok(rejectedReasons);
        }

        [HttpGet]
        [Route("api/GetAllWithdrawnReason")]
        public IHttpActionResult GetAllWithdrawnReason()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<WithdrawnReason>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<WithdrawnReason>());
            }

            List<WithdrawnReason> withdrawnReasons = _context.WithdrawnReasons
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderBy(x => x.Id).ToList();
            return Ok(withdrawnReasons);
        }


        [HttpPut]
        [Route("api/EditRejectedReason")]
        public IHttpActionResult EditRejectedReason(RejectedReason rejectedReason)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || rejectedReason == null)
            {
                return Ok();
            }


            RejectedReason getRejectedReason = _context.RejectedReasons.FirstOrDefault(x => x.Id == rejectedReason.Id && x.CompanyId == applicationUser.CompanyId);

            if (getRejectedReason == null)
            {
                return Ok();
            }

            getRejectedReason.Name = rejectedReason.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditWithdrawnReason")]
        public IHttpActionResult EditWithdrawnReason(WithdrawnReason withdrawnReason)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || withdrawnReason == null)
            {
                return Ok();
            }


            WithdrawnReason getWithdrawnReason = _context.WithdrawnReasons
                .FirstOrDefault(x => x.Id == withdrawnReason.Id 
                                  && x.CompanyId == applicationUser.CompanyId);

            if (getWithdrawnReason == null)
            {
                return Ok();
            }

            withdrawnReason.Name = withdrawnReason.Name;
            _context.SaveChanges();

            return Ok();
        }


        [HttpPost]
        [Route("api/AddNewWorkflow")]
        public IHttpActionResult AddNewWorkflow(Workflow workflow)
        {

            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok();
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok();
            }


            workflow.CompanyId = applicationUser.CompanyId;

            _context.Workflows.Add(workflow);

          

            _context.SaveChanges();
            return Ok();
        }


        [HttpPost]
        [Route("api/AddNewPipeline")]
        public IHttpActionResult AddNewPipeline(Pipeline pipeline)
        {
            _context.Pipelines.Add(pipeline);

            foreach (var pipelineStage in pipeline.PipelineStage)
            {
                pipelineStage.PipelineId = pipeline.Id;
            }

            _context.PipelineStages.AddRange(pipeline.PipelineStage);

            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllWorkflow")]
        public IHttpActionResult GetAllWorkflow()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<Workflow>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<Workflow>());
            }

            List<Workflow> workflows = _context.Workflows
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            List<Pipeline> pipelines = _context.Pipelines
                .Include(x => x.Workflow)
                .ToList();


            List<PipelineStage> pipelineStages = _context.PipelineStages
                .Include(x => x.Pipeline)
                .ToList();

            List<PipelineStageCriteria> pipelineStageCriterias = _context.PipelineStageCriterias
                .Include(x => x.PipelineStage)
                .ToList();

            return Ok(workflows);
        }


        [HttpGet]
        [Route("api/GetDefaultWorkflow")]
        [AllowAnonymous]
        public IHttpActionResult GetDefaultWorkflow()
        {
           

            Workflow workflow = _context.Workflows
                .FirstOrDefault(x => x.CompanyId == null);

            List<Pipeline> pipelines = _context.Pipelines
                .Where(x => x.WorkflowId == workflow.Id)
                .ToList();


            List<PipelineStage> pipelineStages = _context.PipelineStages
                .Where(x => x.Pipeline.WorkflowId == workflow.Id)
                .ToList();

            List<PipelineStageCriteria> pipelineStageCriterias = _context.PipelineStageCriterias
                .Where(x => x.PipelineStage.Pipeline.WorkflowId == workflow.Id)
                .ToList();

            return Ok(workflow);
        }


        [HttpGet]
        [Route("api/GetWorkflow/{workflowId}")]
        [AllowAnonymous]
        public IHttpActionResult GetDefaultWorkflow(long workflowId)
        {


            Workflow workflow = _context.Workflows
                .FirstOrDefault(x => x.Id == workflowId);

            List<Pipeline> pipelines = _context.Pipelines
                .Where(x => x.WorkflowId == workflowId)
                .ToList();


            List<PipelineStage> pipelineStages = _context.PipelineStages
                .Where(x => x.Pipeline.WorkflowId == workflowId)
                .ToList();

            List<PipelineStageCriteria> pipelineStageCriterias = _context.PipelineStageCriterias
                .Where(x => x.PipelineStage.Pipeline.WorkflowId == workflowId)
                .ToList();

            return Ok(workflow);
        }



        [HttpPost]
        [Route("api/AddNewPipelineStage")]
        public IHttpActionResult AddNewPipelineStage(PipelineStage pipelineStage)
        {
            if (pipelineStage == null)
            {
                return NotFound();
            }

            _context.PipelineStages.Add(pipelineStage);
            _context.SaveChanges();
            return Ok(pipelineStage);
        }

        [HttpPost]
        [Route("api/AddNewPipelineStageCriteria")]
        public IHttpActionResult AddNewPipelineStageCriteria(PipelineStageCriteria pipelineStageCriteria)
        {
            if (pipelineStageCriteria == null)
            {
                return NotFound();
            }

            _context.PipelineStageCriterias.Add(pipelineStageCriteria);
            _context.SaveChanges();
            return Ok(pipelineStageCriteria);
        }

        [HttpPut]
        [Route("api/EditPipelineStageCriteria")]
        public IHttpActionResult EditPipelineStageCriteria(PipelineStageCriteria pipelineStageCriteria)
        {
            if (pipelineStageCriteria == null)
            {
                return NotFound();
            }

            PipelineStageCriteria getPipelineStageCriteria = _context.PipelineStageCriterias.FirstOrDefault(x => x.Id == pipelineStageCriteria.Id);

            if (getPipelineStageCriteria == null)
            {
                return NotFound();
            }

            getPipelineStageCriteria.Name = pipelineStageCriteria.Name;

            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditPipelineStage")]
        public IHttpActionResult EditPipelineStage(PipelineStage pipelineStage)
        {
            if (pipelineStage == null)
            {
                return NotFound();
            }

            PipelineStage getPipelineStage = _context.PipelineStages.FirstOrDefault(x => x.Id == pipelineStage.Id);

            if (getPipelineStage == null)
            {
                return NotFound();
            }
            getPipelineStage.Name = pipelineStage.Name;
            getPipelineStage.Color = pipelineStage.Color;

            _context.SaveChanges();


            return Ok();
        }
    }
}
