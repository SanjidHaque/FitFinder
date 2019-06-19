namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class companyModelChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Companies", "CompanyName", c => c.String());
            AddColumn("dbo.Companies", "CompanyAddress", c => c.String());
            AddColumn("dbo.Companies", "CompanyEmail", c => c.String());
            AddColumn("dbo.Companies", "CompanyPhoneNumber", c => c.String());
            AddColumn("dbo.Companies", "AdminFullName", c => c.String());
            AddColumn("dbo.Companies", "AdminEmail", c => c.String());
            AddColumn("dbo.Companies", "AdminPhoneNumber", c => c.String());
            AddColumn("dbo.Companies", "JoiningDateTime", c => c.String());
            DropColumn("dbo.Companies", "Name");
            DropColumn("dbo.Companies", "Address");
            DropColumn("dbo.Companies", "Email");
            DropColumn("dbo.Companies", "PhoneNumber");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Companies", "PhoneNumber", c => c.String());
            AddColumn("dbo.Companies", "Email", c => c.String());
            AddColumn("dbo.Companies", "Address", c => c.String());
            AddColumn("dbo.Companies", "Name", c => c.String());
            DropColumn("dbo.Companies", "JoiningDateTime");
            DropColumn("dbo.Companies", "AdminPhoneNumber");
            DropColumn("dbo.Companies", "AdminEmail");
            DropColumn("dbo.Companies", "AdminFullName");
            DropColumn("dbo.Companies", "CompanyPhoneNumber");
            DropColumn("dbo.Companies", "CompanyEmail");
            DropColumn("dbo.Companies", "CompanyAddress");
            DropColumn("dbo.Companies", "CompanyName");
        }
    }
}
