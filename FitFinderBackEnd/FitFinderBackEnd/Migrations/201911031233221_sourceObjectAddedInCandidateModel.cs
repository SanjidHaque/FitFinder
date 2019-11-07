namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sourceObjectAddedInCandidateModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Candidates", "SourceId", c => c.Long());
            CreateIndex("dbo.Candidates", "SourceId");
            AddForeignKey("dbo.Candidates", "SourceId", "dbo.Sources", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Candidates", "SourceId", "dbo.Sources");
            DropIndex("dbo.Candidates", new[] { "SourceId" });
            DropColumn("dbo.Candidates", "SourceId");
        }
    }
}
