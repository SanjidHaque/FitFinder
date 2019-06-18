namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class New : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Candidates", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Candidates", "SourceId", "dbo.Sources");
            DropForeignKey("dbo.Interviews", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Candidates", new[] { "SourceId" });
            DropIndex("dbo.Candidates", new[] { "CompanyId" });
            DropIndex("dbo.Interviews", new[] { "CompanyId" });
            AddColumn("dbo.Jobs", "DepartmentId", c => c.Long());
            AddColumn("dbo.Jobs", "JobFunctionalityId", c => c.Long());
            AddColumn("dbo.Jobs", "EmploymentTypeId", c => c.Long());
            DropColumn("dbo.Candidates", "SourceId");
            DropColumn("dbo.Sources", "CompanyId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Sources", "CompanyId", c => c.Long(nullable: false));
            AddColumn("dbo.Candidates", "SourceId", c => c.Long(nullable: false));
            DropColumn("dbo.Jobs", "EmploymentTypeId");
            DropColumn("dbo.Jobs", "JobFunctionalityId");
            DropColumn("dbo.Jobs", "DepartmentId");
            CreateIndex("dbo.Interviews", "CompanyId");
            CreateIndex("dbo.Candidates", "CompanyId");
            CreateIndex("dbo.Candidates", "SourceId");
            AddForeignKey("dbo.Interviews", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Candidates", "SourceId", "dbo.Sources", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Candidates", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
        }
    }
}
