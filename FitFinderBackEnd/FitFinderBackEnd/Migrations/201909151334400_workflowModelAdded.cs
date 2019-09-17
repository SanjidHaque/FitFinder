namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class workflowModelAdded : DbMigration
    {
        public override void Up()
        {
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
            
            AddColumn("dbo.Pipelines", "WorkflowId", c => c.Long());
            CreateIndex("dbo.Pipelines", "WorkflowId");
            AddForeignKey("dbo.Pipelines", "WorkflowId", "dbo.Workflows", "Id");
            DropColumn("dbo.Pipelines", "CompanyId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Pipelines", "CompanyId", c => c.Long(nullable: false));
            DropForeignKey("dbo.Pipelines", "WorkflowId", "dbo.Workflows");
            DropForeignKey("dbo.Workflows", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Workflows", new[] { "CompanyId" });
            DropIndex("dbo.Pipelines", new[] { "WorkflowId" });
            DropColumn("dbo.Pipelines", "WorkflowId");
            DropTable("dbo.Workflows");
        }
    }
}
