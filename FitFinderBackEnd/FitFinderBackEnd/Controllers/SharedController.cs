using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Settings;
using FitFinderBackEnd.Services;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class SharedController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private StatusTextService _statusTextService;

        public SharedController()
        {
            _context = new ApplicationDbContext();
            _statusTextService = new StatusTextService();
        }


        [HttpPost]
        [Route("api/JobStatusChanged")]
        public  IHttpActionResult JobStatusChanged(JobAssigned jobAssigned)
        {
            if (jobAssigned == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            JobAssigned getAssignedJob = _context.JobAssigneds.FirstOrDefault(x => x.Id == jobAssigned.Id);
            if (getAssignedJob == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });

            }

            getAssignedJob.CurrentStageId = jobAssigned.CurrentStageId;
            //  _context.SaveChanges();

            RemoveOldScores(jobAssigned);
            AddNewScores(jobAssigned);

            _context.SaveChanges();

            if (jobAssigned.StageComment.Count != 0)
            {
                AddNewStageComments(jobAssigned.StageComment);
            }

            JobAssigned getUpdatedJobAssignment = GetUpdatedJobAssignment(jobAssigned);

            return Ok(new { getUpdatedJobAssignment, statusText = _statusTextService.Success });

           
        }


        public JobAssigned GetUpdatedJobAssignment(JobAssigned jobAssigned)
        {
            return _context.JobAssigneds.FirstOrDefault(x => x.Id == jobAssigned.Id);
        }


        public void AddNewStageComments(List<StageComment> stageComments)
        {
            _context.StageComments.AddRange(stageComments);
        }



        public void  RemoveOldScores(JobAssigned jobAssigned)
        {
            List<StageScore> stageScore = _context.StageScores.Where(x => x.JobAssignedId == jobAssigned.Id).ToList();
            List<CriteriaScore> criteriaScore = _context.CriteriaScores.Where(x => x.JobAssignedId == jobAssigned.Id).ToList();
            _context.StageScores.RemoveRange(stageScore);
            _context.CriteriaScores.RemoveRange(criteriaScore);
        

        }

        public void AddNewScores(JobAssigned jobAssigned)
        {
            _context.StageScores.AddRange(jobAssigned.StageScore);
            _context.CriteriaScores.AddRange(jobAssigned.CriteriaScore);
        }




        [HttpPost]
        [Route("api/JobAssigned")]
        public IHttpActionResult JobAssigned(JobAssigned jobAssigned)
        {
           
            //jobAssigned .CriteriaScore =  new List<CriteriaScore>();
            //jobAssigned.StageScore= new List<StageScore>();
            //jobAssigned.StageComment = new List<StageComment>();
            _context.JobAssigneds.Add(jobAssigned);
            
            //foreach (var stageScore in jobAssigned.StageScore)
            //{
            //    stageScore.JobAssignedId = jobAssigned.Id;
            //}

            //foreach (var criteriaScore in jobAssigned.CriteriaScore)
            //{
            //    criteriaScore.JobAssignedId = jobAssigned.Id;
            //}

            //foreach (var stageComment in jobAssigned.StageComment)
            //{
            //    stageComment.JobAssignedId = jobAssigned.Id;
            //}

            //_context.StageScores.AddRange(jobAssigned.StageScore);
            //_context.CriteriaScores.AddRange(jobAssigned.CriteriaScore);
            //_context.StageComments.AddRange(jobAssigned.StageComment);

            _context.SaveChanges();
            return Ok(new { jobAssigned, statusText = _statusTextService.Success });

            
        }

        [HttpPost]
        [Route("api/RemoveAssignedJob")]
        public IHttpActionResult RemoveAssignedJob(JobAssigned jobAssigned)
        {
                JobAssigned getJobAssigned = _context.JobAssigneds.FirstOrDefault(x => x.Id == jobAssigned.Id);
                if (getJobAssigned == null)
                {
                    return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            _context.JobAssigneds.Remove(getJobAssigned);
            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });



        }
    }
}
