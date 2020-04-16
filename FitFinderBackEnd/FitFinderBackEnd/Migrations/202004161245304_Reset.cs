namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Reset : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.PipelineStageComments", name: "PipelineStageScore_Id", newName: "PipelineStageScoreId");
            RenameIndex(table: "dbo.PipelineStageComments", name: "IX_PipelineStageScore_Id", newName: "IX_PipelineStageScoreId");
            DropColumn("dbo.PipelineStageComments", "StageScoreId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PipelineStageComments", "StageScoreId", c => c.Long());
            RenameIndex(table: "dbo.PipelineStageComments", name: "IX_PipelineStageScoreId", newName: "IX_PipelineStageScore_Id");
            RenameColumn(table: "dbo.PipelineStageComments", name: "PipelineStageScoreId", newName: "PipelineStageScore_Id");
        }
    }
}
