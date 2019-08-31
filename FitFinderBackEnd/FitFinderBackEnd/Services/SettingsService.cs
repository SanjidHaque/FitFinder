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

        public void GenerateDefaultPipelines(long companyId)
        {

            List<Pipeline> pipelines = new List<Pipeline>();

            Pipeline newPipeline = new Pipeline
            {
                Name = "NEW",
                CompanyId = companyId,
                PipelineStage = new List<PipelineStage>()
                {
                    new PipelineStage
                    {
                        Name = "New",
                        Color = "#ff6600",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    }
                }
            };

            Pipeline inReviewPipeline = new Pipeline
            {
                Name = "INREVIEW",
                CompanyId = companyId,
                PipelineStage = new List<PipelineStage>() {
                    new PipelineStage
                    {
                        Name = "In Review",
                        Color = "#498BC5",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    } }
            };


            Pipeline interviewPipeline = new Pipeline
            {
                Name = "INTERVIEW",
                CompanyId = companyId,
                PipelineStage = new List<PipelineStage>() {
                    new PipelineStage
                    {
                        Name = "Interview",
                        Color = "#00ccff",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    },
                    new PipelineStage
                    {
                        Name = "Viva",
                        Color = "#66cc99",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    }

                }
            };


            Pipeline offeredPipeline = new Pipeline
            {
                Name = "OFFERED",
                CompanyId = companyId,
                PipelineStage = new List<PipelineStage>() {
                    new PipelineStage
                    {
                        Name = "Offered",
                        Color = "#6666ff",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    } }
            };


            Pipeline onHoldPipeline = new Pipeline
            {
                Name = "ONHOLD",
                CompanyId = companyId,
                PipelineStage = new List<PipelineStage>() {
                    new PipelineStage
                    {
                        Name = "On Hold",
                        Color = "#663300",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    } }
            };


            Pipeline hiredPipeline = new Pipeline
            {
                Name = "HIRED",
                CompanyId = companyId,
                PipelineStage = new List<PipelineStage>() {
                    new PipelineStage
                    {
                        Name = "Hired",
                        Color = "#58CCB7",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    } }
            };


            Pipeline rejectedPipeline = new Pipeline
            {
                Name = "REJECTED",
                CompanyId = companyId,
                PipelineStage = new List<PipelineStage>() {
                    new PipelineStage
                    {
                        Name = "Rejected",
                        Color = "#ff0000",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    },
                    new PipelineStage
                    {
                        Name = "Withdrawn",
                        Color = "#AAA",
                        PipelineStageCriteria = new List<PipelineStageCriteria>()
                    }

                }
            };

            pipelines.Add(newPipeline);
            pipelines.Add(inReviewPipeline);
            pipelines.Add(interviewPipeline);
            pipelines.Add(offeredPipeline);
            pipelines.Add(onHoldPipeline);
            pipelines.Add(hiredPipeline);
            pipelines.Add(rejectedPipeline);

            _context.Pipelines.AddRange(pipelines);
           //  _context.SaveChanges();
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
    }
}