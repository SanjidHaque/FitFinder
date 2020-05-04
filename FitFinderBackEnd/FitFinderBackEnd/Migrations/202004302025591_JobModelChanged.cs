namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JobModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Jobs", "TotalCandidates", c => c.Long());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Jobs", "TotalCandidates");
        }
    }
}
