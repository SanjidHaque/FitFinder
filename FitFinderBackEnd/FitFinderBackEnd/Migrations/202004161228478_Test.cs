namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Test : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PipelineStageComments", "JobAssignment_Id", "dbo.JobAssignments");
            DropIndex("dbo.PipelineStageComments", new[] { "JobAssignment_Id" });
            DropColumn("dbo.PipelineStageComments", "JobAssignment_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PipelineStageComments", "JobAssignment_Id", c => c.Long());
            CreateIndex("dbo.PipelineStageComments", "JobAssignment_Id");
            AddForeignKey("dbo.PipelineStageComments", "JobAssignment_Id", "dbo.JobAssignments", "Id");
        }
    }
}
