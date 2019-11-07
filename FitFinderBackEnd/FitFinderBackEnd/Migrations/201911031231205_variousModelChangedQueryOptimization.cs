namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class variousModelChangedQueryOptimization : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Jobs", "JobFunctionId", c => c.Long());
            AddColumn("dbo.Jobs", "JobTypeId", c => c.Long());
            CreateIndex("dbo.Jobs", "DepartmentId");
            CreateIndex("dbo.Jobs", "JobFunctionId");
            CreateIndex("dbo.Jobs", "JobTypeId");
            AddForeignKey("dbo.Jobs", "DepartmentId", "dbo.Departments", "Id");
            AddForeignKey("dbo.Jobs", "JobFunctionId", "dbo.JobFunctions", "Id");
            AddForeignKey("dbo.Jobs", "JobTypeId", "dbo.JobTypes", "Id");
            DropColumn("dbo.Candidates", "SourceId");
            DropColumn("dbo.Jobs", "JobFunctionalityId");
            DropColumn("dbo.Jobs", "EmploymentTypeId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Jobs", "EmploymentTypeId", c => c.Long());
            AddColumn("dbo.Jobs", "JobFunctionalityId", c => c.Long());
            AddColumn("dbo.Candidates", "SourceId", c => c.Long(nullable: false));
            DropForeignKey("dbo.Jobs", "JobTypeId", "dbo.JobTypes");
            DropForeignKey("dbo.Jobs", "JobFunctionId", "dbo.JobFunctions");
            DropForeignKey("dbo.Jobs", "DepartmentId", "dbo.Departments");
            DropIndex("dbo.Jobs", new[] { "JobTypeId" });
            DropIndex("dbo.Jobs", new[] { "JobFunctionId" });
            DropIndex("dbo.Jobs", new[] { "DepartmentId" });
            DropColumn("dbo.Jobs", "JobTypeId");
            DropColumn("dbo.Jobs", "JobFunctionId");
        }
    }
}
