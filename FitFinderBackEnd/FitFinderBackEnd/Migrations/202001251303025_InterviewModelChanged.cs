namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InterviewModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Interviews", "HiringManagerName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Interviews", "HiringManagerName");
        }
    }
}
