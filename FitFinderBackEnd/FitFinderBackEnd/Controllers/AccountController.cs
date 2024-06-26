﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Settings;
using FitFinderBackEnd.Providers;
using FitFinderBackEnd.Results;
using FitFinderBackEnd.Services;

namespace FitFinderBackEnd.Controllers
{
    
    [Authorize]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;
        private ApplicationDbContext _context;
        private StatusTextService _statusTextService;
        private SharedService _sharedService;
        private SettingsService _settingsService;

        public AccountController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
            _sharedService = new SharedService();
            _settingsService = new SettingsService();
        }

        public AccountController(ApplicationUserManager userManager,
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

        // GET api/Account/UserInfo
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UserInfo")]
        public UserInfoViewModel GetUserInfo()
        {
            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            return new UserInfoViewModel
            {
                Email = User.Identity.GetUserName(),
                HasRegistered = externalLogin == null,
                LoginProvider = externalLogin != null ? externalLogin.LoginProvider : null
            };
        }

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        // GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
        [Route("ManageInfo")]
        public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
        {
            IdentityUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            if (user == null)
            {
                return null;
            }

            List<UserLoginInfoViewModel> logins = new List<UserLoginInfoViewModel>();

            foreach (IdentityUserLogin linkedAccount in user.Logins)
            {
                logins.Add(new UserLoginInfoViewModel
                {
                    LoginProvider = linkedAccount.LoginProvider,
                    ProviderKey = linkedAccount.ProviderKey
                });
            }

            if (user.PasswordHash != null)
            {
                logins.Add(new UserLoginInfoViewModel
                {
                    LoginProvider = LocalLoginProvider,
                    ProviderKey = user.UserName,
                });
            }

            return new ManageInfoViewModel
            {
                LocalLoginProvider = LocalLoginProvider,
                Email = user.UserName,
                Logins = logins,
                ExternalLoginProviders = GetExternalLogins(returnUrl, generateState)
            };
        }

        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword,
                model.NewPassword);
            
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/SetPassword
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/AddExternalLogin
        [Route("AddExternalLogin")]
        public async Task<IHttpActionResult> AddExternalLogin(AddExternalLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

            if (ticket == null || ticket.Identity == null || (ticket.Properties != null
                && ticket.Properties.ExpiresUtc.HasValue
                && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
            {
                return BadRequest("External login failure.");
            }

            ExternalLoginData externalData = ExternalLoginData.FromIdentity(ticket.Identity);

            if (externalData == null)
            {
                return BadRequest("The external login is already associated with an account.");
            }

            IdentityResult result = await UserManager.AddLoginAsync(User.Identity.GetUserId(),
                new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/RemoveLogin
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId());
            }
            else
            {
                result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(),
                    new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            if (error != null)
            {
                return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, this);
            }

            ApplicationUser user = await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider,
                externalLogin.ProviderKey));

            bool hasRegistered = user != null;

            if (hasRegistered)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                
                 ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager,
                    OAuthDefaults.AuthenticationType);
                ClaimsIdentity cookieIdentity = await user.GenerateUserIdentityAsync(UserManager,
                    CookieAuthenticationDefaults.AuthenticationType);

                AuthenticationProperties properties = ApplicationOAuthProvider.CreateProperties(user.UserName);
                Authentication.SignIn(properties, oAuthIdentity, cookieIdentity);
            }
            else
            {
                IEnumerable<Claim> claims = externalLogin.GetClaims();
                ClaimsIdentity identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                Authentication.SignIn(identity);
            }

            return Ok();
        }

        // GET api/Account/ExternalLogins?returnUrl=%2F&generateState=true
        [AllowAnonymous]
        [Route("ExternalLogins")]
        public IEnumerable<ExternalLoginViewModel> GetExternalLogins(string returnUrl, bool generateState = false)
        {
            IEnumerable<AuthenticationDescription> descriptions = Authentication.GetExternalAuthenticationTypes();
            List<ExternalLoginViewModel> logins = new List<ExternalLoginViewModel>();

            string state;

            if (generateState)
            {
                const int strengthInBits = 256;
                state = RandomOAuthStateGenerator.Generate(strengthInBits);
            }
            else
            {
                state = null;
            }

            foreach (AuthenticationDescription description in descriptions)
            {
                ExternalLoginViewModel login = new ExternalLoginViewModel
                {
                    Name = description.Caption,
                    Url = Url.Route("ExternalLogin", new
                    {
                        provider = description.AuthenticationType,
                        response_type = "token",
                        client_id = Startup.PublicClientId,
                        redirect_uri = new Uri(Request.RequestUri, returnUrl).AbsoluteUri,
                        state = state
                    }),
                    State = state
                };
                logins.Add(login);
            }

            return logins;
        }


        [HttpPost]
        [Route("api/AddNewCompany")]
        public IHttpActionResult AddNewCompany(Company company)
        {

            _context.Companies.Add(company);
            _context.SaveChanges();
            SettingsService settingsService = new SettingsService();
            settingsService.GenerateDefaultWorkflow(company.Id);

            long departmentId = settingsService.GenerateDefaultDepartment(company.Id);
            settingsService.GenerateDefaultSources(company.Id);
            settingsService.GenerateDefaulJobTypes(company.Id);
            settingsService.GenerateDefaultJobFunction(company.Id);
            settingsService.GenerateDefaultWithdrawnReasons(company.Id);
            settingsService.GenerateDefaultWithdrawnReasons(company.Id);




            _context.SaveChanges();
            return Ok(new { company, statusText = _statusTextService.Success });
        }



       
        [HttpPost]
        [AllowAnonymous]
        [Route("api/AddNewUserAccount")]
        public async Task<IHttpActionResult> Register(UserAccount userAccount)
        {

            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser getActiveApplicationUser = UserManager.FindByName(userNameClaim.Value);
            if (getActiveApplicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }


            var applicationUser = new ApplicationUser()
            {
                UserName = userAccount.UserName,
                Email = userAccount.Email,
                PhoneNumber = userAccount.PhoneNumber,
                FullName = userAccount.FullName,
                JoiningDateTime = userAccount.JoiningDateTime,
                IsOwner = userAccount.IsOwner
            };

            PasswordGeneratorService passwordGeneratorService = new PasswordGeneratorService();
            string customPassword = passwordGeneratorService.Generate(6, 6);



            IdentityResult result = await UserManager.CreateAsync(applicationUser, customPassword);

            if (!result.Succeeded)
            {
                return Ok(new { statusText = result.Errors.First() });
            }

            UserManager.AddToRole(applicationUser.Id, userAccount.RoleName);

            string code = await UserManager.GenerateEmailConfirmationTokenAsync(applicationUser.Id);
            
            var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = applicationUser.Id, code = code }));

            await UserManager
                .SendEmailAsync(applicationUser.Id, "FitFinder Account Confirmation",
                    "Please confirm your fitfinder account by clicking <a href=\""
                     + callbackUrl + "\">here.</a>" + " Username is " + applicationUser.UserName
                     + " and password is " + customPassword);

            if (userAccount.Company != null)
            {
                var getIds = _sharedService.OnAddNewCompany(userAccount.Company);

                applicationUser.CompanyId = getIds.companyId;
                applicationUser.DepartmentId = getIds.departmentId;
                await UserManager.UpdateAsync(applicationUser);

                return Ok(new { companyId = applicationUser.CompanyId, statusText = _statusTextService.Success });
            } else
            {
                applicationUser.DepartmentId = userAccount.DepartmentId;
                applicationUser.CompanyId = getActiveApplicationUser.CompanyId;
                await UserManager.UpdateAsync(applicationUser);

                return Ok(new { statusText = _statusTextService.Success });
            }

        }



        [Route("api/EditUserAccount")]
        [HttpPut]
        [AllowAnonymous]
        public async Task<IHttpActionResult> EditUserAccount(UserAccount userAccount)
        {
            ApplicationUser applicationUser = UserManager.FindByName(userAccount.UserName);
            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            string roleId = applicationUser.Roles.SingleOrDefault()?.RoleId;
            string roleName = _context.Roles.SingleOrDefault(r => r.Id == roleId)?.Name;

            if (roleName != userAccount.RoleName)
            {
                UserManager.RemoveFromRole(applicationUser.Id, roleName);
                UserManager.AddToRole(applicationUser.Id, userAccount.RoleName);
            }

            applicationUser.FullName = userAccount.FullName;
            applicationUser.Email = userAccount.Email;
            applicationUser.PhoneNumber = userAccount.PhoneNumber;
            applicationUser.DepartmentId = userAccount.DepartmentId;


            if (userAccount.Company != null)
            {
                Company getCompany = _context.Companies.FirstOrDefault(x => x.Id == applicationUser.CompanyId);
                if (getCompany == null)
                {
                    return Ok(new { statusText = _statusTextService.ResourceNotFound });
                }

                getCompany.AdminEmail = userAccount.Company.AdminEmail;
                getCompany.AdminFullName = userAccount.Company.AdminFullName;
                getCompany.AdminPhoneNumber = userAccount.Company.AdminPhoneNumber;
                getCompany.CompanyAddress = userAccount.Company.CompanyAddress;
                getCompany.CompanyName = userAccount.Company.CompanyName;
                getCompany.CompanyEmail = userAccount.Company.CompanyEmail;
                getCompany.CompanyPhoneNumber = userAccount.Company.CompanyPhoneNumber;

                _context.Entry(getCompany).State = EntityState.Modified;

            }

            IdentityResult result = await UserManager.UpdateAsync(applicationUser);

            if (!result.Succeeded)
            {
                return Ok(new { statusText = result.Errors.First() });
            }
            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });

        }


        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetAllCompany")]
        public IHttpActionResult GetAllCompany()
        {
            List<Company> companies = _context.Companies.AsNoTracking().ToList();
            return Ok(new { companies, statusText = _statusTextService.Success });
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetCompany")]
        public IHttpActionResult GetCompany()
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

            Company company = _context.Companies.FirstOrDefault(x => x.Id == applicationUser.CompanyId);

            return Ok(new { company, statusText = _statusTextService.Success });
        }



        [HttpGet]
        [Route("api/GetCurrentUserAccount")]
        public IHttpActionResult GetCurrentUserAccount()
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

        
            UserAccount userAccount = _sharedService.GetUserAccount(applicationUser);
            

            return Ok(new { userAccount, statusText = _statusTextService.Success });
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetUserAccount/{userAccountId}")]
        public IHttpActionResult GetUserAccount(string userAccountId)
        {
           

       
            ApplicationUser applicationUser = UserManager.FindById(userAccountId);
            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }


            UserAccount userAccount = _sharedService.GetUserAccount(applicationUser);
            

            return Ok(new {  userAccount, statusText = _statusTextService.Success });
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetAllUserAccount")]
        public IHttpActionResult GetAllUserAccount()
        {
            Claim userNameClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);

            if (userNameClaim == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }

            ApplicationUser user = UserManager.FindByName(userNameClaim.Value);
            if (user == null)
            {
                return Ok(new { statusText = _statusTextService.UserClaimError });
            }


            List<UserAccount> userAccounts = new List<UserAccount>();
            List<ApplicationUser> applicationUsers = _context.Users
                .Where(x => x.CompanyId == user.CompanyId)
                .ToList();

            foreach (var applicationUser in applicationUsers)
            {
                foreach (var role in applicationUser.Roles)
                {
                    string roleName;

                    if (role.RoleId == "f11f2694-b80a-403b-81fa-3fc4f2f41c6e")
                    {
                        roleName = "Admin";
                    }
                    else if (role.RoleId == "5e4e0928-d8b5-4981-939e-39b46fa44834")
                    {
                        roleName = "HR";
                    }
                    else
                    {
                        roleName = "TeamMember";
                    }

                    Department department = new Department();
                    if (applicationUser.DepartmentId != null)
                    {
                         department = _context.Departments
                             .FirstOrDefault(x => x.Id == applicationUser.DepartmentId);
                    }

                    
                    UserAccount userAccount = new UserAccount()
                    {
                        Id = applicationUser.Id,
                        UserName = applicationUser.UserName,
                        FullName = applicationUser.FullName,
                        Email = applicationUser.Email,
                        PhoneNumber = applicationUser.PhoneNumber,
                        Password = "",
                        JoiningDateTime = applicationUser.JoiningDateTime,
                        RoleName = roleName,
                        CompanyId = applicationUser.CompanyId,
                        IsOwner = applicationUser.IsOwner,
                        Department = department
                    };
                    userAccounts.Add(userAccount);
                }
            }


            return Ok(new { userAccounts, statusText = _statusTextService.Success });

            
        }


        [HttpDelete]
        [Route("api/DeleteUserAccount/{userAccountId}")]
        [AllowAnonymous]
        public IHttpActionResult DeleteUserAccount(string userAccountId)
        {
            ApplicationUser applicationUser = _context.Users.FirstOrDefault(p => p.Id == userAccountId);
            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            _context.Users.Remove(applicationUser);
            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
                                  
            
        }

        [HttpPost]
        [Route("api/DeleteCompany")]
        [AllowAnonymous]
        public IHttpActionResult DeleteCompany(Company company)
        {
            Company getCompany = _context.Companies.FirstOrDefault(x => x.Id == company.Id);
            if (getCompany == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            
            _sharedService.OnDeleteCompany(getCompany);
            _context.Companies.Remove(getCompany);

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return Ok(new { statusText = _statusTextService.SomethingWentWrong });
            }

            return Ok(new { statusText = _statusTextService.Success });
        }

        [Route("api/ChangeProfilePassword")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> ChangeProfilePassword(ChangePassword changePassword)
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

         
            IdentityResult result = await UserManager.ChangePasswordAsync(applicationUser.Id, changePassword.OldPassword, changePassword.NewPassword);

            if (result.Succeeded)
            {
                return Ok(new { statusText = _statusTextService.Success });
            }

            return Ok(new { statusText = result.Errors.First() });
        }

        [HttpGet]
        [Route("api/GetAllRole")]
        [AllowAnonymous]
        public IHttpActionResult GetAllRole()
        {
            RoleStore<IdentityRole> roleStore = new RoleStore<IdentityRole>(_context);
            RoleManager<IdentityRole> roleManager = new RoleManager<IdentityRole>(roleStore);
            var roles = roleManager.Roles.Select(x => new { x.Id, x.Name }).ToList();
            roles.RemoveAt(0);
            return Ok(new { roles, statusText = _statusTextService.Success });
        }

        [HttpGet]
        [Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        [AllowAnonymous]
        public async Task<RedirectResult> ConfirmEmail(string userId, string code)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                return Redirect("http://localhost:4200/email-confirmation-link-expired");
            }

            ApplicationUser user = await UserManager.FindByIdAsync(userId);
            if (user == null)
            {
                return  Redirect("http://localhost:4200/email-confirmation-link-expired");
            }

            IdentityResult result = await UserManager.ConfirmEmailAsync(userId, code);

            if (result.Succeeded)
            {
                return Redirect("http://localhost:4200/email-confirmed");
                
            }

            return Redirect("http://localhost:4200/email-confirmation-link-expired");
        }



        [HttpPost]
        [Route("api/ForgotPassword")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> ForgotPassword(ChangePassword changePassword)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByEmailAsync(changePassword.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    return Ok(new { statusText = _statusTextService.UserDoesNotExist });
                }

                try
                {
                  
                    string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                    Uri callbackUrl = new Uri(Url.Link("ResetPasswordMiddleWareRoute", new { userId = user.Id, code = code }));

                    string s ="https://www.google.com/";

                    string messageBody = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/Email Templates/PasswordResetLink.html"));

                    string body = string.Empty;

                    using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Email Templates/PasswordResetLink.html")))
                    {
                        body = reader.ReadToEnd();
                    }


                    messageBody.Replace("{callbackUrl}", callbackUrl.ToString());
                    messageBody.Replace("{userName}", "Soi");

                    await UserManager.SendEmailAsync(user.Id, "Reset Password", messageBody);

                  
                    return Ok(new { statusText = _statusTextService.Success });
                }
                catch (Exception ex)
                {
                    return Ok(new {statusText = _statusTextService.SomethingWentWrong});
                }

            }

            return Ok(new { statusText = _statusTextService.SomethingWentWrong });
        }


        [HttpGet]
        [Route("ResetPasswordMiddleWare", Name = "ResetPasswordMiddleWareRoute")]
        [AllowAnonymous]
        public async Task<RedirectResult> ResetPasswordMiddleWare(string userId, string code)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                return Redirect("http://localhost:4200/password-reset-link-expired");
            }

            ApplicationUser applicationUser = await UserManager.FindByIdAsync(userId);
            if (applicationUser == null)
            {
                return Redirect("http://localhost:4200/password-reset-link-expired");
            }

         
            userId = Convert.ToBase64String(Encoding.UTF8.GetBytes(userId));

            code = EncryptionService.Encrypt(code);
            code = Convert.ToBase64String(Encoding.UTF8.GetBytes(code));

            return Redirect($"http://localhost:4200/reset-password/{userId}/{code}");
        }

        [HttpPost]
        [Route("api/ResetPassword")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> ResetPassword(ChangePassword changePassword)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { statusText = _statusTextService.SomethingWentWrong });
            }

            changePassword.UserId = Encoding.UTF8.GetString(Convert.FromBase64String(changePassword.UserId));
            ApplicationUser applicationUser = await UserManager.FindByIdAsync(changePassword.UserId);

            if (applicationUser == null)
            {
                return Ok(new { statusText = _statusTextService.SomethingWentWrong });
            }

            changePassword.Code = Encoding.UTF8.GetString(Convert.FromBase64String(changePassword.Code));
            changePassword.Code = EncryptionService.Decrypt(changePassword.Code);

            IdentityResult result = await UserManager
                .ResetPasswordAsync(changePassword.UserId, changePassword.Code, changePassword.NewPassword);

            if (result.Succeeded)
            {
                return Ok(new { statusText = _statusTextService.Success });
            }

            return Ok(new { statusText = _statusTextService.SomethingWentWrong });
        }
        // POST api/Account/RegisterExternal
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var info = await Authentication.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return InternalServerError();
            }

            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };

            IdentityResult result = await UserManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            result = await UserManager.AddLoginAsync(user.Id, info.Login);
            if (!result.Succeeded)
            {
                return GetErrorResult(result); 
            }
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }
        [Route("user/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            //Only SuperAdmin or Admin can delete users (Later when implement roles)
            var user = await this.UserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok();
            }

            return NotFound();

        }
        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
    }
}
