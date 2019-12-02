using System.Collections.Generic;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Settings;
using FitFinderBackEnd.Services;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<FitFinderBackEnd.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context)
        {
           //SettingsService settingsService = new SettingsService();


            //settingsService.GenerateDefaultWorkflow(null);
            //settingsService.GenerateDefaultWorkflow(1);

            //settingsService.GenerateDefaultDepartment(1);
            //settingsService.GenerateDefaultSources(1);
            //settingsService.GenerateDefaulJobTypes(1);
            //settingsService.GenerateDefaultJobFunction(1);
            //settingsService.GenerateDefaultWithdrawnReasons(1);
            //settingsService.GenerateDefaultRejectedReasons(1);

            //context.SaveChanges();

            //context.Roles.AddOrUpdate(x => x.Id,
            //     new IdentityRole { Name = "Admin" },
            //     new IdentityRole { Name = "HR" },
            //     new IdentityRole { Name = "TeamMember" }
            // );

            //context.Companies.AddOrUpdate(x => x.Id, new Company
            //{
            //    CompanyName = "Headblocks",
            //    CompanyAddress = "29, Narinda road, Dhaka",
            //    CompanyEmail = "info@headblocks.com",
            //    CompanyPhoneNumber = "0191919191",
            //    AdminFullName = "Md. Asif Atick",
            //    AdminUserName = "Foobar",
            //    AdminPhoneNumber = "0101010100",
            //    AdminEmail = "info@headblocks.com",
            //    JoiningDateTime = "11:27 am, 19-June-2019"
            //});



            //long companyId = context.Companies.FirstOrDefault(x => x.CompanyName == "Headblocks").Id;

            //UserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(context);
            //UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(userStore);
            //ApplicationUser applicationUser = new ApplicationUser
            //{
            //    UserName = "Foobar",
            //    FullName = "Md. Asif Atick",
            //    Email = "sanjidulhauq@gmail.com",
            //    PhoneNumber = "01966168250",
            //    JoiningDateTime = "03:03:52 AM, 14-Jun-2019",
            //    IsOwner = true,
            //    CompanyId = companyId
            //};

            //userManager.Create(applicationUser, "123456");

            //string applicationUserId = userManager.FindByName("Foobar").Id;
            //userManager.AddToRole(applicationUserId, "Admin");
        }
    }
}
