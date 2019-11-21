﻿using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Interview;
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

        public InterviewController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
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
                return Ok(new {  statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            interview.CompanyId = applicationUser.CompanyId;
            _context.Interviews.Add(interview);

//            foreach (var candidatesForInterview in interview.Candidates)
//            {
//                candidatesForInterview.Id = interview.Id;
//            }
//
//            foreach (var interviewersForInterview in interview.InterviewersForInterview)
//            {
//                interviewersForInterview.Id = interview.Id;
//            }

//            _context.CandidatesForInterviews.AddRange(interview.Candidates);
//            _context.InterviewersForInterviews.AddRange(interview.InterviewersForInterview);

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
            getInterview.InterviewStatus = interview.InterviewStatus;
            getInterview.InterviewType = interview.InterviewType;

            _context.Entry(getInterview).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }



        [HttpGet]
        [Route("api/GetAllInterview")]
        [AllowAnonymous]
        public IHttpActionResult GetAllInterview()
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


            List<Interview> interviews = _context.Interviews
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .OrderByDescending(x => x.Id)
                .ToList();

            return Ok( new { interviews, statusText = _statusTextService.Success });
        }


        [HttpGet]
        [Route("api/GetInterview/{interviewId}")]
        [AllowAnonymous]
        public IHttpActionResult GetInterview(long interviewId)
        {
            Interview interview = _context.Interviews.FirstOrDefault(x =>  x.Id == interviewId);


            if (interview == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            List<CandidatesForInterview> candidatesForInterviews = _context.CandidatesForInterviews
                .Where(x => x.InterviewId == interviewId)
                .ToList();

            List<InterviewersForInterview> interviewersForInterviews = _context.InterviewersForInterviews
                .Where(x => x.InterviewId == interviewId)
                .ToList();

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
            return Ok(new {  statusText = _statusTextService.Success });
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

            bool hasRelation = (_context.InterviewersForInterviews.Any(o => o.InterviewId == interviewId)
                               && _context.CandidatesForInterviews.Any(o => o.InterviewId == interviewId));

            if (hasRelation)
            {
                return Ok(new { StatusText = _statusTextService.ReportingPurposeIssue });
            }


            _context.Interviews.Remove(interview);
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
            
          //  return Ok(new { statusText = _statusTextService.ReportingPurposeIssue });
          
        }
    }
}
