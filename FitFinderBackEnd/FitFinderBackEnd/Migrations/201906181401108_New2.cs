namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class New2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Candidates", "SourceId", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Candidates", "SourceId");
        }
    }
}
