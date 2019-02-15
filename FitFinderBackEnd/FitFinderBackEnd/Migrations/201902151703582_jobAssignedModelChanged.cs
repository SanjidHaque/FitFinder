namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobAssignedModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.JobAssigneds", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.JobAssigneds", "IsActive");
        }
    }
}
