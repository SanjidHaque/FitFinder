namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CandidateAttachments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        IsResume = c.Boolean(nullable: false),
                        FileName = c.String(),
                        ModifiedFileName = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .Index(t => t.CandidateId);
            
            CreateTable(
                "dbo.Candidates",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Mobile = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        State = c.String(),
                        Country = c.String(),
                        SourceId = c.Long(nullable: false),
                        FacebookUrl = c.String(),
                        LinkedInUrl = c.String(),
                        GitHubUrl = c.String(),
                        IsArchived = c.Boolean(nullable: false),
                        IsHired = c.Boolean(nullable: false),
                        IsClosed = c.Boolean(nullable: false),
                        ApplicationDate = c.String(),
                        IsFavourite = c.Boolean(nullable: false),
                        ImageName = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Sources", t => t.SourceId, cascadeDelete: true)
                .Index(t => t.SourceId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.CandidateEducations",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        Name = c.String(),
                        InstituteName = c.String(),
                        Result = c.String(),
                        StartDate = c.String(),
                        EndDate = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .Index(t => t.CandidateId);
            
            CreateTable(
                "dbo.CandidateExperiences",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        EmployerName = c.String(),
                        Designation = c.String(),
                        Role = c.String(),
                        StartDate = c.String(),
                        EndDate = c.String(),
                        IsCurrent = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .Index(t => t.CandidateId);
            
            CreateTable(
                "dbo.Companies",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CompanyName = c.String(),
                        CompanyAddress = c.String(),
                        CompanyEmail = c.String(),
                        CompanyPhoneNumber = c.String(),
                        AdminUserName = c.String(),
                        AdminFullName = c.String(),
                        AdminEmail = c.String(),
                        AdminPhoneNumber = c.String(),
                        JoiningDateTime = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        CompanyId = c.Long(),
                        FullName = c.String(),
                        JoiningDateTime = c.String(),
                        IsOwner = c.Boolean(nullable: false),
                        DepartmentId = c.Long(),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Departments", t => t.DepartmentId)
                .Index(t => t.CompanyId)
                .Index(t => t.DepartmentId)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Interviews",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Date = c.String(),
                        Location = c.String(),
                        StartTime = c.String(),
                        EndTime = c.String(),
                        InterviewType = c.String(),
                        IsArchived = c.Boolean(nullable: false),
                        HiringManagerName = c.String(),
                        ConfirmedCandidate = c.Long(),
                        DeclinedCandidate = c.Long(),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.CandidateForInterviews",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        InterviewId = c.Long(),
                        CandidateId = c.Long(nullable: false),
                        InterviewStatus = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .ForeignKey("dbo.Interviews", t => t.InterviewId)
                .Index(t => t.InterviewId)
                .Index(t => t.CandidateId);
            
            CreateTable(
                "dbo.InterviewerForInterviews",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        InterviewId = c.Long(),
                        UserAccountId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Interviews", t => t.InterviewId)
                .ForeignKey("dbo.UserAccounts", t => t.UserAccountId)
                .Index(t => t.InterviewId)
                .Index(t => t.UserAccountId);
            
            CreateTable(
                "dbo.UserAccounts",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        CompanyId = c.Long(),
                        UserName = c.String(),
                        FullName = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        PhoneNumber = c.String(),
                        JoiningDateTime = c.String(),
                        RoleName = c.String(),
                        DepartmentId = c.Long(),
                        IsOwner = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Departments", t => t.DepartmentId)
                .Index(t => t.CompanyId)
                .Index(t => t.DepartmentId);
            
            CreateTable(
                "dbo.JobFunctions",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.Jobs",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Title = c.String(),
                        Code = c.String(),
                        Description = c.String(),
                        ImmediateSkills = c.String(),
                        IntermediateSkills = c.String(),
                        GoodToHaveSkills = c.String(),
                        Location = c.String(),
                        DepartmentId = c.Long(),
                        JobFunctionId = c.Long(),
                        JobTypeId = c.Long(),
                        Positions = c.Long(),
                        ClosingDate = c.String(),
                        ExperienceStarts = c.Long(),
                        ExperienceEnds = c.Long(),
                        SalaryStarts = c.Long(),
                        SalaryEnds = c.Long(),
                        IsArchived = c.Boolean(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        PostingDate = c.String(),
                        IsFavourite = c.Boolean(nullable: false),
                        CompanyId = c.Long(),
                        WorkflowId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .ForeignKey("dbo.Departments", t => t.DepartmentId)
                .ForeignKey("dbo.JobFunctions", t => t.JobFunctionId)
                .ForeignKey("dbo.JobTypes", t => t.JobTypeId)
                .ForeignKey("dbo.Workflows", t => t.WorkflowId, cascadeDelete: true)
                .Index(t => t.DepartmentId)
                .Index(t => t.JobFunctionId)
                .Index(t => t.JobTypeId)
                .Index(t => t.CompanyId)
                .Index(t => t.WorkflowId);
            
            CreateTable(
                "dbo.JobAttachments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        JobId = c.Long(nullable: false),
                        FileName = c.String(),
                        ModifiedFileName = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Jobs", t => t.JobId, cascadeDelete: true)
                .Index(t => t.JobId);
            
            CreateTable(
                "dbo.JobTypes",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.Workflows",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.Pipelines",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        WorkflowId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Workflows", t => t.WorkflowId, cascadeDelete: true)
                .Index(t => t.WorkflowId);
            
            CreateTable(
                "dbo.PipelineStages",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Color = c.String(),
                        PipelineId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Pipelines", t => t.PipelineId, cascadeDelete: true)
                .Index(t => t.PipelineId);
            
            CreateTable(
                "dbo.PipelineStageCriterions",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        PipelineStageId = c.Long(nullable: false),
                        JobId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Jobs", t => t.JobId)
                .ForeignKey("dbo.PipelineStages", t => t.PipelineStageId, cascadeDelete: true)
                .Index(t => t.PipelineStageId)
                .Index(t => t.JobId);
            
            CreateTable(
                "dbo.RejectedReasons",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.Sources",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.WithdrawnReasons",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.CompanyId)
                .Index(t => t.CompanyId);
            
            CreateTable(
                "dbo.JobAssignments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        JobId = c.Long(),
                        CurrentStageId = c.Long(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .ForeignKey("dbo.Jobs", t => t.JobId)
                .Index(t => t.CandidateId)
                .Index(t => t.JobId);
            
            CreateTable(
                "dbo.PipelineStageCriterionScores",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        JobAssignmentId = c.Long(),
                        PipelineStageId = c.Long(),
                        CandidateId = c.Long(nullable: false),
                        Rating = c.Long(nullable: false),
                        PipelineStageCriterionId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .ForeignKey("dbo.JobAssignments", t => t.JobAssignmentId)
                .ForeignKey("dbo.PipelineStages", t => t.PipelineStageId)
                .ForeignKey("dbo.PipelineStageCriterions", t => t.PipelineStageCriterionId)
                .Index(t => t.JobAssignmentId)
                .Index(t => t.PipelineStageId)
                .Index(t => t.CandidateId)
                .Index(t => t.PipelineStageCriterionId);
            
            CreateTable(
                "dbo.PipelineStageComments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Comment = c.String(),
                        StageScoreId = c.Long(),
                        PipelineStageScore_Id = c.Long(),
                        JobAssignment_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PipelineStageScores", t => t.PipelineStageScore_Id)
                .ForeignKey("dbo.JobAssignments", t => t.JobAssignment_Id)
                .Index(t => t.PipelineStageScore_Id)
                .Index(t => t.JobAssignment_Id);
            
            CreateTable(
                "dbo.PipelineStageScores",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        JobAssignmentId = c.Long(),
                        PipelineStageId = c.Long(),
                        CandidateId = c.Long(nullable: false),
                        Rating = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .ForeignKey("dbo.JobAssignments", t => t.JobAssignmentId)
                .ForeignKey("dbo.PipelineStages", t => t.PipelineStageId)
                .Index(t => t.JobAssignmentId)
                .Index(t => t.PipelineStageId)
                .Index(t => t.CandidateId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Candidates", "SourceId", "dbo.Sources");
            DropForeignKey("dbo.PipelineStageComments", "JobAssignment_Id", "dbo.JobAssignments");
            DropForeignKey("dbo.PipelineStageComments", "PipelineStageScore_Id", "dbo.PipelineStageScores");
            DropForeignKey("dbo.PipelineStageScores", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.PipelineStageScores", "JobAssignmentId", "dbo.JobAssignments");
            DropForeignKey("dbo.PipelineStageScores", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.JobAssignments", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.PipelineStageCriterionScores", "PipelineStageCriterionId", "dbo.PipelineStageCriterions");
            DropForeignKey("dbo.PipelineStageCriterionScores", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.PipelineStageCriterionScores", "JobAssignmentId", "dbo.JobAssignments");
            DropForeignKey("dbo.PipelineStageCriterionScores", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.JobAssignments", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.WithdrawnReasons", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Sources", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.RejectedReasons", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Jobs", "WorkflowId", "dbo.Workflows");
            DropForeignKey("dbo.Pipelines", "WorkflowId", "dbo.Workflows");
            DropForeignKey("dbo.PipelineStageCriterions", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.PipelineStageCriterions", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.PipelineStages", "PipelineId", "dbo.Pipelines");
            DropForeignKey("dbo.Workflows", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Jobs", "JobTypeId", "dbo.JobTypes");
            DropForeignKey("dbo.JobTypes", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Jobs", "JobFunctionId", "dbo.JobFunctions");
            DropForeignKey("dbo.JobAttachments", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.Jobs", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.Jobs", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.JobFunctions", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.InterviewerForInterviews", "UserAccountId", "dbo.UserAccounts");
            DropForeignKey("dbo.UserAccounts", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.UserAccounts", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.InterviewerForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.Interviews", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.CandidateForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.CandidateForInterviews", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.Candidates", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.Departments", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.CandidateExperiences", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateEducations", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateAttachments", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.PipelineStageScores", new[] { "CandidateId" });
            DropIndex("dbo.PipelineStageScores", new[] { "PipelineStageId" });
            DropIndex("dbo.PipelineStageScores", new[] { "JobAssignmentId" });
            DropIndex("dbo.PipelineStageComments", new[] { "JobAssignment_Id" });
            DropIndex("dbo.PipelineStageComments", new[] { "PipelineStageScore_Id" });
            DropIndex("dbo.PipelineStageCriterionScores", new[] { "PipelineStageCriterionId" });
            DropIndex("dbo.PipelineStageCriterionScores", new[] { "CandidateId" });
            DropIndex("dbo.PipelineStageCriterionScores", new[] { "PipelineStageId" });
            DropIndex("dbo.PipelineStageCriterionScores", new[] { "JobAssignmentId" });
            DropIndex("dbo.JobAssignments", new[] { "JobId" });
            DropIndex("dbo.JobAssignments", new[] { "CandidateId" });
            DropIndex("dbo.WithdrawnReasons", new[] { "CompanyId" });
            DropIndex("dbo.Sources", new[] { "CompanyId" });
            DropIndex("dbo.RejectedReasons", new[] { "CompanyId" });
            DropIndex("dbo.PipelineStageCriterions", new[] { "JobId" });
            DropIndex("dbo.PipelineStageCriterions", new[] { "PipelineStageId" });
            DropIndex("dbo.PipelineStages", new[] { "PipelineId" });
            DropIndex("dbo.Pipelines", new[] { "WorkflowId" });
            DropIndex("dbo.Workflows", new[] { "CompanyId" });
            DropIndex("dbo.JobTypes", new[] { "CompanyId" });
            DropIndex("dbo.JobAttachments", new[] { "JobId" });
            DropIndex("dbo.Jobs", new[] { "WorkflowId" });
            DropIndex("dbo.Jobs", new[] { "CompanyId" });
            DropIndex("dbo.Jobs", new[] { "JobTypeId" });
            DropIndex("dbo.Jobs", new[] { "JobFunctionId" });
            DropIndex("dbo.Jobs", new[] { "DepartmentId" });
            DropIndex("dbo.JobFunctions", new[] { "CompanyId" });
            DropIndex("dbo.UserAccounts", new[] { "DepartmentId" });
            DropIndex("dbo.UserAccounts", new[] { "CompanyId" });
            DropIndex("dbo.InterviewerForInterviews", new[] { "UserAccountId" });
            DropIndex("dbo.InterviewerForInterviews", new[] { "InterviewId" });
            DropIndex("dbo.CandidateForInterviews", new[] { "CandidateId" });
            DropIndex("dbo.CandidateForInterviews", new[] { "InterviewId" });
            DropIndex("dbo.Interviews", new[] { "CompanyId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.Departments", new[] { "CompanyId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUsers", new[] { "DepartmentId" });
            DropIndex("dbo.AspNetUsers", new[] { "CompanyId" });
            DropIndex("dbo.CandidateExperiences", new[] { "CandidateId" });
            DropIndex("dbo.CandidateEducations", new[] { "CandidateId" });
            DropIndex("dbo.Candidates", new[] { "CompanyId" });
            DropIndex("dbo.Candidates", new[] { "SourceId" });
            DropIndex("dbo.CandidateAttachments", new[] { "CandidateId" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.PipelineStageScores");
            DropTable("dbo.PipelineStageComments");
            DropTable("dbo.PipelineStageCriterionScores");
            DropTable("dbo.JobAssignments");
            DropTable("dbo.WithdrawnReasons");
            DropTable("dbo.Sources");
            DropTable("dbo.RejectedReasons");
            DropTable("dbo.PipelineStageCriterions");
            DropTable("dbo.PipelineStages");
            DropTable("dbo.Pipelines");
            DropTable("dbo.Workflows");
            DropTable("dbo.JobTypes");
            DropTable("dbo.JobAttachments");
            DropTable("dbo.Jobs");
            DropTable("dbo.JobFunctions");
            DropTable("dbo.UserAccounts");
            DropTable("dbo.InterviewerForInterviews");
            DropTable("dbo.CandidateForInterviews");
            DropTable("dbo.Interviews");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.Departments");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Companies");
            DropTable("dbo.CandidateExperiences");
            DropTable("dbo.CandidateEducations");
            DropTable("dbo.Candidates");
            DropTable("dbo.CandidateAttachments");
        }
    }
}