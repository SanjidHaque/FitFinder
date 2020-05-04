namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InterviewModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Interviews", "JobId", c => c.Long());
            CreateIndex("dbo.Interviews", "JobId");
            AddForeignKey("dbo.Interviews", "JobId", "dbo.Jobs", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Interviews", "JobId", "dbo.Jobs");
            DropIndex("dbo.Interviews", new[] { "JobId" });
            DropColumn("dbo.Interviews", "JobId");
        }
    }
}
