namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class allModelsChanged : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AssignedJobToCandidates",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        JobId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .Index(t => t.CandidateId);
            
            AddColumn("dbo.Candidates", "IsFavourite", c => c.Boolean(nullable: false));
            AddColumn("dbo.Interviews", "IsArchived", c => c.Boolean(nullable: false));
            AddColumn("dbo.Jobs", "IsArchived", c => c.Boolean(nullable: false));
            AddColumn("dbo.Jobs", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Jobs", "JobCreatedDate", c => c.String());
            AddColumn("dbo.Jobs", "IsFavourite", c => c.Boolean(nullable: false));
            DropColumn("dbo.Candidates", "JobId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Candidates", "JobId", c => c.Long(nullable: false));
            DropForeignKey("dbo.AssignedJobToCandidates", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.AssignedJobToCandidates", new[] { "CandidateId" });
            DropColumn("dbo.Jobs", "IsFavourite");
            DropColumn("dbo.Jobs", "JobCreatedDate");
            DropColumn("dbo.Jobs", "IsPublished");
            DropColumn("dbo.Jobs", "IsArchived");
            DropColumn("dbo.Interviews", "IsArchived");
            DropColumn("dbo.Candidates", "IsFavourite");
            DropTable("dbo.AssignedJobToCandidates");
        }
    }
}
