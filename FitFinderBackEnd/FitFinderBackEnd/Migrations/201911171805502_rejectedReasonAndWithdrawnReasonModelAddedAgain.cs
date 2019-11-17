namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rejectedReasonAndWithdrawnReasonModelAddedAgain : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.PipelineStageCriterias", newName: "PipelineStageCriterions");
            AddColumn("dbo.CriteriaScores", "PipelineStageCriterionId", c => c.Long(nullable: false));
            CreateIndex("dbo.CriteriaScores", "PipelineStageCriterionId");
            CreateIndex("dbo.CriteriaScores", "CandidateId");
            CreateIndex("dbo.StageComments", "PipelineStageId");
            CreateIndex("dbo.StageComments", "CandidateId");
            CreateIndex("dbo.StageScores", "PipelineStageId");
            CreateIndex("dbo.RejectedReasons", "CompanyId");
            CreateIndex("dbo.WithdrawnReasons", "CompanyId");
            AddForeignKey("dbo.CriteriaScores", "CandidateId", "dbo.Candidates", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CriteriaScores", "PipelineStageCriterionId", "dbo.PipelineStageCriterions", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StageComments", "CandidateId", "dbo.Candidates", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StageComments", "PipelineStageId", "dbo.PipelineStages", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StageScores", "PipelineStageId", "dbo.PipelineStages", "Id", cascadeDelete: true);
            AddForeignKey("dbo.RejectedReasons", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            AddForeignKey("dbo.WithdrawnReasons", "CompanyId", "dbo.Companies", "Id", cascadeDelete: true);
            DropColumn("dbo.CriteriaScores", "PipelineStageCriteriaId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CriteriaScores", "PipelineStageCriteriaId", c => c.Long(nullable: false));
            DropForeignKey("dbo.WithdrawnReasons", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.RejectedReasons", "CompanyId", "dbo.Companies");
            DropForeignKey("dbo.StageScores", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.StageComments", "PipelineStageId", "dbo.PipelineStages");
            DropForeignKey("dbo.StageComments", "CandidateId", "dbo.Candidates");
            DropForeignKey("dbo.CriteriaScores", "PipelineStageCriterionId", "dbo.PipelineStageCriterions");
            DropForeignKey("dbo.CriteriaScores", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.WithdrawnReasons", new[] { "CompanyId" });
            DropIndex("dbo.RejectedReasons", new[] { "CompanyId" });
            DropIndex("dbo.StageScores", new[] { "PipelineStageId" });
            DropIndex("dbo.StageComments", new[] { "CandidateId" });
            DropIndex("dbo.StageComments", new[] { "PipelineStageId" });
            DropIndex("dbo.CriteriaScores", new[] { "CandidateId" });
            DropIndex("dbo.CriteriaScores", new[] { "PipelineStageCriterionId" });
            DropColumn("dbo.CriteriaScores", "PipelineStageCriterionId");
            RenameTable(name: "dbo.PipelineStageCriterions", newName: "PipelineStageCriterias");
        }
    }
}
