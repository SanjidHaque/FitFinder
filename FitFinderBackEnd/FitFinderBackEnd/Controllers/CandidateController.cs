using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
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
    public class CandidateController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private ApplicationUserManager _userManager;
        private StatusTextService _statusTextService;

        public CandidateController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
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
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            candidate.CompanyId = applicationUser.CompanyId;
            
            _context.Candidates.Add(candidate);

            _context.SaveChanges();


            //if (candidate.JobAssignment.Count > 0)
            //{
            //    candidate.JobAssignment[0].CandidateId = candidate.Id;



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


            return Ok(new { candidate, statusText = _statusTextService.Success });
        }


        [HttpPut]
        [Route("api/EditCandidate")]
        public IHttpActionResult EditCandidate(Candidate candidate)
        {
            Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
            if (getCandidate == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getCandidate.FirstName = candidate.FirstName;
            getCandidate.LastName = candidate.LastName;
            getCandidate.Address = candidate.Address;
            getCandidate.Email = candidate.Email;
            getCandidate.Mobile = candidate.Mobile;
            getCandidate.City = candidate.City;
            getCandidate.State = candidate.State;
            getCandidate.SourceId = candidate.SourceId;
            getCandidate.FacebookUrl = candidate.FacebookUrl;
            getCandidate.LinkedInUrl = candidate.LinkedInUrl;
            getCandidate.Country = candidate.Country;

            UpdateCandidateEducations(getCandidate);
            UpdateCandidateExperiences(getCandidate);

            _context.Entry(getCandidate).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        private void UpdateCandidateEducations(Candidate candidate)
        {
            List<CandidateEducation> candidateEducations = _context.CandidateEducations
                .Where(x => x.CandidateId == candidate.Id)
                .ToList();

            _context.CandidateEducations.RemoveRange(candidateEducations);
            _context.CandidateEducations.AddRange(candidate.CandidateEducation);
        }

        private void UpdateCandidateExperiences(Candidate candidate)
        {
            List<CandidateExperience> candidateExperiences = _context.CandidateExperiences
                .Where(x => x.CandidateId == candidate.Id)
                .ToList();

            _context.CandidateExperiences.RemoveRange(candidateExperiences);
            _context.CandidateExperiences.AddRange(candidate.CandidateExperience);
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
            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetAllCandidate")]
        [AllowAnonymous]
        public IHttpActionResult GetAllCandidate()
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


            List<Candidate> candidates = _context.Candidates
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderByDescending(x => x.Id)
                .ToList();

            List<JobAssignment> jobAssignments = _context.JobAssignments
                .Include(x => x.Candidate)
                .ToList();

            return Ok(new {candidates, statusText = _statusTextService.Success });
        }


        [HttpGet]
        [Route("api/GetCandidate/{candidateId}")]
        [AllowAnonymous]
        public IHttpActionResult GetCandidate(long candidateId)
        {
           
            Candidate candidate = _context.Candidates
                .FirstOrDefault(x => x.Id == candidateId);

            if (candidate == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            List<JobAssignment> jobAssigneds = _context.JobAssignments
                .Where(x => x.CandidateId == candidateId)
                .ToList();


            Source source = _context.Sources
                .FirstOrDefault(x => x.Id == candidate.SourceId);


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
                .Include(x => x.JobAssignment)
                .ToList();

            List<StageScore> stageScores = _context.StageScores
                .Include(x => x.JobAssignment)
                .ToList();

            List<StageComment> stageComments = _context.StageComments
                .Include(x => x.JobAssignment)
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


            return Ok(new { candidate, statusText = _statusTextService.Success });
        }


        [HttpPut]
        [Route("api/ArchiveCandidates")]
        public IHttpActionResult ArchiveCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null)
                {
                    getCandidate.IsArchived = true;
                }
            }

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/RestoreCandidates")]
        public IHttpActionResult RestoreCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null)
                {
                    getCandidate.IsArchived = false;
                }
            }

            _context.SaveChanges();
            return Ok(new {  statusText = _statusTextService.Success });
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("api/FavouriteCandidates")]
        public IHttpActionResult FavouriteCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null)
                {
                    getCandidate.IsFavourite = true;
                }
            }

            _context.SaveChanges();
            return Ok(new {  statusText = _statusTextService.Success });
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("api/UnfavouriteCandidates")]
        public IHttpActionResult UnfavouriteCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null)
                {
                    getCandidate.IsFavourite = false;
                }
            }

            _context.SaveChanges();
            return Ok(new {  statusText = _statusTextService.Success });
        }

        [HttpDelete]
        [Route("api/DeleteCandidate/{candidateId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteCandidate(long candidateId)
        {
            Candidate candidate = _context.Candidates.FirstOrDefault(x => x.Id == candidateId);

            if (candidate == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            bool hasRelation = _context.CandidatesForInterviews.Any(o => o.InterviewId == candidateId);

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }

            _context.Candidates.Remove(candidate);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }

    }
}
