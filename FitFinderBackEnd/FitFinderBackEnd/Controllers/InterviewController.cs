using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Interview;
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

        public InterviewController()
        {
            _context = new ApplicationDbContext();
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
                return Ok(new { statusText = "Error" });
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null || interview == null)
            {
                return Ok(new { statusText = "Error" });
            }

            interview.CompanyId = applicationUser.CompanyId;
            _context.Interviews.Add(interview);

//            foreach (var candidatesForInterview in interview.CandidatesForInterview)
//            {
//                candidatesForInterview.Id = interview.Id;
//            }
//
//            foreach (var interviewersForInterview in interview.InterviewersForInterview)
//            {
//                interviewersForInterview.Id = interview.Id;
//            }

//            _context.CandidatesForInterviews.AddRange(interview.CandidatesForInterview);
//            _context.InterviewersForInterviews.AddRange(interview.InterviewersForInterview);

            _context.SaveChanges();
            return Ok(new { statusText = "Success", interview });
        }

        [HttpGet]
        [Route("api/GetAllInterview")]
        [AllowAnonymous]
        public IHttpActionResult GetAllInterview()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new List<Interview>());
            }

            ApplicationUser applicationUser = UserManager.FindByName(userNameClaim.Value);
            if (applicationUser == null)
            {
                return Ok(new List<Interview>());
            }


            List<Interview> interview = _context.Interviews
                .Where(x => x.CompanyId == applicationUser.CompanyId)
                .Include(c => c.CandidatesForInterview)
                .Include(d => d.InterviewersForInterview)
                .OrderByDescending(x => x.Id)
                .ToList();
            return Ok(interview);
        }



        [HttpPut]
        [Route("api/ArchiveInterviews")]
        public IHttpActionResult ArchiveInterviews(List<Interview> interviews)
        {
            foreach (var interview in interviews)
            {
                Interview getInterview = _context.Interviews.FirstOrDefault(x => x.Id == interview.Id);
                if (getInterview != null) getInterview.IsArchived = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/RestoreInterviews")]
        public IHttpActionResult RestoreInterviews(List<Interview> interviews)
        {
            foreach (var interview in interviews)
            {
                Interview getInterview = _context.Interviews.FirstOrDefault(x => x.Id == interview.Id);
                if (getInterview != null) getInterview.IsArchived = false;
            }

            _context.SaveChanges();
            return Ok();
        }
    }
}
