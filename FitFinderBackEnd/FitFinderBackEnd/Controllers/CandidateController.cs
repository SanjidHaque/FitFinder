using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Job;
using FitFinderBackEnd.Models.Settings;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class CandidateController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private ApplicationUserManager _userManager;

        public CandidateController()
        {
            _context = new ApplicationDbContext();
        }

        public CandidateController(ApplicationUserManager userManager,
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
        [Route("api/AddNewCandidate")]
        public IHttpActionResult AddNewCandidate(Candidate candidate)
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new {  statusText =  "Error"});
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || candidate == null)
            {
                return Ok(new { statusText = "Error" });
            }

            candidate.CompanyId = applicationUser.CompanyId;
            _context.Candidates.Add(candidate);

            _context.SaveChanges();


            //if (candidate.JobAssigned.Count > 0)
            //{
            //    candidate.JobAssigned[0].CandidateId = candidate.Id;



            //    _context.SaveChanges();
            //}

            


//            foreach (var candidateEducation in candidate.CandidateEducation)
//            {
//                candidateEducation.Id = candidate.Id;
//            }
//            foreach (var candidateExperience in candidate.CandidateExperience)
//            {
//                candidateExperience.Id = candidate.Id;
//            }
//
//            foreach (var candidateAttachment in candidate.CandidateAttachment)
//            {
//                candidateAttachment.Id = candidate.Id;
//            }
//
//
//
//            _context.CandidateAttachments.AddRange(candidate.CandidateAttachment);
//            _context.CandidateEducations.AddRange(candidate.CandidateEducation);
//            _context.CandidateExperiences.AddRange(candidate.CandidateExperience);

           
            return Ok(new { statusText = "Success", candidate });
        }

        [HttpPost]
        [Route("api/UploadAttachments")]
        [AllowAnonymous]
        public IHttpActionResult UploadAttachments()
        {
            var httpRequest = HttpContext.Current.Request;
            for (int i = 0; i < httpRequest.Files.Count; i++)
            {
                var postedFile = httpRequest.Files[i];
                var filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + postedFile.FileName);
                postedFile.SaveAs(filePath);
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllCandidate")]
        [AllowAnonymous]
        public IHttpActionResult GetAllCandidate()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<Candidate>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<Candidate>());
            }


            List<Candidate> candidates = _context.Candidates
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderByDescending(x => x.Id)
                .ToList();

            List<JobAssigned> jobAssigneds = _context.JobAssigneds
                .Include(x => x.Candidate)
                .ToList();

            return Ok(candidates);
        }


        [HttpGet]
        [Route("api/GetCandidate/{candidateId}")]
        [AllowAnonymous]
        public IHttpActionResult GetCandidate(long candidateId)
        {
           
            Candidate candidate = _context.Candidates
                .FirstOrDefault(x => x.Id == candidateId);

           

            List<JobAssigned> jobAssigneds = _context.JobAssigneds
                .Where(x => x.CandidateId == candidateId)
                .ToList();


         //   Job job = _context.Jobs.FirstOrDefault(x => x. == job)
                
                
            jobAssigneds.ForEach(jobAssigned =>
            {
                Job job = _context.Jobs.FirstOrDefault(x => x.Id == jobAssigned.JobId);

                Workflow workflow = _context.Workflows.FirstOrDefault(x => x.Id == job.WorkflowId);

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

                jobAssigned.Job = job;

            });
         

            List<CriteriaScore> criteriaScores = _context.CriteriaScores
                .Include(x => x.JobAssigned)
                .ToList();

            List<StageScore> stageScores = _context.StageScores
                .Include(x => x.JobAssigned)
                .ToList();

            List<StageComment> stageComments = _context.StageComments
                .Include(x => x.JobAssigned)
                .ToList();


            List<CandidateEducation> candidateEducations = _context.CandidateEducations
                .Where(x => x.CandidateId == candidateId)
                .ToList();

            List<CandidateExperience> candidateExperiences = _context.CandidateExperiences
                .Where(x => x.CandidateId == candidateId)
                .ToList();

            List<CandidateAttachment> candidateAttachments = _context.CandidateAttachments
                .Where(x => x.CandidateId == candidateId)
                .ToList();


            return Ok(candidate);
        }


        [HttpPut]
        [Route("api/ArchiveCandidates")]
        public IHttpActionResult ArchiveCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsArchived = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/RestoreCandidates")]
        public IHttpActionResult RestoreCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsArchived = false;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("api/FavouriteCandidates")]
        public IHttpActionResult FavouriteCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsFavourite = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("api/UnfavouriteCandidates")]
        public IHttpActionResult UnfavouriteCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsFavourite = false;
            }

            _context.SaveChanges();
            return Ok();
        }



    }
}
