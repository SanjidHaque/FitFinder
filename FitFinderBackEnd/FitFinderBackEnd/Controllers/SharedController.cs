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
        [Route("api/UpdateJobAssignment")]
        public  IHttpActionResult UpdateJobAssignment(JobAssignment jobAssignment)
        {
            if (jobAssignment == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            JobAssignment getJobAssignment = _context.JobAssignments.FirstOrDefault(x => x.Id == jobAssignment.Id);
            if (getJobAssignment == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });

            }

            getJobAssignment.CurrentStageId = jobAssignment.CurrentStageId;
            //  _context.SaveChanges();

            RemoveOldScores(jobAssignment);
            AddNewScores(jobAssignment);

            _context.SaveChanges();

            if (jobAssignment.StageComment.Count != 0)
            {
                AddNewStageComments(jobAssignment.StageComment);
            }

            JobAssignment getUpdatedJobAssignment = GetUpdatedJobAssignment(jobAssignment);

            return Ok(new { getUpdatedJobAssignment, statusText = _statusTextService.Success });

           
        }


        public JobAssignment GetUpdatedJobAssignment(JobAssignment jobAssignment)
        {
            return _context.JobAssignments.FirstOrDefault(x => x.Id == jobAssignment.Id);
        }


        public void AddNewStageComments(List<StageComment> stageComments)
        {
            _context.StageComments.AddRange(stageComments);
        }



        public void  RemoveOldScores(JobAssignment jobAssignment)
        {
            List<StageScore> stageScore = _context.StageScores
                .Where(x => x.JobAssignmentId == jobAssignment.Id)
                .ToList();

            List<CriteriaScore> criteriaScore = _context.CriteriaScores
                .Where(x => x.JobAssignmentId == jobAssignment.Id)
                .ToList();

            _context.StageScores.RemoveRange(stageScore);
            _context.CriteriaScores.RemoveRange(criteriaScore);
        

        }

        public void AddNewScores(JobAssignment jobAssignment)
        {
            _context.StageScores.AddRange(jobAssignment.StageScore);
            _context.CriteriaScores.AddRange(jobAssignment.CriteriaScore);
        }




        [HttpPost]
        [Route("api/AddJobAssignment")]
        public IHttpActionResult AddJobAssignment(JobAssignment jobAssignment)
        {
           
            //jobAssigned .CriteriaScore =  new List<CriteriaScore>();
            //jobAssigned.StageScore= new List<StageScore>();
            //jobAssigned.StageComment = new List<StageComment>();
            _context.JobAssignments.Add(jobAssignment);
            
            //foreach (var stageScore in jobAssigned.StageScore)
            //{
            //    stageScore.JobAssignmentId = jobAssigned.Id;
            //}

            //foreach (var criteriaScore in jobAssigned.CriteriaScore)
            //{
            //    criteriaScore.JobAssignmentId = jobAssigned.Id;
            //}

            //foreach (var stageComment in jobAssigned.StageComment)
            //{
            //    stageComment.JobAssignmentId = jobAssigned.Id;
            //}

            //_context.StageScores.AddRange(jobAssigned.StageScore);
            //_context.CriteriaScores.AddRange(jobAssigned.CriteriaScore);
            //_context.StageComments.AddRange(jobAssigned.StageComment);

            _context.SaveChanges();
            return Ok(new { jobAssigned = jobAssignment, statusText = _statusTextService.Success });

            
        }

        [HttpPost]
        [Route("api/RemoveJobAssignment")]
        public IHttpActionResult RemoveJobAssignment(JobAssignment jobAssignment)
        {
            JobAssignment getJobAssignment = _context.JobAssignments.FirstOrDefault(x => x.Id == jobAssignment.Id);
            if (getJobAssignment == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            _context.JobAssignments.Remove(getJobAssignment);
            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });

        }
    }
}
