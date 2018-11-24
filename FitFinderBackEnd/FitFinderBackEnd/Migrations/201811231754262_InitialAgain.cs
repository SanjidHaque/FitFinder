namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialAgain : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Candidates", "CandidateSourceId", "dbo.CandidateSources");
            DropIndex("dbo.Candidates", new[] { "CandidateSourceId" });
            AlterColumn("dbo.Candidates", "CandidateSourceId", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Candidates", "CandidateSourceId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Candidates", "CandidateSourceId");
            AddForeignKey("dbo.Candidates", "CandidateSourceId", "dbo.CandidateSources", "Id");
        }
    }
}
