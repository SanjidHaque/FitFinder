using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FitFinderBackEnd.Controllers
{
    public class MvcController : Controller
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        public ActionResult Index()
        {
            return Redirect("http://www.google.com");
        }
    }
}