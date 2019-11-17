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

        public void GenerateDefaultWorkflow(long companyId)
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
                            PipelineStage = new List<PipelineStage>() {
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
                            PipelineStage = new List<PipelineStage>() {
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
                            PipelineStage = new List<PipelineStage>() {
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
                            PipelineStage = new List<PipelineStage>() {
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
                            PipelineStage = new List<PipelineStage>() {
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
                            PipelineStage = new List<PipelineStage>() {
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
                            PipelineStage = new List<PipelineStage>() {
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