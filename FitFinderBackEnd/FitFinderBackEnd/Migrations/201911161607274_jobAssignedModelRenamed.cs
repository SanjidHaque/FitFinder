namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobAssignedModelRenamed : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.JobAssigneds", newName: "JobAssignments");
            DropForeignKey("dbo.CriteriaScores", "JobAssignmentId", "dbo.JobAssigneds");
            DropForeignKey("dbo.StageComments", "JobAssignmentId", "dbo.JobAssigneds");
            DropForeignKey("dbo.StageScores", "JobAssignmentId", "dbo.JobAssigneds");
            DropIndex("dbo.CriteriaScores", new[] { "JobAssignmentId" });
            DropIndex("dbo.StageComments", new[] { "JobAssignmentId" });
            DropIndex("dbo.StageScores", new[] { "JobAssignmentId" });
            AddColumn("dbo.CriteriaScores", "JobAssignment_Id", c => c.Long());
            AddColumn("dbo.StageComments", "JobAssignment_Id", c => c.Long());
            AddColumn("dbo.StageScores", "JobAssignment_Id", c => c.Long());
            CreateIndex("dbo.CriteriaScores", "JobAssignment_Id");
            CreateIndex("dbo.StageComments", "JobAssignment_Id");
            CreateIndex("dbo.StageScores", "JobAssignment_Id");
            AddForeignKey("dbo.CriteriaScores", "JobAssignment_Id", "dbo.JobAssignments", "Id");
            AddForeignKey("dbo.StageComments", "JobAssignment_Id", "dbo.JobAssignments", "Id");
            AddForeignKey("dbo.StageScores", "JobAssignment_Id", "dbo.JobAssignments", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StageScores", "JobAssignment_Id", "dbo.JobAssignments");
            DropForeignKey("dbo.StageComments", "JobAssignment_Id", "dbo.JobAssignments");
            DropForeignKey("dbo.CriteriaScores", "JobAssignment_Id", "dbo.JobAssignments");
            DropIndex("dbo.StageScores", new[] { "JobAssignment_Id" });
            DropIndex("dbo.StageComments", new[] { "JobAssignment_Id" });
            DropIndex("dbo.CriteriaScores", new[] { "JobAssignment_Id" });
            DropColumn("dbo.StageScores", "JobAssignment_Id");
            DropColumn("dbo.StageComments", "JobAssignment_Id");
            DropColumn("dbo.CriteriaScores", "JobAssignment_Id");
            CreateIndex("dbo.StageScores", "JobAssignmentId");
            CreateIndex("dbo.StageComments", "JobAssignmentId");
            CreateIndex("dbo.CriteriaScores", "JobAssignmentId");
            AddForeignKey("dbo.StageScores", "JobAssignmentId", "dbo.JobAssigneds", "Id");
            AddForeignKey("dbo.StageComments", "JobAssignmentId", "dbo.JobAssigneds", "Id");
            AddForeignKey("dbo.CriteriaScores", "JobAssignmentId", "dbo.JobAssigneds", "Id");
            RenameTable(name: "dbo.JobAssignments", newName: "JobAssigneds");
        }
    }
}
