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

            // context.Departments.AddOrUpdate(
            //     new Department()
            //     {
            //         CompanyId = 1,
            //         Name = "Development"
            //     },
            //     new Department()
            //     {
            //         CompanyId = 1,
            //         Name = "Accounts"
            //     },
            //     new Department()
            //     {
            //         CompanyId = 1,
            //         Name = "Human Resource"
            //     }
            //);


            //context.Sources.AddOrUpdate(
            //    new Source()
            //    {
            //        CompanyId = 1,
            //        Name = "Bdjobs.com"
            //    },
            //    new Source()
            //    {
            //        CompanyId = 1,
            //        Name = "LinkedIn"
            //    },
            //    new Source()
            //    {
            //        CompanyId = 1,
            //        Name = "Facebook"
            //    }
            // );


            //context.JobTypes.AddOrUpdate(
            //    new JobType()
            //    {
            //        CompanyId = 1,
            //        Name = "Full-Time"
            //    },
            //    new JobType()
            //    {
            //        CompanyId = 1,
            //        Name = "Part-Time"
            //    },
            //    new JobType()
            //    {
            //        CompanyId = 1,
            //        Name = "Intern"
            //    }
            // );


            //context.JobFunctions.AddOrUpdate(
            //    new JobFunction()
            //    {
            //        CompanyId = 1,
            //        Name = "Development"
            //    },
            //    new JobFunction()
            //    {
            //        CompanyId = 1,
            //        Name = "Human Resource"
            //    },
            //    new JobFunction()
            //    {
            //        CompanyId = 1,
            //        Name = "Account"
            //    }
            //  );


            //context.RejectedReasons.AddOrUpdate(new RejectedReason()
            //    {
            //        CompanyId = 1,
            //        Name = "Does not have minimum qualifications"
            //    },
            //    new RejectedReason()
            //    {
            //        CompanyId = 1,
            //        Name = "Reference check unsatisfactory"
            //    },
            //    new RejectedReason()
            //    {
            //        CompanyId = 1,
            //        Name = "Poor resume format"
            //    }
            // );


            //context.WithdrawnReasons.AddOrUpdate(new WithdrawnReason()
            //    {
            //        CompanyId = 1,
            //        Name = "Withdrew to accept another job"
            //    },
            //    new WithdrawnReason()
            //    {
            //        CompanyId = 1,
            //        Name = "Declined the position when offered"
            //    },
            //    new WithdrawnReason()
            //    {
            //        CompanyId = 1,
            //        Name = "Not available for interview"
            //    }
            // );





            //context.Workflows.AddOrUpdate(x => x.Id, new Workflow
            //{
            //    CompanyId = null,
            //    Name = "Default",
            //    Pipelines = new List<Pipeline>()
            //        {
            //            new Pipeline
            //            {
            //                Name = "NEW",
            //                PipelineStages = new List<PipelineStage>() {
            //                    new PipelineStage
            //                    {
            //                        Name = "New",
            //                        Color = "#ff6600",
            //                        PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                    } }
            //            },
            //            new Pipeline
            //            {
            //                Name = "INREVIEW",
            //                PipelineStages = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "In Review",
            //                            Color = "#498BC5",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        } }
            //            },
            //            new Pipeline
            //            {
            //                Name = "INTERVIEW",
            //                PipelineStages = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Interview",
            //                            Color = "#00ccff",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        },
            //                        new PipelineStage
            //                        {
            //                            Name = "Viva",
            //                            Color = "#66cc99",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        } }
            //            },
            //            new Pipeline
            //            {
            //                Name = "OFFERED",
            //                PipelineStages = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Offered",
            //                            Color = "#6666ff",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        } }
            //            },
            //            new Pipeline
            //            {
            //                Name = "ONHOLD",
            //                PipelineStages = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "On Hold",
            //                            Color = "#663300",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        } }
            //            },
            //            new Pipeline
            //            {
            //                Name = "HIRED",
            //                PipelineStages = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Hired",
            //                            Color = "#58CCB7",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        } }
            //            },
            //            new Pipeline
            //            {
            //                Name = "REJECTED",
            //                PipelineStages = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Rejected",
            //                            Color = "#ff0000",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        },
            //                        new PipelineStage
            //                        {
            //                            Name = "Withdrawn",
            //                            Color = "#AAA",
            //                            PipelineStageCriteria = new List<PipelineStageCriterion>()
            //                        } }
            //            } }
            //});



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
            //    JoiningDateTime = "03:03:52 AM, 16-Apr-2020",
            //    IsOwner = true,
            //    CompanyId = companyId
            //};

            //userManager.Create(applicationUser, "123456");

            //string applicationUserId = userManager.FindByName("Foobar").Id;
            //userManager.AddToRole(applicationUserId, "Admin");




           //  context.SaveChanges();
        }
    }
}
