namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class candidateModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Candidates", "SourceId", c => c.Long(nullable: false));
            DropColumn("dbo.Candidates", "CandidateSourceId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Candidates", "CandidateSourceId", c => c.String());
            DropColumn("dbo.Candidates", "SourceId");
        }
    }
}
