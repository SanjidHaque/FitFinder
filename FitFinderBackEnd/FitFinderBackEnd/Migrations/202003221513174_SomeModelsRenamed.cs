namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SomeModelsRenamed : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.CandidatesForInterviews", newName: "CandidateForInterviews");
            RenameTable(name: "dbo.InterviewersForInterviews", newName: "InterviewerForInterviews");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.InterviewerForInterviews", newName: "InterviewersForInterviews");
            RenameTable(name: "dbo.CandidateForInterviews", newName: "CandidatesForInterviews");
        }
    }
}
