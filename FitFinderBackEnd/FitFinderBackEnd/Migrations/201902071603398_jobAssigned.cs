namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobAssigned : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PipelineStageCriteriaStarRatings", "PipelineStageStarRatingId", "dbo.PipelineStageStarRatings");
            DropForeignKey("dbo.PipelineStageStarRatings", "AssignedJobToCandidate_Id", "dbo.AssignedJobToCandidates");
            DropForeignKey("dbo.AssignedJobToCandidates", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.AssignedJobToCandidates", new[] { "CandidateId" });
            DropIndex("dbo.PipelineStageStarRatings", new[] { "AssignedJobToCandidate_Id" });
            DropIndex("dbo.PipelineStageCriteriaStarRatings", new[] { "PipelineStageStarRatingId" });
            CreateTable(
                "dbo.JobAssigneds",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        JobId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Candidates", t => t.CandidateId, cascadeDelete: true)
                .ForeignKey("dbo.Jobs", t => t.JobId, cascadeDelete: true)
                .Index(t => t.CandidateId)
                .Index(t => t.JobId);
            
            DropTable("dbo.AssignedJobToCandidates");
            DropTable("dbo.PipelineStageStarRatings");
            DropTable("dbo.PipelineStageCriteriaStarRatings");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PipelineStageCriteriaStarRatings",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Rating = c.Int(nullable: false),
                        PipelineStageCriteriaId = c.Long(nullable: false),
                        PipelineStageId = c.Long(nullable: false),
                        CandidateId = c.Long(nullable: false),
                        PipelineStageStarRatingId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PipelineStageStarRatings",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Rating = c.Int(nullable: false),
                        PipelineStageId = c.Long(nullable: false),
                        CandidateId = c.Long(nullable: false),
                        AssignedJobToCandidate_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AssignedJobToCandidates",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CandidateId = c.Long(nullable: false),
                        JobId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.JobAssigneds", "JobId", "dbo.Jobs");
            DropForeignKey("dbo.JobAssigneds", "CandidateId", "dbo.Candidates");
            DropIndex("dbo.JobAssigneds", new[] { "JobId" });
            DropIndex("dbo.JobAssigneds", new[] { "CandidateId" });
            DropTable("dbo.JobAssigneds");
            CreateIndex("dbo.PipelineStageCriteriaStarRatings", "PipelineStageStarRatingId");
            CreateIndex("dbo.PipelineStageStarRatings", "AssignedJobToCandidate_Id");
            CreateIndex("dbo.AssignedJobToCandidates", "CandidateId");
            AddForeignKey("dbo.AssignedJobToCandidates", "CandidateId", "dbo.Candidates", "Id", cascadeDelete: true);
            AddForeignKey("dbo.PipelineStageStarRatings", "AssignedJobToCandidate_Id", "dbo.AssignedJobToCandidates", "Id");
            AddForeignKey("dbo.PipelineStageCriteriaStarRatings", "PipelineStageStarRatingId", "dbo.PipelineStageStarRatings", "Id", cascadeDelete: true);
        }
    }
}
