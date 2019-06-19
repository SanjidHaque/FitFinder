using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Interview;
using FitFinderBackEnd.Models.Job;
using FitFinderBackEnd.Models.Settings;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace FitFinderBackEnd.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public Company Company { get; set; }    
        public long CompanyId { get; set; }
        public string FullName { get; set; }
        public string JoiningDateTime { get; set; }
        public bool IsOwner { get; set; }   

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Candidate.Candidate> Candidates { get; set; }
        public DbSet<Source> Sources { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<JobFunction> JobFunctions { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<Interview.Interview> Interviews { get; set; }S
        public DbSet<Job.Job> Jobs { get; set; }

        public DbSet<RejectedReason> RejectedReasons { get; set; }
        public DbSet<WithdrawnReason> WithdrawnReasons { get; set; }
        public DbSet<Pipeline> Pipelines { get; set; }
        public DbSet<PipelineStage> PipelineStages { get; set; }
        public DbSet<PipelineStageCriteria> PipelineStageCriterias { get; set; }

        public DbSet<JobAssigned> JobAssiged { get; set; }
        public DbSet<StageScore> StageScores { get; set; }
        public DbSet<CriteriaScore> CriteriaScores { get; set; }
        public DbSet<StageComment> StageComments { get; set; }

        public DbSet<Company> Companies { get; set; }

       

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}