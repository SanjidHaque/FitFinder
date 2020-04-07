namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CandiateImageNameRenamed : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Candidates", "ImageName", c => c.String());
            DropColumn("dbo.Candidates", "CandidateImagePath");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Candidates", "CandidateImagePath", c => c.String());
            DropColumn("dbo.Candidates", "ImageName");
        }
    }
}
