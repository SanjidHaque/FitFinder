using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Settings;
using FitFinderBackEnd.Services;
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
        private StatusTextService _statusTextService;

        public SettingsController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
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
            List<JobType> jobTypes = new List<JobType>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { jobTypes, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { jobTypes, statusText = _statusTextService.UserClaimError });
            }

            jobTypes = _context.JobTypes
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            return Ok(new { jobTypes, statusText = _statusTextService.Success });
        }



        [HttpGet]
        [Route("api/GetAllSource")]
        public IHttpActionResult GetAllSource()
        {
            List<Source> sources = new List<Source>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { sources, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { sources, statusText = _statusTextService.UserClaimError });
            }

            sources = _context.Sources
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            return Ok(new { sources, statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetAllJobFunction")]
        public IHttpActionResult GetAllJobFunction()
        {
            List<JobFunction> jobFunctions = new List<JobFunction>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { jobFunctions, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { jobFunctions, statusText = _statusTextService.UserClaimError });
            }

            jobFunctions = _context.JobFunctions
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            return Ok(new { jobFunctions  , statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetAllDepartment")]
        public IHttpActionResult GetAllDepartment()
        {

            List<Department> departments = new List<Department>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { departments, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { departments, statusText = _statusTextService.UserClaimError });
            }

           departments = _context.Departments
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            return Ok(new { departments, statusText = _statusTextService.Success });
        }




        [HttpPost]
        [Route("api/AddNewDepartment")]
        public IHttpActionResult AddNewDepartment(Department department)
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

            department.CompanyId = applicationUser.CompanyId;
            _context.Departments.Add(department);
            _context.SaveChanges();

            return Ok(new { department, statusText = _statusTextService.Success });
        }



        [HttpPost]
        [Route("api/AddNewSource")]
        public IHttpActionResult AddNewSource(Source source)
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

            source.CompanyId = applicationUser.CompanyId;
            _context.Sources.Add(source);
            _context.SaveChanges();

            return Ok(new { source, statusText = _statusTextService.Success });
        }


        [HttpPost]
        [Route("api/AddNewJobFunction")]
        public IHttpActionResult AddNewJobFunction(JobFunction jobFunction)
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

            jobFunction.CompanyId = applicationUser.CompanyId;
            _context.JobFunctions.Add(jobFunction);
            _context.SaveChanges();

            return Ok(new { jobFunction, statusText = _statusTextService.Success });
        }


        [HttpPost]
        [Route("api/AddNewJobType")]
        public IHttpActionResult AddNewJobType(JobType jobType)
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

            jobType.CompanyId = applicationUser.CompanyId;
            _context.JobTypes.Add(jobType);
            _context.SaveChanges();

            return Ok(new { jobType, statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditJobType")]
        public IHttpActionResult EditJobType(JobType jobType)
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


            JobType getJobType = _context.JobTypes.FirstOrDefault(x => x.Id == jobType.Id);

            if (getJobType == null)
            {
                return Ok(new {statusText = _statusTextService.ResourceNotFound });
            }

            getJobType.Name = jobType.Name;
            _context.Entry(getJobType).State = EntityState.Modified;
            _context.SaveChanges();
        
            return Ok(new {statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditJobFunction")]
        public IHttpActionResult EditJobFunction(JobFunction jobFunction)
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


            JobFunction getJobFunction = _context.JobFunctions
                .FirstOrDefault(x => x.Id == jobFunction.Id);

            if (getJobFunction == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getJobFunction.Name = jobFunction.Name;
            _context.Entry(getJobFunction).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditDepartment")]
        public IHttpActionResult EditDepartment(Department department)
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


            Department getDepartment = _context.Departments.FirstOrDefault(x => x.Id == department.Id);

            if (getDepartment == null)
            {
                return Ok(new {statusText = _statusTextService.ResourceNotFound });
            }
            getDepartment.Name = department.Name;
            _context.Entry(getDepartment).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditSource")]
        public IHttpActionResult EditSource(Source source)
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


            Source getSource = _context.Sources.FirstOrDefault(x => x.Id == source.Id);

            if (getSource == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getSource.Name = source.Name;
            _context.Entry(getSource).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new {statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/AddNewRejectedReason")]
        public IHttpActionResult AddNewRejectedReason(RejectedReason rejectedReason)
        {
            //if (_context.FoodItems.Any(o => o.Name == foodItem.Name && o.Name != foodItem.Name))
            //{
            //    return Ok(new { StatusText = _statusTextService.DuplicateItemName });
            //}

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

            if (_context.RejectedReasons.Any(o => o.Name == rejectedReason.Name))
            {
                return Ok(new { statusText = _statusTextService.DuplicateResourceFound });
            }

            rejectedReason.CompanyId = applicationUser.CompanyId;
            _context.RejectedReasons.Add(rejectedReason);
            _context.SaveChanges();

            return Ok(new { rejectedReason, statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/AddNewWithdrawnReason")]
        public IHttpActionResult AddNewWithdrawnReason(WithdrawnReason withdrawnReason)
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

            if (_context.WithdrawnReasons.Any(o => o.Name == withdrawnReason.Name))
            {
                return Ok(new { statusText = _statusTextService.DuplicateResourceFound });
            }

            withdrawnReason.CompanyId = applicationUser.CompanyId;
            _context.WithdrawnReasons.Add(withdrawnReason);
            _context.SaveChanges();

            return Ok(new { withdrawnReason, statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetAllRejectedReason")]
        public IHttpActionResult GetAllRejectedReason()
        {
            List<RejectedReason> rejectedReasons = new List<RejectedReason>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { rejectedReasons, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { rejectedReasons, statusText = _statusTextService.UserClaimError });
            }

            rejectedReasons = _context.RejectedReasons
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            return Ok(new { rejectedReasons, statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetAllWithdrawnReason")]
        public IHttpActionResult GetAllWithdrawnReason()
        {
            List<WithdrawnReason> withdrawnReasons = new List<WithdrawnReason>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { withdrawnReasons, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { withdrawnReasons, statusText = _statusTextService.UserClaimError });
            }

            withdrawnReasons = _context.WithdrawnReasons
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            return Ok(new { withdrawnReasons, statusText = _statusTextService.Success });
        }


        [HttpPut]
        [Route("api/EditRejectedReason")]
        public IHttpActionResult EditRejectedReason(RejectedReason rejectedReason)
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


            RejectedReason getRejectedReason = _context.RejectedReasons
                .FirstOrDefault(x => x.Id == rejectedReason.Id);

            if (getRejectedReason == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            if (_context.RejectedReasons.Any(o => o.Name == rejectedReason.Name 
                                                  && o.Name != getRejectedReason.Name))
            {
                return Ok(new { StatusText = _statusTextService.DuplicateResourceFound });
            }

            getRejectedReason.Name = rejectedReason.Name;
            _context.Entry(getRejectedReason).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditWithdrawnReason")]
        public IHttpActionResult EditWithdrawnReason(WithdrawnReason withdrawnReason)
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


            WithdrawnReason getWithdrawnReason = _context.WithdrawnReasons
                .FirstOrDefault(x => x.Id == withdrawnReason.Id);

            if (getWithdrawnReason == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            if (_context.WithdrawnReasons.Any(o => o.Name == withdrawnReason.Name
                                                   && o.Name != withdrawnReason.Name))
            {
                return Ok(new { StatusText = _statusTextService.DuplicateResourceFound });
            }

            withdrawnReason.Name = withdrawnReason.Name;
            _context.Entry(getWithdrawnReason).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpPost]
        [Route("api/AddNewWorkflow")]
        public IHttpActionResult AddNewWorkflow(Workflow workflow)
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


            workflow.CompanyId = applicationUser.CompanyId;

            _context.Workflows.Add(workflow);

        

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });

        }


        [HttpPost]
        [Route("api/AddNewPipeline")]
        public IHttpActionResult AddNewPipeline(Pipeline pipeline)
        {
            _context.Pipelines.Add(pipeline);

            //foreach (var pipelineStage in pipeline.PipelineStages)
            //{
            //    pipelineStage.PipelineId = pipeline.Id;
            //}

            //_context.PipelineStages.AddRange(pipeline.PipelineStages);

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });

        }

        [HttpGet]
        [Route("api/GetAllWorkflow")]
        public IHttpActionResult GetAllWorkflow()
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

            List<Workflow> workflows = _context.Workflows
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .ToList();

            List<Pipeline> pipelines = _context.Pipelines
                .Include(x => x.Workflow)
                .ToList();


            List<PipelineStage> pipelineStages = _context.PipelineStages
                .Include(x => x.Pipeline)
                .ToList();

            List<PipelineStageCriterion> pipelineStageCriteria = _context.PipelineStageCriteria
                .Include(x => x.PipelineStage)
                .ToList();

            return Ok(new { workflows, statusText = _statusTextService.Success });
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

            List<PipelineStageCriterion> pipelineStageCriteria = _context.PipelineStageCriteria
                .Where(x => x.PipelineStage.Pipeline.WorkflowId == workflow.Id)
                .ToList();


            return Ok(new { workflow, statusText = _statusTextService.Success });
        }


        [HttpGet]
        [Route("api/GetWorkflow/{workflowId}")]
        [AllowAnonymous]
        public IHttpActionResult GetWorkflow(long workflowId)
        {
            Workflow workflow = _context.Workflows
                .FirstOrDefault(x => x.Id == workflowId);

            if (workflow == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            List<Pipeline> pipelines = _context.Pipelines
                .Where(x => x.WorkflowId == workflowId)
                .ToList();


            List<PipelineStage> pipelineStages = _context.PipelineStages
                .Where(x => x.Pipeline.WorkflowId == workflowId)
                .ToList();

            List<PipelineStageCriterion> pipelineStageCriteria = _context.PipelineStageCriteria
                .Where(x => x.PipelineStage.Pipeline.WorkflowId == workflowId && x.JobId == null)
                .ToList();

           
            return Ok(new { workflow, statusText = _statusTextService.Success });
        }



        [HttpPost]
        [Route("api/AddNewPipelineStage")]
        public IHttpActionResult AddNewPipelineStage(PipelineStage pipelineStage)
        {
            _context.PipelineStages.Add(pipelineStage);
            _context.SaveChanges();

            return Ok(new { pipelineStage , statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/AddNewPipelineStageCriterion")]
        public IHttpActionResult AddNewPipelineStageCriterion(PipelineStageCriterion pipelineStageCriterion)
        {
            _context.PipelineStageCriteria.Add(pipelineStageCriterion);
            _context.SaveChanges();

            return Ok(new { pipelineStageCriterion, statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditPipelineStageCriterion")]
        public IHttpActionResult EditPipelineStageCriterion(PipelineStageCriterion pipelineStageCriterion)
        {

            PipelineStageCriterion getPipelineStageCriterion = _context.PipelineStageCriteria.FirstOrDefault(x => x.Id == pipelineStageCriterion.Id);

            if (getPipelineStageCriterion == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getPipelineStageCriterion.Name = pipelineStageCriterion.Name;
            _context.Entry(getPipelineStageCriterion).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditPipelineStage")]
        public IHttpActionResult EditPipelineStage(PipelineStage pipelineStage)
        {
            PipelineStage getPipelineStage = _context.PipelineStages.FirstOrDefault(x => x.Id == pipelineStage.Id);

            if (getPipelineStage == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getPipelineStage.Name = pipelineStage.Name;
            getPipelineStage.Color = pipelineStage.Color;
            _context.Entry(getPipelineStage).State = EntityState.Modified;

            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/EditWorkflowName")]
        public IHttpActionResult EditWorkflowName(Workflow workflow)
        {
           
            Workflow getWorkflow = _context.Workflows.FirstOrDefault(x => x.Id == workflow.Id);

            if (getWorkflow == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getWorkflow.Name = workflow.Name;

            _context.Entry(getWorkflow).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok( new { statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/AddNewPipelineStageCriterionForNewJob")]
        public IHttpActionResult AddNewPipelineStageCriterionForNewJob(List<PipelineStageCriterion> pipelineStageCriteria)
        {
            _context.PipelineStageCriteria.AddRange(pipelineStageCriteria);
            _context.SaveChanges();
            return Ok( new { statusText = _statusTextService.Success });
        }




        [HttpDelete]
        [Route("api/DeleteDepartment/{departmentId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteDepartment(long departmentId)
        {
            Department department = _context.Departments.FirstOrDefault(x => x.Id == departmentId);

            if (department == null)
            {
                return Ok(new {statusText = _statusTextService.ResourceNotFound});
            }

            bool hasRelation = (_context.Jobs.Any(o => o.DepartmentId == departmentId)
                                && _context.Users.Any(o => o.DepartmentId == departmentId));

            if (hasRelation)
            {
                return Ok(new {StatusText = _statusTextService.ReportingPurposeIssue});
            }


            _context.Departments.Remove(department);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });


        }

        [HttpDelete]
        [Route("api/DeleteSource/{sourceId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteSource(long sourceId)
        {
            Source source = _context.Sources.FirstOrDefault(x => x.Id == sourceId);

            if (source == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            bool hasRelation = _context.Candidates.Any(o => o.SourceId == sourceId);

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }


            _context.Sources.Remove(source);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }


        [HttpDelete]
        [Route("api/DeleteJobFunction/{jobfunctonId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteJobFunction(long jobfunctonId)
        {
            JobFunction jobFunction = _context.JobFunctions.FirstOrDefault(x => x.Id == jobfunctonId);

            if (jobFunction == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            bool hasRelation = _context.Jobs.Any(o => o.JobFunctionId == jobfunctonId);

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }



            _context.JobFunctions.Remove(jobFunction);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }

        [HttpDelete]
        [Route("api/DeleteJobType/{jobTypeId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteJobType(long jobTypeId)
        {
            JobType jobType = _context.JobTypes.FirstOrDefault(x => x.Id == jobTypeId);

            if (jobType == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            bool hasRelation = _context.Jobs.Any(o => o.JobTypeId == jobTypeId);

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }

            _context.JobTypes.Remove(jobType);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }

        [HttpDelete]
        [Route("api/DeleteRejectedReason/{rejectedReasonId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteRejectedReason(long rejectedReasonId)
        {
            RejectedReason rejectedReason = _context.RejectedReasons.FirstOrDefault(x => x.Id == rejectedReasonId);

            if (rejectedReason == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            bool hasRelation = false;

            if (hasRelation)
            {
                return Ok(new { statusText = _statusTextService.ReportingPurposeIssue });
            }


            _context.RejectedReasons.Remove(rejectedReason);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }



        [HttpDelete]
        [Route("api/DeleteWithdrawnReason/{withdrawnReasonId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteWithdrawnReason(long withdrawnReasonId)
        {
            WithdrawnReason withdrawnReason = _context.WithdrawnReasons.FirstOrDefault(x => x.Id == withdrawnReasonId);

            if (withdrawnReason == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            bool hasRelation = false;

            if (hasRelation)
            {
                return Ok(new { statusText = _statusTextService.ReportingPurposeIssue });
            }


            _context.WithdrawnReasons.Remove(withdrawnReason);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }

        [HttpDelete]
        [Route("api/DeleteWorkflow/{workflowId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteWorkflow(long workflowId)
        {
            Workflow workflow = _context.Workflows.FirstOrDefault(x => x.Id == workflowId);

            if (workflow == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            bool hasRelation = _context.Jobs.Any(o => o.WorkflowId == workflowId);

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }


            _context.Workflows.Remove(workflow);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }



        [HttpDelete]
        [Route("api/DeletePipelineStage/{pipelineStageId}")]
        [AllowAnonymous]
        public IHttpActionResult DeletePipelineStage(long pipelineStageId)
        {
            PipelineStage pipelineStage = _context.PipelineStages.FirstOrDefault(x => x.Id == pipelineStageId);

            if (pipelineStage == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            bool hasRelation = (_context.StageComments.Any(o => o.PipelineStageId == pipelineStageId) 
                                && _context.StageScores.Any(o => o.PipelineStageId == pipelineStageId));

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }


            _context.PipelineStages.Remove(pipelineStage);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpDelete]
        [Route("api/DeletePipelineStageCriterion/{pipelineStageCriterionId}")]
        [AllowAnonymous]
        public IHttpActionResult DeletePipelineStageCriterion(long pipelineStageCriterionId)
        {
            PipelineStageCriterion pipelineStageCriterion = _context.PipelineStageCriteria
                .FirstOrDefault(x => x.Id == pipelineStageCriterionId);

            if (pipelineStageCriterion == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            bool hasRelation = _context.CriteriaScores.Any(o => o.PipelineStageCriterionId == pipelineStageCriterionId);

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }


            _context.PipelineStageCriteria.Remove(pipelineStageCriterion);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }

    }
}
