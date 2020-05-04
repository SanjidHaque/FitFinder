namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobModelChangedAgain : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Jobs", "NewCandidates");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Jobs", "NewCandidates", c => c.Long());
        }
    }
}
