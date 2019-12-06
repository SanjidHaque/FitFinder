using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using FitFinderBackEnd.Models;
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

        public AttachmentsController()
        {
            _statusTextService = new StatusTextService();
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



            return Ok(new {statusText = _statusTextService.Success });
        }


        [HttpPost]
        [Route("api/DeleteAttachments")]
        [AllowAnonymous]
        public IHttpActionResult DeleteAttachments(List<string> fileNames)
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

            SharedService sharedService = new SharedService();
            sharedService.OnDeleteAttachment(fileNames);

            return Ok(new { statusText = _statusTextService.Success });
        }

    }
}
