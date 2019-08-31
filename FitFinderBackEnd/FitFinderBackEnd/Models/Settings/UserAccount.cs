using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class UserAccount
    {
        public string Id { get; set; }
        public Company Company { get; set; }
        public long CompanyId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string JoiningDateTime { get; set; }
        public string RoleName { get; set; }
        public Department Department { get; set; }
        public long DepartmentId { get; set; }
        public bool IsOwner { get; set; }

    }
}