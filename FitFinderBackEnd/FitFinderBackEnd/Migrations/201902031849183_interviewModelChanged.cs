namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class interviewModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Interviews", "InterviewStatusId", c => c.Long(nullable: false));
            DropColumn("dbo.Interviews", "InterviewStatus");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Interviews", "InterviewStatus", c => c.String());
            DropColumn("dbo.Interviews", "InterviewStatusId");
        }
    }
}
