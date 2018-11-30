namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class candidateAttachmentModelModified : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.CandidateAttachments", "FilePath");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CandidateAttachments", "FilePath", c => c.String());
        }
    }
}
