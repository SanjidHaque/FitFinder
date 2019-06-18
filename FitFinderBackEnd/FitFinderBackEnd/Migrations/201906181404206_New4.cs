namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class New4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Pipelines", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.RejectedReasons", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.WithdrawnReasons", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Pipelines", new[] { "CompanyId" });
            DropIndex("dbo.RejectedReasons", new[] { "CompanyId" });
            DropIndex("dbo.WithdrawnReasons", new[] { "CompanyId" });
            AddColumn("dbo.Jobs", "CompanyId", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Jobs", "CompanyId");
            CreateIndex("dbo.WithdrawnReasons", "CompanyId");
            CreateIndex("dbo.RejectedReasons", "CompanyId");
            CreateIndex("dbo.Pipelines", "CompanyId");
            AddForeignKey("dbo.WithdrawnReasons", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.RejectedReasons", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Pipelines", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
        }
    }
}
