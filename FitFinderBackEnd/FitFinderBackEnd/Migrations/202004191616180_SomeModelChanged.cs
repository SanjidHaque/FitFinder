namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SomeModelChanged : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PipelineStageComments", "PipelineStageScoreId", "dbo.PipelineStageScores");
            DropIndex("dbo.PipelineStageComments", new[] { "PipelineStageScoreId" });
            DropTable("dbo.PipelineStageComments");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PipelineStageComments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Comment = c.String(),
                        PipelineStageScoreId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.PipelineStageComments", "PipelineStageScoreId");
            AddForeignKey("dbo.PipelineStageComments", "PipelineStageScoreId", "dbo.PipelineStageScores", "Id");
        }
    }
}
