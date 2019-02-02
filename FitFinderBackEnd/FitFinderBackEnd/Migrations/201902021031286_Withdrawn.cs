namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Withdrawn : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.DisqualifyReasons", newName: "WithdrawnReasons");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.WithdrawnReasons", newName: "DisqualifyReasons");
        }
    }
}
