namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class candidateAttachmentModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CandidateAttachments", "ModifiedFileName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CandidateAttachments", "ModifiedFileName");
        }
    }
}
