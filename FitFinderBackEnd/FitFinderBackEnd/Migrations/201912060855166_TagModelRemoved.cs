namespace FitFinderBackEnd.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TagModelRemoved : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tags", "CompanyId", "dbo.Companies");
            DropIndex("dbo.Tags", new[] { "CompanyId" });
            DropTable("dbo.Tags");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.Tags", "CompanyId");
            AddForeignKey("dbo.Tags", "CompanyId", "dbo.Companies", "Id");
        }
    }
}
