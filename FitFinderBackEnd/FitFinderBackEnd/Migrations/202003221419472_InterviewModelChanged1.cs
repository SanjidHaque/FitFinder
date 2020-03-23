namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InterviewModelChanged1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CandidatesForInterviews", "InterviewStatus", c => c.String());
            DropColumn("dbo.Interviews", "InterviewStatus");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Interviews", "InterviewStatus", c => c.String());
            DropColumn("dbo.CandidatesForInterviews", "InterviewStatus");
        }
    }
}
