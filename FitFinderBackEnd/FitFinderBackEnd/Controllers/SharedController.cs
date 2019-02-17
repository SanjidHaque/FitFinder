using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SharedController : ApiController
    {
        private readonly ApplicationDbContext _context;
        public SharedController()
        {
            _context = new ApplicationDbContext();
        }
        [HttpPut]
        [Route("api/JobStatusChanged")]
        public IHttpActionResult JobStatusChanged(JobAssigned jobAssigned)
        {
            if (jobAssigned == null)
            {
                return NotFound();
            }

            JobAssigned getAssignedJob = _context.JobAssiged.FirstOrDefault(x => x.Id == jobAssigned.Id);
            if (getAssignedJob != null) getAssignedJob.CurrentStageId = jobAssigned.CurrentStageId;
            _context.SaveChanges();

            RemoveOldScores(jobAssigned);
            AddNewScores(jobAssigned);
            if (jobAssigned.StageComment.Count != 0)
            {
                AddNewStageComment(jobAssigned);
            }
            return Ok(GetNewScores(jobAssigned));
        }


        public JobAssigned GetNewScores(JobAssigned jobAssigned)
        {
            return _context.JobAssiged.FirstOrDefault(x => x.Id == jobAssigned.Id);
        }


        public void AddNewStageComment(JobAssigned jobAssigned)
        {
            _context.StageComments.AddRange(jobAssigned.StageComment);
            _context.SaveChanges();
        }



        public void RemoveOldScores(JobAssigned jobAssigned)
        {
            List<StageScore> stageScore = _context.StageScores.Where(x => x.JobAssignedId == jobAssigned.Id).ToList();
            List<CriteriaScore> criteriaScore = _context.CriteriaScores.Where(x => x.JobAssignedId == jobAssigned.Id).ToList();
            _context.StageScores.RemoveRange(stageScore);
            _context.CriteriaScores.RemoveRange(criteriaScore);
            _context.SaveChanges();

        }

        public void AddNewScores(JobAssigned jobAssigned)
        {
            _context.StageScores.AddRange(jobAssigned.StageScore);
            _context.CriteriaScores.AddRange(jobAssigned.CriteriaScore);
            _context.SaveChanges();

        }




        [HttpPost]
        [Route("api/JobAssigned")]
        public IHttpActionResult JobAssigned(JobAssigned jobAssigned)
        {
            if (jobAssigned == null)
            {
                return NotFound();
            }

            _context.JobAssiged.Add(jobAssigned);
            
            foreach (var stageScore in jobAssigned.StageScore)
            {
                stageScore.JobAssignedId = jobAssigned.Id;
            }

            foreach (var criteriaScore in jobAssigned.CriteriaScore)
            {
                criteriaScore.JobAssignedId = jobAssigned.Id;
            }

            foreach (var stageComment in jobAssigned.StageComment)
            {
                stageComment.JobAssignedId = jobAssigned.Id;
            }

            _context.StageScores.AddRange(jobAssigned.StageScore);
            _context.CriteriaScores.AddRange(jobAssigned.CriteriaScore);
            _context.StageComments.AddRange(jobAssigned.StageComment);

            _context.SaveChanges();
            return Ok(jobAssigned);
        }
    }
}
