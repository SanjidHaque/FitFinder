using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Interview;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace FitFinderBackEnd.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
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
        public DbSet<CandidateSource> CandidateSources { get; set; }
        public DbSet<CandidateAttachment> CandidateAttachments { get; set; }
        public DbSet<CandidateEducation> CandidateEducations { get; set; }
        public DbSet<CandidateExperience> CandidateExperiences { get; set; }

        public DbSet<CandidatesForInterview> CandidatesForInterviews { get; set; }
        public DbSet<InterviewersForInterview> InterviewersForInterviews { get; set; }
        public DbSet<Interview.Interview> Interviews { get; set; }
    

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Candidate.Candidate>()
        //        .HasOptional(a => a.CandidateSource)
        //        .WithOptionalDependent()
        //        .WillCascadeOnDelete(true);
        //}

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}