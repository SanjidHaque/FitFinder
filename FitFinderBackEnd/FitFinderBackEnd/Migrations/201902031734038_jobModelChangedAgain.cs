namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class jobModelChangedAgain : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Jobs", "DepartmentId", c => c.Long());
            AlterColumn("dbo.Jobs", "JobFunctionalityId", c => c.Long());
            AlterColumn("dbo.Jobs", "EmploymentTypeId", c => c.Long());
            AlterColumn("dbo.Jobs", "JobPositions", c => c.Long());
            AlterColumn("dbo.Jobs", "JobExperienceStarts", c => c.Long());
            AlterColumn("dbo.Jobs", "JobExperienceEnds", c => c.Long());
            AlterColumn("dbo.Jobs", "JobSalaryStarts", c => c.Long());
            AlterColumn("dbo.Jobs", "JobSalaryEnds", c => c.Long());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Jobs", "JobSalaryEnds", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobSalaryStarts", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobExperienceEnds", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobExperienceStarts", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobPositions", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "EmploymentTypeId", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "JobFunctionalityId", c => c.Long(nullable: false));
            AlterColumn("dbo.Jobs", "DepartmentId", c => c.Long(nullable: false));
        }
    }
}
