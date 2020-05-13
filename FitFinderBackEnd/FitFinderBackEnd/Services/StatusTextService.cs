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
        public string DuplicateResourceFound = "There is already a resource in this name!";
        public string UserDoesNotExist = "Either user does not exist or you have not confirmed your email!";
    }
}