using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Services;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class AttachmentsController : ApiController
    {

        private ApplicationUserManager _userManager;
        private StatusTextService _statusTextService;
        private SharedService _sharedService;
        private HangfireService _hangfireService;
        private readonly ApplicationDbContext _context;

        public AttachmentsController()
        {
            _statusTextService = new StatusTextService();
            _context = new ApplicationDbContext();
            _sharedService = new SharedService();
            _hangfireService = new HangfireService();
        }

        public AttachmentsController(ApplicationUserManager userManager,
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
        [Route("api/UploadAttachments")]
        [AllowAnonymous]
        public IHttpActionResult UploadAttachments()
        {
            var httpRequest = HttpContext.Current.Request;
            for (int i = 0; i < httpRequest.Files.Count; i++)
            {
                try
                {
                    var postedFile = httpRequest.Files[i];
                    var filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
                catch (HttpException)
                {
                    return Ok(new { statusText = _statusTextService.SomethingWentWrong });
                }

            }

            return Ok(new { statusText = _statusTextService.Success });
        }



        [HttpPost]
        [Route("api/UploadCandidateResumesForNlp")]
        [AllowAnonymous]
        public IHttpActionResult UploadCandidateResumesForNlp()
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

            HttpRequest httpRequest = HttpContext.Current.Request;
            string jobIdInString = httpRequest["jobId"];
            int jobId = int.Parse(jobIdInString);

            var fileInformations = new List<dynamic>();
            
            for (int i = 0; i < httpRequest.Files.Count; i++)
            {
                HttpPostedFile postedFile = httpRequest.Files[i];
                var filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + postedFile.FileName);
                fileInformations.Add( new { FilePath = filePath, FileName = postedFile.FileName });
                try
                {
                    postedFile.SaveAs(filePath);
                }
                catch (HttpException)
                {
                    return Ok(new { statusText = _statusTextService.SomethingWentWrong });
                }
            }
            _hangfireService.CreateNewCandidates(fileInformations, jobId, applicationUser.CompanyId);

            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpPost]
        [Route("api/UploadImage")]
        [AllowAnonymous]
        public IHttpActionResult UploadImage()
        {



            HttpRequest httpRequest = HttpContext.Current.Request;
            var postedFile = httpRequest.Files[0];
            var filePath = HttpContext.Current.Server.MapPath("~/Content/Images/" + postedFile.FileName);

            try
            {   
                postedFile.SaveAs(filePath);
            }
            catch (HttpException)
            {
                return Ok(new { statusText = _statusTextService.SomethingWentWrong });
            }

            string idInString = httpRequest["Id"];
            int id = int.Parse(idInString);

            string objectType = httpRequest["ObjectType"];

            if (objectType == "Candidate")
            {
                Candidate candidate = _context.Candidates.FirstOrDefault(x => x.Id == id);
                if (candidate == null)
                {
                    return Ok(new { statusText = _statusTextService.ResourceNotFound });
                }

                if (candidate.ImageName != _sharedService.defaultImage)
                {
                    _sharedService.OnDeleteAttachment(new List<string>{ candidate.ImageName }, "Image");
                }

                candidate.ImageName = postedFile.FileName;
                _context.SaveChanges();

            }

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPost]
        [Route("api/DeleteAttachments")]
        [AllowAnonymous]
        public IHttpActionResult DeleteAttachments(List<string> modifiedFileNames)
        {
            SharedService sharedService = new SharedService();
            sharedService.OnDeleteAttachment(modifiedFileNames, "Attachment");

            return Ok(new { statusText = _statusTextService.Success });
        }

    }
}
