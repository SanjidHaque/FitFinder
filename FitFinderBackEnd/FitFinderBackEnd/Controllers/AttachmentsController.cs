using System;
using System.Collections.Generic;
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
        private readonly ApplicationDbContext _context;

        public AttachmentsController()
        {
            _statusTextService = new StatusTextService();
            _context = new ApplicationDbContext();
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

                if (candidate.CandidateImagePath != null)
                {
                    DeleteAttachments(new List<string>{ postedFile.FileName });
                }

                candidate.CandidateImagePath = postedFile.FileName;
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
            sharedService.OnDeleteAttachment(modifiedFileNames);

            return Ok(new { statusText = _statusTextService.Success });
        }

    }
}
