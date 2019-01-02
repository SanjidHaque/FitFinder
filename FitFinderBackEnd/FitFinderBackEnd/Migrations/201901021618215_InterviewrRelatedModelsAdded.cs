namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InterviewrRelatedModelsAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CandidatesForInterviews",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        InterviewId = c.String(maxLength: 128),
                        CandidateId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId)
                .ForeignKey("dbo.Interviews", t => t.InterviewId)
                .Index(t => t.InterviewId)
                .Index(t => t.CandidateId);
            
            CreateTable(
                "dbo.Interviews",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        InterviewDate = c.String(),
                        InterviewName = c.String(),
                        InterviewLocation = c.String(),
                        InterviewStartTime = c.String(),
                        InterviewEndTime = c.String(),
                        InterviewTypeId = c.String(),
                        InterviewStatus = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.InterviewersForInterviews",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        InterviewId = c.String(maxLength: 128),
                        InterviewerId = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Interviews", t => t.InterviewId)
                .Index(t => t.InterviewId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.InterviewersForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.CandidatesForInterviews", "InterviewId", "dbo.Interviews");
            DropForeignKey("dbo.CandidatesForInterviews", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.InterviewersForInterviews", new[] { "InterviewId" });
            DropIndex("dbo.CandidatesForInterviews", new[] { "CandidateId" });
            DropIndex("dbo.CandidatesForInterviews", new[] { "InterviewId" });
            DropTable("dbo.InterviewersForInterviews");
            DropTable("dbo.Interviews");
            DropTable("dbo.CandidatesForInterviews");
        }
    }
}
