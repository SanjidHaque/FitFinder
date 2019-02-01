namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class allModels : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CandidateAttachments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        FileName = c.String(),
                        ModifiedFileName = c.String(),
                        IsResume = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .Index(t => t.CandidateId);
            
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
                "dbo.Candidates",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        JobId = c.Long(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Mobile = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        State = c.String(),
                        Country = c.String(),
                        CandidateSourceId = c.String(),
                        FacebookUrl = c.String(),
                        LinkedInUrl = c.String(),
                        IsArchived = c.Boolean(nullable: false),
                        IsHired = c.Boolean(nullable: false),
                        IsClosed = c.Boolean(nullable: false),
                        ApplicationDate = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CandidatesForInterviews",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        InterviewId = c.Long(nullable: false),
                        CandidateId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Interviews", t => t.InterviewId, cascadeDelete: true)
                .Index(t => t.InterviewId);
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.InterviewersForInterviews",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        InterviewId = c.Long(nullable: false),
                        InterviewerId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Interviews", t => t.InterviewId, cascadeDelete: true)
                .Index(t => t.InterviewId);
            
            CreateTable(
                "dbo.Interviews",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        InterviewDate = c.String(),
                        InterviewName = c.String(),
                        InterviewLocation = c.String(),
                        InterviewStartTime = c.String(),
                        InterviewEndTime = c.String(),
                        InterviewTypeId = c.Long(nullable: false),
                        InterviewStatus = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
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
                "dbo.JobFunctions",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Jobs",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        JobTitle = c.String(),
                        JobCode = c.String(),
                        JobDescription = c.String(),
                        JobImmediate = c.String(),
                        JobIntermediate = c.String(),
                        JobGoodToHave = c.String(),
                        JobLocation = c.String(),
                        DepartmentId = c.Long(nullable: false),
                        JobFunctionalityId = c.Long(nullable: false),
                        EmploymentTypeId = c.Long(nullable: false),
                        JobPositions = c.String(),
                        JobClosingDate = c.String(),
                        JobExperienceStarts = c.String(),
                        JobExperienceEnds = c.String(),
                        JobSalaryStarts = c.String(),
                        JobSalaryEnds = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.JobTypes",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Sources",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.JobAttachments", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.InterviewersForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.CandidatesForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.CandidateExperiences", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateEducations", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CandidateAttachments", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.JobAttachments", new[] { "JobId" });
            DropIndex("dbo.InterviewersForInterviews", new[] { "InterviewId" });
            DropIndex("dbo.CandidatesForInterviews", new[] { "InterviewId" });
            DropIndex("dbo.CandidateExperiences", new[] { "CandidateId" });
            DropIndex("dbo.CandidateEducations", new[] { "CandidateId" });
            DropIndex("dbo.CandidateAttachments", new[] { "CandidateId" });
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Sources");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.JobTypes");
            DropTable("dbo.Jobs");
            DropTable("dbo.JobFunctions");
            DropTable("dbo.JobAttachments");
            DropTable("dbo.Interviews");
            DropTable("dbo.InterviewersForInterviews");
            DropTable("dbo.Departments");
            DropTable("dbo.CandidatesForInterviews");
            DropTable("dbo.Candidates");
            DropTable("dbo.CandidateExperiences");
            DropTable("dbo.CandidateEducations");
            DropTable("dbo.CandidateAttachments");
        }
    }
}
