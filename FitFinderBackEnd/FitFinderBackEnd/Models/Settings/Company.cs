namespace FitFinderBackEnd.Models.Settings
{
    public class Company
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyPhoneNumber { get; set; }
        public string AdminFullName { get; set; }
        public string AdminEmail { get; set; }
        public string AdminPhoneNumber { get; set; }
        public string JoiningDateTime { get; set; }
    }   
}
