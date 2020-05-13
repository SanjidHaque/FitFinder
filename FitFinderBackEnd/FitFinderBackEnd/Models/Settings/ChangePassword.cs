using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Models.Settings
{
    public class ChangePassword
    {
        public string UserId { get; set; }
        public string Code { get; set; }
        public string Email { get; set; }   
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}