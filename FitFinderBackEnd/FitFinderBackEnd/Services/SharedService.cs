using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Razor.Parser.SyntaxTree;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Interview;
using FitFinderBackEnd.Models.Job;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Services
{
    public class SharedService
    {
        private readonly ApplicationDbContext _context;
        private SettingsService _settingsService;

        public SharedService()
        {
            _context = new ApplicationDbContext();
            _settingsService = new SettingsService();
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
            List<CriteriaScore> criteriaScores = new List<CriteriaScore>();

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



        public void OnDeleteAttachment(List<string> modifiedFileNames)
        {
            modifiedFileNames.ForEach(modifiedFileName =>
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + modifiedFileName);
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

        public Candidate GetCandidate(long candidateId)
        {
            Candidate candidate = _context.Candidates.FirstOrDefault(x => x.Id == candidateId);

            if (candidate != null)
            {
               Source source = _context.Sources.FirstOrDefault(s => s.Id == candidate.SourceId);

               List<CandidateAttachment> candidateAttachments = _context.CandidateAttachments
                .Where(z => z.CandidateId == candidateId)
                .ToList();
            }

            return candidate;
        }


        public dynamic OnAddNewCompany(Company company)
        {
            _context.Companies.Add(company);
            _context.SaveChanges();

            _settingsService.GenerateDefaultWorkflow(company.Id);

            long departmentId = _settingsService.GenerateDefaultDepartment(company.Id);
            _settingsService.GenerateDefaultSources(company.Id);
            _settingsService.GenerateDefaulJobTypes(company.Id);
            _settingsService.GenerateDefaultJobFunction(company.Id);
            _settingsService.GenerateDefaultWithdrawnReasons(company.Id);
            _settingsService.GenerateDefaultWithdrawnReasons(company.Id);

            return (new { companyId = company.Id, departmentId });
        }

        public void OnDeleteCompany(Company company)
        {
            List<Source> sources = _context.Sources
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<Department> departments = _context.Departments
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<JobType> jobTypes = _context.JobTypes
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<JobFunction> jobFunctions = _context.JobFunctions
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<WithdrawnReason> withdrawnReasons = _context.WithdrawnReasons
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<RejectedReason> rejectedReasons = _context.RejectedReasons
                .Where(x => x.CompanyId == company.Id)
                .ToList();


            List<Workflow> workflows = _context.Workflows
                    .Where(x => x.CompanyId == company.Id)
                    .ToList();

            List<Candidate> candidates = _context.Candidates
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<Interview> interviews = _context.Interviews
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<Job> jobs = _context.Jobs
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            List<ApplicationUser> applicationUsers = _context.Users
                .Where(x => x.CompanyId == company.Id)
                .ToList();

            applicationUsers.ForEach(x => { _context.Users.Remove(x); });

            _context.Sources.RemoveRange(sources);
            _context.Departments.RemoveRange(departments);
            _context.JobFunctions.RemoveRange(jobFunctions);
            _context.JobTypes.RemoveRange(jobTypes);
            _context.Workflows.RemoveRange(workflows);
            _context.RejectedReasons.RemoveRange(rejectedReasons);
            _context.WithdrawnReasons.RemoveRange(withdrawnReasons);
            _context.Candidates.RemoveRange(candidates);
            _context.Jobs.RemoveRange(jobs);
            _context.Interviews.RemoveRange(interviews);
            _context.SaveChanges();
        }
    }
}