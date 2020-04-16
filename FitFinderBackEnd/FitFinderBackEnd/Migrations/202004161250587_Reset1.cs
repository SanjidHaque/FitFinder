namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Reset1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CandidateGeneralComments", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.CandidateGeneralComments", new[] { "CandidateId" });
            CreateTable(
                "dbo.GeneralComments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Comment = c.String(),
                        JobAssignmentId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.JobAssignments", t => t.JobAssignmentId)
                .Index(t => t.JobAssignmentId);
            
            DropTable("dbo.CandidateGeneralComments");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.CandidateGeneralComments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Comment = c.String(),
                        CandidateId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.GeneralComments", "JobAssignmentId", "dbo.JobAssignments");
            DropIndex("dbo.GeneralComments", new[] { "JobAssignmentId" });
            DropTable("dbo.GeneralComments");
            CreateIndex("dbo.CandidateGeneralComments", "CandidateId");
            AddForeignKey("dbo.CandidateGeneralComments", "CandidateId", "dbo.Candidates", "Id");
        }
    }
}
