namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CandidateImagePathPropertyAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Candidates", "CandidateImagePath", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Candidates", "CandidateImagePath");
        }
    }
}
