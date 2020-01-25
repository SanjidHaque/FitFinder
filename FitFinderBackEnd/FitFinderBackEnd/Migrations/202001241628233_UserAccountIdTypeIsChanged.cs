namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserAccountIdTypeIsChanged : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.InterviewersForInterviews", new[] { "UserAccount_Id" });
            DropColumn("dbo.InterviewersForInterviews", "UserAccountId");
            RenameColumn(table: "dbo.InterviewersForInterviews", name: "UserAccount_Id", newName: "UserAccountId");
            AlterColumn("dbo.InterviewersForInterviews", "UserAccountId", c => c.String(maxLength: 128));
            CreateIndex("dbo.InterviewersForInterviews", "UserAccountId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.InterviewersForInterviews", new[] { "UserAccountId" });
            AlterColumn("dbo.InterviewersForInterviews", "UserAccountId", c => c.Long(nullable: false));
            RenameColumn(table: "dbo.InterviewersForInterviews", name: "UserAccountId", newName: "UserAccount_Id");
            AddColumn("dbo.InterviewersForInterviews", "UserAccountId", c => c.Long(nullable: false));
            CreateIndex("dbo.InterviewersForInterviews", "UserAccount_Id");
        }
    }
}
