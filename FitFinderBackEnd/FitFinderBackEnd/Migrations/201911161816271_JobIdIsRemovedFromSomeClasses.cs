namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JobIdIsRemovedFromSomeClasses : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.CriteriaScores", "JobId");
            DropColumn("dbo.StageComments", "JobId");
            DropColumn("dbo.StageScores", "JobId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.StageScores", "JobId", c => c.Long(nullable: false));
            AddColumn("dbo.StageComments", "JobId", c => c.Long(nullable: false));
            AddColumn("dbo.CriteriaScores", "JobId", c => c.Long(nullable: false));
        }
    }
}
