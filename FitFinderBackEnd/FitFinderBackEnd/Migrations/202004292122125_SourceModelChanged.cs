namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SourceModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sources", "TotalCandidates", c => c.Long());
            AddColumn("dbo.Sources", "ActiveCandidates", c => c.Long());
            AddColumn("dbo.Sources", "HiredCandidates", c => c.Long());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sources", "HiredCandidates");
            DropColumn("dbo.Sources", "ActiveCandidates");
            DropColumn("dbo.Sources", "TotalCandidates");
        }
    }
}
