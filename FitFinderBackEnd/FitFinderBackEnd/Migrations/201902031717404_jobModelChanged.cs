namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobModelChanged : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Jobs", "JobPositions", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobExperienceStarts", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobExperienceEnds", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobSalaryStarts", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobSalaryEnds", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Jobs", "JobSalaryEnds", c => c.String());
            AlterColumn("dbo.Jobs", "JobSalaryStarts", c => c.String());
            AlterColumn("dbo.Jobs", "JobExperienceEnds", c => c.String());
            AlterColumn("dbo.Jobs", "JobExperienceStarts", c => c.String());
            AlterColumn("dbo.Jobs", "JobPositions", c => c.String());
        }
    }
}
