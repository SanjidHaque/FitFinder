namespace FitFinderBackEnd.Models.Candidate
{
    public class CandidateExperience
    {
        public long Id { get; set; }
        public Candidate Candidate { get; set; }
        public long CandidateId { get; set; }
        public string EmployerName { get; set; }
        public string Designation { get; set; }
        public string Role { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public bool IsCurrent { get; set; }
    }
}