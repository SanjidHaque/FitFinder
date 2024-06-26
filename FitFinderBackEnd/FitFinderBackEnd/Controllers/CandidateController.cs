﻿using System.Collections.Generic;
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
    public class CandidateController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private ApplicationUserManager _userManager;
        private StatusTextService _statusTextService;
        private SharedService _sharedService;

        public CandidateController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
            _sharedService = new SharedService();
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
                _sharedService.DeleteCandidateAttachment(candidate.CandidateAttachments);
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                _sharedService.DeleteCandidateAttachment(candidate.CandidateAttachments);
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            candidate.ImageName = _sharedService.defaultImage;
            candidate.CompanyId = applicationUser.CompanyId;
            _context.Candidates.Add(candidate);
            _context.SaveChanges();



        

            candidate.JobAssignments[0].CandidateId = candidate.Id;
            JobAssignment getJobAssignment = _sharedService.OnAddJobAssignment(candidate.JobAssignments[0]);
            _context.SaveChanges();

            if (getJobAssignment == null)
            {
                _sharedService.DeleteCandidateAttachment(candidate.CandidateAttachments);
                _context.Candidates.Remove(candidate);
                _context.SaveChanges();

                return Ok(new { statusText = _statusTextService.SomethingWentWrong });
            }


            return Ok(new { candidate, getJobAssignment, statusText = _statusTextService.Success });
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
            getCandidate.GitHubUrl = candidate.GitHubUrl;
            getCandidate.Country = candidate.Country;

            UpdateCandidateEducations(candidate);
            UpdateCandidateExperiences(candidate);

            _context.Entry(getCandidate).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        private void UpdateCandidateEducations(Candidate candidate)
        {
            List<CandidateEducation> candidateEducations = _context.CandidateEducations
                .Where(x => x.CandidateId == candidate.Id)
                .ToList();

            if (candidate.CandidateEducations == null)
            {
                candidate.CandidateEducations = new List<CandidateEducation>();
            }

            _context.CandidateEducations.AddRange(candidate.CandidateEducations);
            _context.CandidateEducations.RemoveRange(candidateEducations);
        }

        private void UpdateCandidateExperiences(Candidate candidate)
        {
            List<CandidateExperience> candidateExperiences = _context.CandidateExperiences
                .Where(x => x.CandidateId == candidate.Id)
                .ToList();

            _context.CandidateExperiences.AddRange(candidate.CandidateExperiences);
            _context.CandidateExperiences.RemoveRange(candidateExperiences);
        }



        [HttpGet]
        [Route("api/GetAllCandidate")]
        [AllowAnonymous]
        public IHttpActionResult GetAllCandidate()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            List<Candidate> candidates = new List<Candidate>();


            if (userNameClaim == null)
            {
                return Ok(new { candidates, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { candidates, statusText = _statusTextService.UserClaimError });
            }


            candidates = _context.Candidates
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderByDescending(x => x.Id)
                .ToList();

            candidates.ForEach(candidate =>
            {
                Source source = _context.Sources.FirstOrDefault(x => x.Id == candidate.SourceId);
                if (source != null)
                {
                    candidate.Source = source;
                }
            });

            List<JobAssignment> jobAssignments = _context.JobAssignments
                .Include(x => x.Candidate)
                .ToList();

            return Ok(new { candidates, statusText = _statusTextService.Success });
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
                return Ok(new { candidate, statusText = _statusTextService.ResourceNotFound });
            }


            List<JobAssignment> jobAssignments = _context.JobAssignments
                .Where(x => x.CandidateId == candidateId)
                .ToList();


            Source source = _context.Sources
                .FirstOrDefault(x => x.Id == candidate.SourceId);

            jobAssignments.ForEach(jobAssignment =>
            {
                Job job = _context.Jobs.FirstOrDefault(x => x.Id == jobAssignment.JobId);

                Workflow workflow = _context.Workflows.FirstOrDefault(x => x.Id == job.WorkflowId);

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

                List<GeneralComment> generalComments = _context
                    .GeneralComments
                    .Where(x => x.JobAssignmentId == jobAssignment.Id)
                    .OrderByDescending(o => o.Id)
                    .ToList();

                jobAssignment.GeneralComments = generalComments;
                jobAssignment.Job = job;

            });


            List<PipelineStageCriterionScore> pipelineStageCriterionScores = _context
                .PipelineStageCriterionScores
                .Include(x => x.JobAssignment)
                .ToList();

            List<PipelineStageScore> pipelineStageScores = _context
                .PipelineStageScores
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


        [HttpPost]
        [Route("api/AddNewCandidateAttachment")]
        public IHttpActionResult AddNewCandidateAttachment(CandidateAttachment candidateAttachment)
        {
            _context.CandidateAttachments.Add(candidateAttachment);
            _context.SaveChanges();
            return Ok(new { candidateAttachment.Id, statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/ChangeCandidateResume")]
        public IHttpActionResult ChangeCandidateResume(CandidateAttachment candidateAttachment)
        {
            CandidateAttachment getCandidateAttachment = _context.CandidateAttachments
                .FirstOrDefault(x => x.Id == candidateAttachment.Id);

            if (getCandidateAttachment == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            if (getCandidateAttachment.IsResume)
            {
                getCandidateAttachment.IsResume = false;
            }
            else
            {
                getCandidateAttachment.IsResume = true;
            }

            List<CandidateAttachment> candidateAttachments = _context.CandidateAttachments
                .Where(x => x.CandidateId == candidateAttachment.CandidateId)
                .AsNoTracking()
                .ToList();
            candidateAttachments.ForEach(x =>
            {
                if (x.Id != candidateAttachment.Id)
                {
                    x.IsResume = false;
                }
            });

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
        }



        [HttpDelete]
        [Route("api/DeleteCandidateAttachment/{candidateAttachmentId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteJobAttachment(long candidateAttachmentId)
        {
            CandidateAttachment candidateAttachment = _context.CandidateAttachments.FirstOrDefault(x => x.Id == candidateAttachmentId);
            if (candidateAttachment == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            List<CandidateAttachment> candidateAttachments = new List<CandidateAttachment> { candidateAttachment };
            _sharedService.DeleteCandidateAttachment(candidateAttachments);
            _context.CandidateAttachments.Remove(candidateAttachment);

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpPost]
        [Route("api/DeleteCandidateImage")]
        [AllowAnonymous]
        public IHttpActionResult DeleteCandidateImage(Candidate candidate)
        {
            Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
            if (getCandidate == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            if (getCandidate.ImageName != _sharedService.defaultImage)
            {
                _sharedService.OnDeleteAttachment(new List<string> { getCandidate.ImageName }, "Image");
                getCandidate.ImageName = _sharedService.defaultImage;
            }


            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
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
            return Ok(new { statusText = _statusTextService.Success });
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
            return Ok(new { statusText = _statusTextService.Success });
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
            return Ok(new { statusText = _statusTextService.Success });
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

            List<CandidateAttachment> candidateAttachments = _context.CandidateAttachments
                .Where(x => x.CandidateId == candidateId)
                .AsNoTracking()
                .ToList();

            List<string> modifiedFileNames = new List<string>();

            candidateAttachments.ForEach(candidateAttachment =>
            {
                modifiedFileNames.Add(candidateAttachment.ModifiedFileName);
            });

            _sharedService.OnDeleteAttachment(modifiedFileNames, "Attachment");
            if (candidate.ImageName != _sharedService.defaultImage)
            {
                _sharedService.OnDeleteAttachment(new List<string> { candidate.ImageName }, "Image");
            }

            _context.Candidates.Remove(candidate);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }

    }
}
