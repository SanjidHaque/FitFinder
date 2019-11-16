namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class turningOffCascadeDelete : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CandidateAttachments", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateEducations", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateExperiences", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.JobAssigneds", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CriteriaScores", "JobAssignedId", "dbo.JobAssigneds");
            DropForeignKey("dbo.JobAssigneds", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.StageComments", "JobAssignedId", "dbo.JobAssigneds");
            DropForeignKey("dbo.StageScores", "JobAssignedId", "dbo.JobAssigneds");
            DropForeignKey("dbo.JobAttachments", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.Departments", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.JobFunctions", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.JobTypes", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.PipelineStages", "PipelineId", "dbo.Pipelines");
            DropForeignKey("dbo.PipelineStageCriterias", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.CandidatesForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.InterviewersForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            AddForeignKey("dbo.CandidateAttachments", "CandidateId", "dbo.Candidates", "Id");
            AddForeignKey("dbo.CandidateEducations", "CandidateId", "dbo.Candidates", "Id");
            AddForeignKey("dbo.CandidateExperiences", "CandidateId", "dbo.Candidates", "Id");
            AddForeignKey("dbo.JobAssigneds", "CandidateId", "dbo.Candidates", "Id");
            AddForeignKey("dbo.CriteriaScores", "JobAssignedId", "dbo.JobAssigneds", "Id");
            AddForeignKey("dbo.JobAssigneds", "JobId", "dbo.Jobs", "Id");
            AddForeignKey("dbo.StageComments", "JobAssignedId", "dbo.JobAssigneds", "Id");
            AddForeignKey("dbo.StageScores", "JobAssignedId", "dbo.JobAssigneds", "Id");
            AddForeignKey("dbo.JobAttachments", "JobId", "dbo.Jobs", "Id");
            AddForeignKey("dbo.Departments", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.JobFunctions", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.JobTypes", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.PipelineStages", "PipelineId", "dbo.Pipelines", "Id");
            AddForeignKey("dbo.PipelineStageCriterias", "PipelineStageId", "dbo.PipelineStages", "Id");
            AddForeignKey("dbo.CandidatesForInterviews", "InterviewId", "dbo.Interviews", "Id");
            AddForeignKey("dbo.InterviewersForInterviews", "InterviewId", "dbo.Interviews", "Id");
            AddForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles", "Id");
            AddForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.InterviewersForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.CandidatesForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.PipelineStageCriterias", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.PipelineStages", "PipelineId", "dbo.Pipelines");
            DropForeignKey("dbo.JobTypes", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.JobFunctions", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Departments", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.JobAttachments", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.StageScores", "JobAssignedId", "dbo.JobAssigneds");
            DropForeignKey("dbo.StageComments", "JobAssignedId", "dbo.JobAssigneds");
            DropForeignKey("dbo.JobAssigneds", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.CriteriaScores", "JobAssignedId", "dbo.JobAssigneds");
            DropForeignKey("dbo.JobAssigneds", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateExperiences", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateEducations", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateAttachments", "CandidateId", "dbo.Candidates");
            AddForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles", "Id", cascadeDelete: true);
            AddForeignKey("dbo.InterviewersForInterviews", "InterviewId", "dbo.Interviews", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CandidatesForInterviews", "InterviewId", "dbo.Interviews", "Id", cascadeDelete: true);
            AddForeignKey("dbo.PipelineStageCriterias", "PipelineStageId", "dbo.PipelineStages", "Id", cascadeDelete: true);
            AddForeignKey("dbo.PipelineStages", "PipelineId", "dbo.Pipelines", "Id", cascadeDelete: true);
            AddForeignKey("dbo.JobTypes", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.JobFunctions", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Departments", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.JobAttachments", "JobId", "dbo.Jobs", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StageScores", "JobAssignedId", "dbo.JobAssigneds", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StageComments", "JobAssignedId", "dbo.JobAssigneds", "Id", cascadeDelete: true);
            AddForeignKey("dbo.JobAssigneds", "JobId", "dbo.Jobs", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CriteriaScores", "JobAssignedId", "dbo.JobAssigneds", "Id", cascadeDelete: true);
            AddForeignKey("dbo.JobAssigneds", "CandidateId", "dbo.Candidates", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CandidateExperiences", "CandidateId", "dbo.Candidates", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CandidateEducations", "CandidateId", "dbo.Candidates", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CandidateAttachments", "CandidateId", "dbo.Candidates", "Id", cascadeDelete: true);
        }
    }
}
