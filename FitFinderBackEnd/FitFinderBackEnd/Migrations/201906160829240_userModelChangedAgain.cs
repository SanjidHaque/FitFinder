namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userModelChangedAgain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "JoiningDateTime", c => c.String());
            AddColumn("dbo.AspNetUsers", "IsOwner", c => c.Boolean(nullable: false));
            DropColumn("dbo.AspNetUsers", "Address");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            DropColumn("dbo.AspNetUsers", "IsOwner");
            DropColumn("dbo.AspNetUsers", "JoiningDateTime");
        }
    }
}
