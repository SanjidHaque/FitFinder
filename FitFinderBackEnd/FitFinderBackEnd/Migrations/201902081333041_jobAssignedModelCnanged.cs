namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobAssignedModelCnanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.JobAssigneds", "CurrentStageId", c => c.Long());
        }
        
        public override void Down()
        {
            DropColumn("dbo.JobAssigneds", "CurrentStageId");
        }
    }
}
