using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Razor.Parser.SyntaxTree;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Job;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Services
{
    public class SharedService
    {
        private readonly ApplicationDbContext _context;

        public SharedService()
        {
            _context = new ApplicationDbContext();
        }

        public JobAssignment OnAddJobAssignment(JobAssignment jobAssignment)
        {
            Job job = _context.Jobs.FirstOrDefault(x => x.Id == jobAssignment.JobId);

            if (job == null)
            {
                return null;
            }

            Workflow workflow = _context.Workflows.FirstOrDefault(x => x.Id == job.WorkflowId);

            if (workflow == null)
            {
                return null;
            }

            List<Pipeline> pipelines = _context.Pipelines
                .Where(x => x.WorkflowId == workflow.Id)
                .ToList();

            List<PipelineStage> pipelineStages = _context.PipelineStages
                .Where(x => x.Pipeline.WorkflowId == workflow.Id)
                .ToList();

            List<PipelineStageCriterion> pipelineStageCriteria = _context.PipelineStageCriteria
                .Where(x => x.PipelineStage.Pipeline.WorkflowId == workflow.Id
                            && (x.JobId == job.Id || x.JobId == null))
                .ToList();


            List<StageComment> stageComments = new List<StageComment>();
            List<StageScore> stageScores = new List<StageScore>();
            List<CriteriaScore> criteriaScores= new List<CriteriaScore>();

            StageComment stageComment = new StageComment
            {
                PipelineStageId = pipelines[0].PipelineStages[0].Id,
                CandidateId = jobAssignment.CandidateId,
                Comment = "Created from"
            };

            stageComments.Add(stageComment);

            pipelineStages.ForEach(x =>
            {
                StageScore stageScore = new StageScore
                {
                    PipelineStageId = x.Id,
                    CandidateId = jobAssignment.CandidateId,
                    Rating = 0
                };

                stageScores.Add(stageScore);
            });

            pipelineStageCriteria.ForEach(x =>
            {
                CriteriaScore criteriaScore = new CriteriaScore    
                {
                    PipelineStageId = x.PipelineStageId,
                    PipelineStageCriterionId = x.Id,
                    CandidateId = jobAssignment.CandidateId,
                    Rating = 0
                };

                criteriaScores.Add(criteriaScore);
            });

            jobAssignment.CurrentStageId = pipelines[0].PipelineStages[0].Id;
            jobAssignment.StageComments = stageComments;
            jobAssignment.StageScores = stageScores;
            jobAssignment.CriteriaScores = criteriaScores;
            jobAssignment.Job = job;

            return jobAssignment;
        }

        

        public void OnDeleteAttachment(List<string> fileNames)        
        {
            fileNames.ForEach(fileName =>
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + fileName);
                if (File.Exists(filePath))
                {
                    try
                    {
                        File.Delete(filePath);
                    }
                    catch (Exception)
                    {
                        // ignored
                    }
                }
            }); 

        }


        public void DeleteCandidateAttachment(List<CandidateAttachment> candidateAttachments)
        {
            if (candidateAttachments != null)
            {
                List<string> fileNames = new List<string>();
                candidateAttachments.ForEach(fileName =>
                {
                    fileNames.Add(fileName.ModifiedFileName);
                });
                OnDeleteAttachment(fileNames);
            }
        }


        public void DeleteJobAttachment(List<JobAttachment> jobAttachments)
        {
            if (jobAttachments != null)
            {
                List<string> fileNames = new List<string>();
                jobAttachments.ForEach(fileName =>
                {
                    fileNames.Add(fileName.ModifiedFileName);
                });
                OnDeleteAttachment(fileNames);
            }
        }

        public UserAccount GetUserAccount(ApplicationUser applicationUser)
        {
            string roleName = "";

            foreach (var role in applicationUser.Roles)
            {
                if (role.RoleId == "9e024189-563d-4e68-8c0d-7d34a9981f00")
                {
                    roleName = "Admin";
                }
                else if (role.RoleId == "db8afd11-64a3-41e3-9005-0cd72ab76d9b")
                {
                    roleName = "HR";
                }
                else
                {
                    roleName = "Teammate";
                }
            }

            Department department = new Department();
            if (applicationUser.DepartmentId != null)
            {
                department =
                    _context.Departments.FirstOrDefault(x => x.Id == applicationUser.DepartmentId);
            }

            UserAccount userAccount = new UserAccount
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
                DepartmentId = applicationUser.DepartmentId,
                IsOwner = applicationUser.IsOwner,
                Department = department
            };

            return userAccount;
        }

    }
}