using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class CandidateController : ApiController
    {
        private readonly ApplicationDbContext _context;
        public CandidateController()
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
            _context.Candidates.Add(candidate);

//            foreach (var candidateEducation in candidate.CandidateEducation)
//            {
//                candidateEducation.Id = candidate.Id;
//            }
//            foreach (var candidateExperience in candidate.CandidateExperience)
//            {
//                candidateExperience.Id = candidate.Id;
//            }
//
//            foreach (var candidateAttachment in candidate.CandidateAttachment)
//            {
//                candidateAttachment.Id = candidate.Id;
//            }
//
//
//
//            _context.CandidateAttachments.AddRange(candidate.CandidateAttachment);
//            _context.CandidateEducations.AddRange(candidate.CandidateEducation);
//            _context.CandidateExperiences.AddRange(candidate.CandidateExperience);

            _context.SaveChanges();
            return Ok(candidate);
        }

        [HttpPost]
        [Route("api/UploadAttachments")]
        [AllowAnonymous]
        public IHttpActionResult UploadAttachments(long companyId)
        {
            var httpRequest = HttpContext.Current.Request;
            for (int i = 0; i < httpRequest.Files.Count; i++)
            {
                var postedFile = httpRequest.Files[i];
                var filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + postedFile.FileName);
                postedFile.SaveAs(filePath);
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllCandidate/{companyId}")]
        [AllowAnonymous]
        public IHttpActionResult GetAllCandidate(long companyId)
        {
            List<Candidate> candidate = _context.Candidates.
                Include(c => c.CandidateEducation).
                Include(d => d.CandidateExperience).
                Include(e => e.CandidateAttachment).
                Include(f => f.JobAssigned.Select(g => g.StageScore.Select(a => a.JobAssigned))).
                Include(f => f.JobAssigned.Select(g => g.CriteriaScore.Select(a => a.JobAssigned))).
                Include(f => f.JobAssigned.Select(g => g.StageComment.Select(a => a.JobAssigned)))
                .OrderBy(x => x.Id).ToList();


            return Ok(candidate);
        }

        [HttpPut]
        [Route("api/ArchiveCandidates")]
        public IHttpActionResult ArchiveCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsArchived = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/RestoreCandidates")]
        public IHttpActionResult RestoreCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsArchived = false;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/FavouriteCandidates")]
        public IHttpActionResult FavouriteCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsFavourite = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/UnfavouriteCandidates")]
        public IHttpActionResult UnfavouriteCandidates(List<Candidate> candidates)
        {
            foreach (var candidate in candidates)
            {
                Candidate getCandidate = _context.Candidates.FirstOrDefault(x => x.Id == candidate.Id);
                if (getCandidate != null) getCandidate.IsFavourite = false;
            }

            _context.SaveChanges();
            return Ok();
        }



    }
}
