namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobRelatedModelsAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Candidates", "ApplicationDate", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Candidates", "ApplicationDate");
        }
    }
}
