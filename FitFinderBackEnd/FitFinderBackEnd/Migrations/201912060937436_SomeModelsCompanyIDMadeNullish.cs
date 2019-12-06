namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SomeModelsCompanyIdMadeNullish : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Candidates", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Jobs", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.UserAccounts", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Candidates", new[] { "CompanyId" });
            DropIndex("dbo.AspNetUsers", new[] { "CompanyId" });
            DropIndex("dbo.UserAccounts", new[] { "CompanyId" });
            DropIndex("dbo.Jobs", new[] { "CompanyId" });
            AlterColumn("dbo.Candidates", "CompanyId", c => c.Long());
            AlterColumn("dbo.AspNetUsers", "CompanyId", c => c.Long());
            AlterColumn("dbo.UserAccounts", "CompanyId", c => c.Long());
            AlterColumn("dbo.Jobs", "CompanyId", c => c.Long());
            CreateIndex("dbo.Candidates", "CompanyId");
            CreateIndex("dbo.AspNetUsers", "CompanyId");
            CreateIndex("dbo.UserAccounts", "CompanyId");
            CreateIndex("dbo.Jobs", "CompanyId");
            AddForeignKey("dbo.Candidates", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.Jobs", "CompanyId", "dbo.Companies", "Id");
            AddForeignKey("dbo.UserAccounts", "CompanyId", "dbo.Companies", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserAccounts", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Jobs", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.Candidates", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Jobs", new[] { "CompanyId" });
            DropIndex("dbo.UserAccounts", new[] { "CompanyId" });
            DropIndex("dbo.AspNetUsers", new[] { "CompanyId" });
            DropIndex("dbo.Candidates", new[] { "CompanyId" });
            AlterColumn("dbo.Jobs", "CompanyId", c => c.Long(nullable: false));
            AlterColumn("dbo.UserAccounts", "CompanyId", c => c.Long(nullable: false));
            AlterColumn("dbo.AspNetUsers", "CompanyId", c => c.Long(nullable: false));
            AlterColumn("dbo.Candidates", "CompanyId", c => c.Long(nullable: false));
            CreateIndex("dbo.Jobs", "CompanyId");
            CreateIndex("dbo.UserAccounts", "CompanyId");
            CreateIndex("dbo.AspNetUsers", "CompanyId");
            CreateIndex("dbo.Candidates", "CompanyId");
            AddForeignKey("dbo.UserAccounts", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Jobs", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUsers", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Candidates", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
        }
    }
}
