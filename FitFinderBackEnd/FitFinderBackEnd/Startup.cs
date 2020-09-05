using System;
using System.Collections.Generic;
using System.Linq;
using Hangfire;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;


namespace FitFinderBackEnd
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //GlobalConfiguration.Configuration
            //    .UseSqlServerStorage("Server=.\\SQLExpress;Database=fitfinder-headblocks-db;Trusted_Connection=Yes;\"");
            GlobalConfiguration.Configuration.UseSqlServerStorage("DefaultConnection");
            app.UseHangfireDashboard(); 
       //     BackgroundJob.Enqueue(() => Console.WriteLine("Fire-and-forget!"));
      //      RecurringJob.AddOrUpdate(() => Console.WriteLine("Recurring!"), Cron.Minutely);
            app.UseHangfireServer();

            app.UseCors(CorsOptions.AllowAll);
            ConfigureAuth(app);
        }

    }
}
