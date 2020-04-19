namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ScoreModelChanged : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PipelineStageCriterionScores", "PipelineStageId", "dbo.PipelineStages");
            DropIndex("dbo.PipelineStageCriterionScores", new[] { "PipelineStageId" });
            DropColumn("dbo.PipelineStageCriterionScores", "PipelineStageId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PipelineStageCriterionScores", "PipelineStageId", c => c.Long());
            CreateIndex("dbo.PipelineStageCriterionScores", "PipelineStageId");
            AddForeignKey("dbo.PipelineStageCriterionScores", "PipelineStageId", "dbo.PipelineStages", "Id");
        }
    }
}
