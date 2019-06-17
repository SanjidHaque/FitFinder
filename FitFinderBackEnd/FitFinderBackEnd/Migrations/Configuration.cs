using System.Collections.Generic;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Settings;
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

        protected override void Seed(FitFinderBackEnd.Models.ApplicationDbContext context)
        {
            //            context.Pipelines.AddOrUpdate( x => x.Id, 
            //                new Pipeline {
            //                Name = "NEW",
            //                PipelineStage = new List<PipelineStage>() {
            //                    new PipelineStage
            //                    {
            //                        Name = "New",
            //                        Color = "#ff6600",
            //                        PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                    } }
            //                },
            //                new Pipeline
            //                {
            //                    Name = "INREVIEW",
            //                    PipelineStage = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "In Review",
            //                            Color = "#498BC5",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        } }
            //                },
            //                new Pipeline
            //                {
            //                    Name = "INTERVIEW",
            //                    PipelineStage = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Interview",
            //                            Color = "#00ccff",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        },
            //                        new PipelineStage
            //                        {
            //                            Name = "Viva",
            //                            Color = "#66cc99",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        }
            //
            //                    }
            //                },
            //                new Pipeline
            //                {
            //                    Name = "OFFERED",
            //                    PipelineStage = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Offered",
            //                            Color = "#6666ff",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        } }
            //                },
            //                new Pipeline
            //                {
            //                    Name = "ONHOLD",
            //                    PipelineStage = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "On Hold",
            //                            Color = "#663300",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        } }
            //                },
            //                new Pipeline
            //                {
            //                    Name = "HIRED",
            //                    PipelineStage = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Hired",
            //                            Color = "#58CCB7",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        } }
            //                },
            //                new Pipeline
            //                {
            //                    Name = "REJECTED",
            //                    PipelineStage = new List<PipelineStage>() {
            //                        new PipelineStage
            //                        {
            //                            Name = "Rejected",
            //                            Color = "#ff0000",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        },
            //                        new PipelineStage
            //                        {
            //                            Name = "Withdrawn",
            //                            Color = "#AAA",
            //                            PipelineStageCriteria = new List<PipelineStageCriteria>()
            //                        }
            //
            //                    }
            //                }
            //
            //            );

            //context.Roles.AddOrUpdate( x => x.Id,
            //     new IdentityRole { Name = "Admin" },
            //     new IdentityRole { Name = "HR" },
            //     new IdentityRole { Name = "Team member" }
            // );

//            context.Companies.AddOrUpdate(x => x.Id, new Company
//            {
//                Name = "Headblocks",
//                Address = "29, Narinda road, Dhaka",
//                Email = "info@headblocks.com",
//                PhoneNumber = "0191919191"
//            });
//
//            context.SaveChanges();
//            long companyId = context.Companies.FirstOrDefault(x => x.Name == "Headblocks").Id;
//
//            UserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(context);
//            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(userStore);
//            ApplicationUser applicationUser = new ApplicationUser
//             {
//                 UserName = "Sanjid",
//                 FullName = "Sk. Sanjidul Haque",
//                 Email = "sanjidulhauq@gmail.com",
//                 PhoneNumber = "01966168250",
//                 JoiningDateTime = "03:03:52 AM, 14-Jun-2019",
//                 IsOwner = true,
//                 CompanyId = companyId
//            };
//
//            userManager.Create(applicationUser, "123456");
//
//            string applicationUserId = userManager.FindByName("Sanjid").Id;
//            userManager.AddToRole(applicationUserId, "HR");

        }   
    }
}
