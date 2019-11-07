namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class interviewModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Interviews", "InterviewType", c => c.Long(nullable: false));
            AddColumn("dbo.Interviews", "InterviewStatus", c => c.Long(nullable: false));
            DropColumn("dbo.Interviews", "InterviewTypeId");
            DropColumn("dbo.Interviews", "InterviewStatusId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Interviews", "InterviewStatusId", c => c.Long(nullable: false));
            AddColumn("dbo.Interviews", "InterviewTypeId", c => c.Long(nullable: false));
            DropColumn("dbo.Interviews", "InterviewStatus");
            DropColumn("dbo.Interviews", "InterviewType");
        }
    }
}
