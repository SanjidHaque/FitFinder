namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class New3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sources", "CompanyId", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sources", "CompanyId");
        }
    }
}
