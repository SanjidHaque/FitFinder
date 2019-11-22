namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SomePropertyIsNullableNow : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PipelineStageCriterions", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.StageScores", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.StageComments", "PipelineStageId", "dbo.PipelineStages");
            DropIndex("dbo.PipelineStageCriterions", new[] { "JobId" });
            DropIndex("dbo.StageScores", new[] { "PipelineStageId" });
            DropIndex("dbo.StageComments", new[] { "PipelineStageId" });
            AlterColumn("dbo.PipelineStageCriterions", "JobId", c => c.Long());
            AlterColumn("dbo.StageScores", "PipelineStageId", c => c.Long());
            AlterColumn("dbo.StageComments", "PipelineStageId", c => c.Long());
            CreateIndex("dbo.PipelineStageCriterions", "JobId");
            CreateIndex("dbo.StageScores", "PipelineStageId");
            CreateIndex("dbo.StageComments", "PipelineStageId");
            AddForeignKey("dbo.PipelineStageCriterions", "JobId", "dbo.Jobs", "Id");
            AddForeignKey("dbo.StageScores", "PipelineStageId", "dbo.PipelineStages", "Id");
            AddForeignKey("dbo.StageComments", "PipelineStageId", "dbo.PipelineStages", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StageComments", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.StageScores", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.PipelineStageCriterions", "JobId", "dbo.Jobs");
            DropIndex("dbo.StageComments", new[] { "PipelineStageId" });
            DropIndex("dbo.StageScores", new[] { "PipelineStageId" });
            DropIndex("dbo.PipelineStageCriterions", new[] { "JobId" });
            AlterColumn("dbo.StageComments", "PipelineStageId", c => c.Long(nullable: false));
            AlterColumn("dbo.StageScores", "PipelineStageId", c => c.Long(nullable: false));
            AlterColumn("dbo.PipelineStageCriterions", "JobId", c => c.Long(nullable: false));
            CreateIndex("dbo.StageComments", "PipelineStageId");
            CreateIndex("dbo.StageScores", "PipelineStageId");
            CreateIndex("dbo.PipelineStageCriterions", "JobId");
            AddForeignKey("dbo.StageComments", "PipelineStageId", "dbo.PipelineStages", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StageScores", "PipelineStageId", "dbo.PipelineStages", "Id", cascadeDelete: true);
            AddForeignKey("dbo.PipelineStageCriterions", "JobId", "dbo.Jobs", "Id", cascadeDelete: true);
        }
    }
}
