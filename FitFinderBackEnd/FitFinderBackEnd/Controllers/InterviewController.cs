using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Interview;
using FitFinderBackEnd.Models.Job;
using FitFinderBackEnd.Models.Settings;
using FitFinderBackEnd.Services;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class InterviewController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private ApplicationUserManager _userManager;
        private StatusTextService _statusTextService;
        private SharedService _sharedService;

        public InterviewController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
            _sharedService = new SharedService();
        }

        public InterviewController(ApplicationUserManager userManager,
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
        [Route("api/AddNewInterview")]
        public IHttpActionResult AddNewInterview(Interview interview)
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

            interview.CompanyId = applicationUser.CompanyId;
            _context.Interviews.Add(interview);

            _context.SaveChanges();
            return Ok(new { interview, statusText = _statusTextService.Success });
        }



        [HttpPut]
        [Route("api/EditInterview")]
        public IHttpActionResult EditInterview(Interview interview)
        {
            Interview getInterview = _context.Interviews.FirstOrDefault(x => x.Id == interview.Id);
            if (getInterview == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getInterview.Name = interview.Name;
            getInterview.Date = interview.Date;
            getInterview.StartTime = interview.StartTime;
            getInterview.EndTime = interview.EndTime;
            getInterview.Location = interview.Location;
            getInterview.InterviewType = interview.InterviewType;

           
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }



        [HttpGet]
        [Route("api/GetAllInterview")]
        [AllowAnonymous]
        public IHttpActionResult GetAllInterview()
        {
            List<Interview> interviews = new List<Interview>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { interviews, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { interviews, statusText = _statusTextService.UserClaimError });
            }


            interviews = _context.Interviews
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderByDescending(x => x.Id)
                .ToList();

            interviews.ForEach(interview =>
            {
                Job job = _context.Jobs.FirstOrDefault(x => x.Id == interview.JobId);


                List<CandidateForInterview> candidatesForInterview = _context.CandidatesForInterviews
                    .Where(x => x.InterviewId == interview.Id)
                    .ToList();

                interview.CandidatesForInterview = candidatesForInterview;
            });


            return Ok(new { interviews, statusText = _statusTextService.Success });
        }


        [HttpGet]
        [Route("api/GetAllCandidateSpecificInterview/{candidateId}")]
        [AllowAnonymous]
        public IHttpActionResult GetAllCandidateSpecificInterview(long candidateId)
        {
            List<CandidateForInterview> candidatesForInterview = new List<CandidateForInterview>();
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { candidatesForInterview, statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { candidatesForInterview, statusText = _statusTextService.UserClaimError });
            }

            candidatesForInterview = _context.CandidatesForInterviews
                .Where(x => x.CandidateId == candidateId)
                .OrderByDescending(x => x.Id)
                .ToList();

            candidatesForInterview.ForEach(candidateForInterview =>
            {
                Interview interview = _context.Interviews
                    .FirstOrDefault(x => x.Id == candidateForInterview.InterviewId);

                if (interview != null)
                {
                    candidateForInterview.Interview = interview;
                }
               
            }); 


            return Ok(new { candidatesForInterview, statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("api/GetInterview/{interviewId}")]
        [AllowAnonymous]
        public IHttpActionResult GetInterview(long interviewId)
        {
            Interview interview = _context.Interviews.FirstOrDefault(x => x.Id == interviewId);

            if (interview == null)
            {
                return Ok(new { interview, statusText = _statusTextService.ResourceNotFound });
            }

            List<CandidateForInterview> candidatesForInterviews = _context.CandidatesForInterviews
                .Where(x => x.InterviewId == interviewId)
                .ToList();

            candidatesForInterviews.ForEach(x =>
                {
                    x.Candidate = _sharedService.GetCandidate(x.CandidateId);
                });

            List<InterviewerForInterview> interviewersForInterviews = _context.InterviewersForInterviews
                .Where(x => x.InterviewId == interviewId)
                .ToList();

            Job job = _context.Jobs.FirstOrDefault(x => x.Id == interview.JobId);
            Workflow workflow = _context.Workflows.FirstOrDefault(x => x.Id == job.WorkflowId);

            
            if (workflow == null)
            {
                interview = null;
                return Ok(new { interview ,statusText = _statusTextService.ResourceNotFound });
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

            interviewersForInterviews.ForEach(x =>
            {
                ApplicationUser applicationUser = _context.Users.FirstOrDefault(a => a.Id == x.UserAccountId);

                if (applicationUser != null)
                {
                    x.UserAccount = _sharedService.GetUserAccount(applicationUser);
                }
            });


            return Ok(new { interview, statusText = _statusTextService.Success });

        }



        [HttpPut]
        [Route("api/ArchiveInterviews")]
        public IHttpActionResult ArchiveInterviews(List<Interview> interviews)
        {
            foreach (var interview in interviews)
            {
                Interview getInterview = _context.Interviews.FirstOrDefault(x => x.Id == interview.Id);
                if (getInterview != null)
                {
                    getInterview.IsArchived = true;
                }
            }

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/RestoreInterviews")]
        public IHttpActionResult RestoreInterviews(List<Interview> interviews)
        {
            foreach (var interview in interviews)
            {
                Interview getInterview = _context.Interviews.FirstOrDefault(x => x.Id == interview.Id);
                if (getInterview != null)
                {
                    getInterview.IsArchived = false;
                }
            }

            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/ChangeInterviewStatus")]
        [AllowAnonymous]
        public IHttpActionResult ChangeInterviewStatus(CandidateForInterview candidateForInterview)
        {
            CandidateForInterview getCandidateForInterview = _context.CandidatesForInterviews
                .FirstOrDefault(x => x.Id == candidateForInterview.Id);

            Interview interview = _context.Interviews
                .FirstOrDefault(x => x.Id == candidateForInterview.InterviewId);

            if (getCandidateForInterview == null || interview == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            

            if (candidateForInterview.InterviewStatus == "Confirmed")
            {
                interview.ConfirmedCandidate++;

                if (getCandidateForInterview.InterviewStatus == "Declined")
                {
                    interview.DeclinedCandidate--;
                }
            }

            if (candidateForInterview.InterviewStatus == "Declined")
            {
                interview.DeclinedCandidate++;

                if (getCandidateForInterview.InterviewStatus == "Confirmed")
                {
                    interview.ConfirmedCandidate--;
                }
            }

            if (candidateForInterview.InterviewStatus == "Invited" 
                || candidateForInterview.InterviewStatus == "Pending")
            {
                if (getCandidateForInterview.InterviewStatus == "Confirmed")
                {
                    interview.ConfirmedCandidate--;
                }

                if (getCandidateForInterview.InterviewStatus == "Declined")
                {
                    interview.DeclinedCandidate--;
                }
            }



            getCandidateForInterview.InterviewStatus = candidateForInterview.InterviewStatus;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }




        [HttpPost]
        [Route("api/AssignInterviewerToInterview")]
        [AllowAnonymous]
        public IHttpActionResult AssignInterviewerToInterview(InterviewerForInterview interviewerForInterview)
        {
            _context.InterviewersForInterviews.Add(interviewerForInterview);
            _context.SaveChanges();

            return Ok(new { id = interviewerForInterview.Id, statusText = _statusTextService.Success });
        }


        [HttpDelete]
        [Route("api/RemoveInterviewerFromInterview/{id}")]
        [AllowAnonymous]
        public IHttpActionResult RemoveInterviewerFromInterview(long id)
        {
            InterviewerForInterview interviewerForInterview = _context.InterviewersForInterviews
                .FirstOrDefault(x => x.Id == id);

            if (interviewerForInterview == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            _context.InterviewersForInterviews.Remove(interviewerForInterview);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/AssignCandidatesToInterview")]
        [AllowAnonymous]
        public IHttpActionResult AssignCandidatesToInterview(List<CandidateForInterview> candidatesForInterviews)
        {
            _context.CandidatesForInterviews.AddRange(candidatesForInterviews);
            _context.SaveChanges();

            candidatesForInterviews.ForEach(x =>
            {
                x.Candidate = _sharedService.GetCandidate(x.CandidateId);
            });

            return Ok(new { candidatesForInterviews, statusText = _statusTextService.Success });
        }

        [HttpDelete]
        [Route("api/RemoveCandidatesFromInterview/{candidatesForInterviewId}")]
        [AllowAnonymous]
        public IHttpActionResult RemoveCandidatesFromInterview(long candidatesForInterviewId)
        {
            CandidateForInterview candidateForInterview = _context.CandidatesForInterviews
                .FirstOrDefault(x => x.Id == candidatesForInterviewId);

            if (candidateForInterview == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            Interview interview = _context.Interviews.FirstOrDefault(x => x.Id == candidateForInterview.InterviewId);

            if (interview == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            if (candidateForInterview.InterviewStatus == "Confirmed")
            {
                interview.ConfirmedCandidate--;
            }

            if (candidateForInterview.InterviewStatus == "Declined")
            {
                interview.DeclinedCandidate--;
            }


            _context.CandidatesForInterviews.Remove(candidateForInterview);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpDelete]
        [Route("api/DeleteInterview/{interviewId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteInterview(long interviewId)
        {
            Interview interview = _context.Interviews.FirstOrDefault(x => x.Id == interviewId);

            if (interview == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }


            List<CandidateForInterview> candidatesForInterviews = _context.CandidatesForInterviews
                .Where(x => x.InterviewId == interviewId)
                .ToList();

            List<InterviewerForInterview> interviewersForInterviews = _context.InterviewersForInterviews
                .Where(x => x.InterviewId == interviewId)
                .ToList();

            _context.CandidatesForInterviews.RemoveRange(candidatesForInterviews);
            _context.InterviewersForInterviews.RemoveRange(interviewersForInterviews);
            _context.SaveChanges();

            _context.Interviews.Remove(interview);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });

        }
    }
}
