namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JobModelChanged1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Jobs", "NewCandidates", c => c.Long());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Jobs", "NewCandidates");
        }
    }
}
