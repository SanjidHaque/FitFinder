namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JobAssignmentModelCHanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.JobAssignments", "CurrentPipelineStageId", c => c.Long(nullable: false));
            DropColumn("dbo.JobAssignments", "CurrentStageId");
            DropColumn("dbo.JobAssignments", "IsActive");
        }
        
        public override void Down()
        {
            AddColumn("dbo.JobAssignments", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.JobAssignments", "CurrentStageId", c => c.Long(nullable: false));
            DropColumn("dbo.JobAssignments", "CurrentPipelineStageId");
        }
    }
}
