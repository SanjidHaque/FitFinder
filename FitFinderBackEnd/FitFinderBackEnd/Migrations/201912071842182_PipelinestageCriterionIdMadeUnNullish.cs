namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PipelinestageCriterionIdMadeUnNullish : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PipelineStageCriterions", "PipelineStageId", "dbo.PipelineStages");
            DropIndex("dbo.PipelineStageCriterions", new[] { "PipelineStageId" });
            AlterColumn("dbo.PipelineStageCriterions", "PipelineStageId", c => c.Long(nullable: false));
            CreateIndex("dbo.PipelineStageCriterions", "PipelineStageId");
            AddForeignKey("dbo.PipelineStageCriterions", "PipelineStageId", "dbo.PipelineStages", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PipelineStageCriterions", "PipelineStageId", "dbo.PipelineStages");
            DropIndex("dbo.PipelineStageCriterions", new[] { "PipelineStageId" });
            AlterColumn("dbo.PipelineStageCriterions", "PipelineStageId", c => c.Long());
            CreateIndex("dbo.PipelineStageCriterions", "PipelineStageId");
            AddForeignKey("dbo.PipelineStageCriterions", "PipelineStageId", "dbo.PipelineStages", "Id");
        }
    }
}
