namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobAssignedModelCnangedAgain : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.JobAssigneds", "CurrentStageId", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.JobAssigneds", "CurrentStageId", c => c.Long());
        }
    }
}
