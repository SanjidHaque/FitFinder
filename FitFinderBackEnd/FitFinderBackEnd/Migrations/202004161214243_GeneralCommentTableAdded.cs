namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GeneralCommentTableAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GeneralComments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Comment = c.String(),
                        CandidateId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId)
                .Index(t => t.CandidateId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GeneralComments", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.GeneralComments", new[] { "CandidateId" });
            DropTable("dbo.GeneralComments");
        }
    }
}
