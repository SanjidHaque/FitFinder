namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobAndPipelineStageCriteriaModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Jobs", "WorkflowId", c => c.Long());
            AddColumn("dbo.PipelineStageCriterias", "JobId", c => c.Long());
            CreateIndex("dbo.Jobs", "WorkflowId");
            CreateIndex("dbo.PipelineStageCriterias", "JobId");
            AddForeignKey("dbo.PipelineStageCriterias", "JobId", "dbo.Jobs", "Id");
            AddForeignKey("dbo.Jobs", "WorkflowId", "dbo.Workflows", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Jobs", "WorkflowId", "dbo.Workflows");
            DropForeignKey("dbo.PipelineStageCriterias", "JobId", "dbo.Jobs");
            DropIndex("dbo.PipelineStageCriterias", new[] { "JobId" });
            DropIndex("dbo.Jobs", new[] { "WorkflowId" });
            DropColumn("dbo.PipelineStageCriterias", "JobId");
            DropColumn("dbo.Jobs", "WorkflowId");
        }
    }
}
