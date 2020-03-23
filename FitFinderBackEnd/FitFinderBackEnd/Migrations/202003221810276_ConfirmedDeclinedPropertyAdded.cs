namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ConfirmedDeclinedPropertyAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Interviews", "ConfirmedCandidate", c => c.Long());
            AddColumn("dbo.Interviews", "DeclinedCandidate", c => c.Long());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Interviews", "DeclinedCandidate");
            DropColumn("dbo.Interviews", "ConfirmedCandidate");
        }
    }
}
