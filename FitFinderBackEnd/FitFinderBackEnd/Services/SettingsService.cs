using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Services
{
    public class SettingsService
    {
        private readonly ApplicationDbContext _context;
        public SettingsService()
        {
            _context = new ApplicationDbContext();
        }

        public void GenerateDefaultWorkflow(long? companyId)
        {

            Workflow workflow = new Workflow
            {
                CompanyId = companyId,
                Name = "Default",
                Pipelines = new List<Pipeline>()
                    {
                        new Pipeline
                        {
                            Name = "NEW",
                            PipelineStages = new List<PipelineStage>() {
                                new PipelineStage
                                {
                                    Name = "New",
                                    Color = "#ff6600",
                                    PipelineStageCriteria = new List<PipelineStageCriterion>()
                                } }
                        },
                        new Pipeline
                        {
                            Name = "INREVIEW",
                            PipelineStages = new List<PipelineStage>() {
                                    new PipelineStage
                                    {
                                        Name = "In Review",
                                        Color = "#498BC5",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    } }
                        },
                        new Pipeline
                        {
                            Name = "INTERVIEW",
                            PipelineStages = new List<PipelineStage>() {
                                    new PipelineStage
                                    {
                                        Name = "Interview",
                                        Color = "#00ccff",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    },
                                    new PipelineStage
                                    {
                                        Name = "Viva",
                                        Color = "#66cc99",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    } }
                        },
                        new Pipeline
                        {
                            Name = "OFFERED",
                            PipelineStages = new List<PipelineStage>() {
                                    new PipelineStage
                                    {
                                        Name = "Offered",
                                        Color = "#6666ff",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    } }
                        },
                        new Pipeline
                        {
                            Name = "ONHOLD",
                            PipelineStages = new List<PipelineStage>() {
                                    new PipelineStage
                                    {
                                        Name = "On Hold",
                                        Color = "#663300",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    } }
                        },
                        new Pipeline
                        {
                            Name = "HIRED",
                            PipelineStages = new List<PipelineStage>() {
                                    new PipelineStage
                                    {
                                        Name = "Hired",
                                        Color = "#58CCB7",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    } }
                        },
                        new Pipeline
                        {
                            Name = "REJECTED",
                            PipelineStages = new List<PipelineStage>() {
                                    new PipelineStage
                                    {
                                        Name = "Rejected",
                                        Color = "#ff0000",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    },
                                    new PipelineStage
                                    {
                                        Name = "Withdrawn",
                                        Color = "#AAA",
                                        PipelineStageCriteria = new List<PipelineStageCriterion>()
                                    } }
                        } }
            };

            _context.Workflows.Add(workflow);
        }

        public long GenerateDefaultDepartment(long companyId)
        {
            Department department = new Department
            {
                CompanyId = companyId,
                Name = "Development"
            };
            _context.Departments.Add(department);
            _context.SaveChanges();
            return department.Id;
        }

        public void GenerateDefaultSources(long companyId)
        {
            List<Source> sources = new List<Source>
            {
                new Source()
                {
                    CompanyId = companyId,
                    Name = "Bdjobs.com"
                },
                new Source()
                {
                    CompanyId = companyId,
                    Name = "LinkedIn"
                },
                new Source()
                {
                    CompanyId = companyId,
                    Name = "Facebook"
                }
            };

            _context.Sources.AddRange(sources);
            
           
        }   

        public void GenerateDefaulJobTypes(long companyId)
        {

            List<JobType> jobTypes = new List<JobType>
            {
                new JobType()
                {
                    CompanyId = companyId,
                    Name = "Full-Time"
                },
                new JobType()
                {
                    CompanyId = companyId,
                    Name = "Part-Time"
                },
                new JobType()
                {
                    CompanyId = companyId,
                    Name = "Intern"
                }
            };
           
            _context.JobTypes.AddRange(jobTypes);
          
            
        }

        public void GenerateDefaultJobFunction(long companyId)
        {

            List<JobFunction> jobFunctions = new List<JobFunction>
            {
                new JobFunction()
                {
                    CompanyId = companyId,
                    Name = "Development"
                },
                new JobFunction()
                {
                    CompanyId = companyId,
                    Name = "Human Resource"
                },
                new JobFunction()
                {
                    CompanyId = companyId,
                    Name = "Account"
                }
            };
          
            _context.JobFunctions.AddRange(jobFunctions);
            
            
        }

        public void GenerateDefaultWithdrawnReasons(long companyId)
        {
           
            List<WithdrawnReason> withdrawnReasons = new List<WithdrawnReason>
            {
                new WithdrawnReason()
                {
                    CompanyId = companyId,
                    Name = "Withdrew to accept another job"
                },
                new WithdrawnReason()
                {
                    CompanyId = companyId,
                    Name = "Declined the position when offered"
                },
                new WithdrawnReason()
                {
                    CompanyId = companyId,
                    Name = "Not available for interview"
                }
            };

            _context.WithdrawnReasons.AddRange(withdrawnReasons);
            _context.SaveChanges();
        }

        public void GenerateDefaultRejectedReasons(long companyId)
        {
           List<RejectedReason> rejectedReasons = new List<RejectedReason>
           {
               new RejectedReason()
               {
                   CompanyId = companyId,
                   Name = "Does not have minimum qualifications"
               },
               new RejectedReason()
               {
                   CompanyId = companyId,
                   Name = "Reference check unsatisfactory"
               }
           };
            _context.RejectedReasons.AddRange(rejectedReasons);
           
          
        }

      
    }
}