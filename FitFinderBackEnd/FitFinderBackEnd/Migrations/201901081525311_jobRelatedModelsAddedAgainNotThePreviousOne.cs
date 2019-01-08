namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobRelatedModelsAddedAgainNotThePreviousOne : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.JobAttachments",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        JobId = c.String(maxLength: 128),
                        FileName = c.String(),
                        ModifiedFileName = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Jobs", t => t.JobId)
                .Index(t => t.JobId);
            
            CreateTable(
                "dbo.Jobs",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        JobTitle = c.String(),
                        JobCode = c.String(),
                        JobDescription = c.String(),
                        JobImmediate = c.String(),
                        JobIntermediate = c.String(),
                        JobGoodToHave = c.String(),
                        JobLocation = c.String(),
                        DepartmentId = c.String(),
                        JobFunctionalityId = c.String(),
                        EmploymentTypeId = c.String(),
                        JobPositions = c.String(),
                        JobClosingDate = c.String(),
                        JobExperienceStarts = c.String(),
                        JobExperienceEnds = c.String(),
                        JobSalaryStarts = c.String(),
                        JobSalaryEnds = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.JobAttachments", "JobId", "dbo.Jobs");
            DropIndex("dbo.JobAttachments", new[] { "JobId" });
            DropTable("dbo.Jobs");
            DropTable("dbo.JobAttachments");
        }
    }
}
