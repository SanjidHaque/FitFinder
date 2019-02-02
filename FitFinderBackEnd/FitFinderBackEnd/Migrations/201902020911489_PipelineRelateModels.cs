namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PipelineRelateModels : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DisqualifyReasons",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pipelines",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PipelineStages",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Color = c.String(),
                        PipelineId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Pipelines", t => t.PipelineId, cascadeDelete: true)
                .Index(t => t.PipelineId);
            
            CreateTable(
                "dbo.PipelineStageCriterias",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        PipelineStageId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PipelineStages", t => t.PipelineStageId, cascadeDelete: true)
                .Index(t => t.PipelineStageId);
            
            CreateTable(
                "dbo.RejectedReasons",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PipelineStages", "PipelineId", "dbo.Pipelines");
            DropForeignKey("dbo.PipelineStageCriterias", "PipelineStageId", "dbo.PipelineStages");
            DropIndex("dbo.PipelineStageCriterias", new[] { "PipelineStageId" });
            DropIndex("dbo.PipelineStages", new[] { "PipelineId" });
            DropTable("dbo.RejectedReasons");
            DropTable("dbo.PipelineStageCriterias");
            DropTable("dbo.PipelineStages");
            DropTable("dbo.Pipelines");
            DropTable("dbo.DisqualifyReasons");
        }
    }
}
