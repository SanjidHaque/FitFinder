namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class companyModelChanged1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Companies", "AdminUserName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Companies", "AdminUserName");
        }
    }
}
