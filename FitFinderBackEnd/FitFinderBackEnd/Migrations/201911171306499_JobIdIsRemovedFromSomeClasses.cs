namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JobIdIsRemovedFromSomeClasses : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.CriteriaScores", name: "JobAssignment_Id", newName: "JobAssignmentId");
            RenameColumn(table: "dbo.StageComments", name: "JobAssignment_Id", newName: "JobAssignmentId");
            RenameColumn(table: "dbo.StageScores", name: "JobAssignment_Id", newName: "JobAssignmentId");
            RenameIndex(table: "dbo.CriteriaScores", name: "IX_JobAssignment_Id", newName: "IX_JobAssignmentId");
            RenameIndex(table: "dbo.StageComments", name: "IX_JobAssignment_Id", newName: "IX_JobAssignmentId");
            RenameIndex(table: "dbo.StageScores", name: "IX_JobAssignment_Id", newName: "IX_JobAssignmentId");
            DropColumn("dbo.CriteriaScores", "JobAssignedId");
            DropColumn("dbo.StageComments", "JobAssignedId");
            DropColumn("dbo.StageScores", "JobAssignedId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.StageScores", "JobAssignedId", c => c.Long(nullable: false));
            AddColumn("dbo.StageComments", "JobAssignedId", c => c.Long(nullable: false));
            AddColumn("dbo.CriteriaScores", "JobAssignedId", c => c.Long(nullable: false));
            RenameIndex(table: "dbo.StageScores", name: "IX_JobAssignmentId", newName: "IX_JobAssignment_Id");
            RenameIndex(table: "dbo.StageComments", name: "IX_JobAssignmentId", newName: "IX_JobAssignment_Id");
            RenameIndex(table: "dbo.CriteriaScores", name: "IX_JobAssignmentId", newName: "IX_JobAssignment_Id");
            RenameColumn(table: "dbo.StageScores", name: "JobAssignmentId", newName: "JobAssignment_Id");
            RenameColumn(table: "dbo.StageComments", name: "JobAssignmentId", newName: "JobAssignment_Id");
            RenameColumn(table: "dbo.CriteriaScores", name: "JobAssignmentId", newName: "JobAssignment_Id");
        }
    }
}
