using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;

namespace FitFinderBackEnd.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FitFinderController : ApiController
    {
        private ApplicationDbContext _context;

        public FitFinderController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        [Route("api/AddNewCandidate")]
        public IHttpActionResult AddNewCandidate(Candidate candidate)
        {
            if (candidate == null)
            {
                return NotFound();
            }

            _context.CandidateAttachments.AddRange(candidate.CandidateAttachment);
            _context.CandidateEducations.AddRange(candidate.CandidateEducation);
            _context.CandidateExperiences.AddRange(candidate.CandidateExperience);
            _context.Candidates.Add(candidate);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("api/UploadCandidateAttachment")]
        public IHttpActionResult UploadCandidateAttachment()
        {     
            List<string> filePaths = new List<string>();
            var httpRequest = HttpContext.Current.Request;
            var candidateId = httpRequest["Candidate Id"];  
            for (int i = 0; i<  httpRequest.Files.Count; i++)
            {
                var postedFile = httpRequest.Files[i];
                var fileName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/Content/Candidate Attachments/" + fileName);
                postedFile.SaveAs(filePath);
                filePaths.Add(filePath);         
            }
           List<CandidateAttachment> candidateAttachment =  _context.CandidateAttachments.Where(p => p.CandidateId == candidateId).ToList();
            for (int j = 0; j < candidateAttachment.Count; j++)
            {
                candidateAttachment[j].FilePath = filePaths[j];
                _context.SaveChanges();
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/Candidate")]
        public IHttpActionResult GetAllCandidate()
        {
            List<Candidate> candidate = _context.Candidates.
                Include(c => c.CandidateEducation).
                Include(d => d.CandidateExperience).
                Include(e => e.CandidateAttachment).ToList();
            return Ok(candidate);
        }

    }
}
