using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Settings;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FitFinderBackEnd.Controllers
{
    public class AuthController : ApiController
    {
        [HttpPost]
        [AllowAnonymous]
        [Route("api/Register")]
        public IdentityResult Register(User newUser)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser()
                {
                    Email = newUser.Email,
                    UserName = newUser.UserName,
                    PhoneNumber = newUser.PhoneNumber
                };
            user.FirstName = newUser.FirstName;
            user.LastName = newUser.LastName;
            user.CompanyId = newUser.CompanyId;
            user.CompanyName = newUser.CompanyName;
           
            IdentityResult result = manager.Create(user, newUser.Password);
            return result;
        }
    }
}
