using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Interview;

namespace FitFinderBackEnd.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class InterviewController : ApiController
    {
        private readonly ApplicationDbContext _context;
        public InterviewController()
        {
            _context = new ApplicationDbContext();
        }
        [HttpPost]
        [Route("api/AddNewInterview")]
        public IHttpActionResult AddNewInterview(Interview interview)
        {
            if (interview == null)
            {
                return NotFound();
            }
            _context.Interviews.Add(interview);

            foreach (var candidatesForInterview in interview.CandidatesForInterview)
            {
                candidatesForInterview.Id = interview.Id;
            }

            foreach (var interviewersForInterview in interview.InterviewersForInterview)
            {
                interviewersForInterview.Id = interview.Id;
            }

            _context.CandidatesForInterviews.AddRange(interview.CandidatesForInterview);
            _context.InterviewersForInterviews.AddRange(interview.InterviewersForInterview);

            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllInterview")]
        public IHttpActionResult GetAllInterview()
        {
            List<Interview> interview = _context.Interviews.
                Include(c => c.CandidatesForInterview).
                Include(d => d.InterviewersForInterview).OrderBy(x => x.Id).ToList();
            return Ok(interview);
        }

        [HttpPut]
        [Route("api/ArchiveInterviews")]
        public IHttpActionResult ArchiveInterviews(List<Interview> interviews)
        {
            foreach (var interview in interviews)
            {
                Interview getInterview = _context.Interviews.FirstOrDefault(x => x.Id == interview.Id);
                if (getInterview != null) getInterview.IsArchived = true;
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("api/RestoreInterviews")]
        public IHttpActionResult RestoreInterviews(List<Interview> interviews)
        {
            foreach (var interview in interviews)
            {
                Interview getInterview = _context.Interviews.FirstOrDefault(x => x.Id == interview.Id);
                if (getInterview != null) getInterview.IsArchived = false;
            }

            _context.SaveChanges();
            return Ok();
        }
    }
}
