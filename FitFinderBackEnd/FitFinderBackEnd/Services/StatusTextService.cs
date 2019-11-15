using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitFinderBackEnd.Services
{
    public class StatusTextService
    {
        public string Success = "Success";
        public string SomethingWentWrong = "Something went worng!";
        public string ResourceNotFound = "Resource not found!";
        public string UserClaimError = "You have to login again!";
        public string ReportingPurposeIssue = "This resource can't be deleted for reporting purpose!";
    }
}