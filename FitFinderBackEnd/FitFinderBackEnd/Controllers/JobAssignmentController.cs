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
    public class JobAssignmentController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private StatusTextService _statusTextService;

        public JobAssignmentController()
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

            getJobAssignment.CurrentPipelineStageId = jobAssignment.CurrentPipelineStageId;
            //  _context.SaveChanges();

            RemoveOldScores(jobAssignment);
            AddNewScores(jobAssignment);

            _context.SaveChanges();



            JobAssignment getUpdatedJobAssignment = GetUpdatedJobAssignment(jobAssignment);

            return Ok(new { getUpdatedJobAssignment, statusText = _statusTextService.Success });

           
        }


        public JobAssignment GetUpdatedJobAssignment(JobAssignment jobAssignment)
        {
            return _context.JobAssignments.FirstOrDefault(x => x.Id == jobAssignment.Id);
        }


        public void AddNewStageComments(List<PipelineStageComment> stageComments)
        {
            _context.PipelineStageComments.AddRange(stageComments);
        }



        public void  RemoveOldScores(JobAssignment jobAssignment)
        {
            List<PipelineStageScore> stageScore = _context.PipelineStageScores
                .Where(x => x.JobAssignmentId == jobAssignment.Id)
                .ToList();

            List<PipelineStageCriterionScore> criteriaScore = _context.PipelineStageCriterionScores
                .Where(x => x.JobAssignmentId == jobAssignment.Id)
                .ToList();

            _context.PipelineStageScores.RemoveRange(stageScore);
            _context.PipelineStageCriterionScores.RemoveRange(criteriaScore);
        

        }

        public void AddNewScores(JobAssignment jobAssignment)
        {
            _context.PipelineStageScores.AddRange(jobAssignment.PipelineStageScores);
            _context.PipelineStageCriterionScores.AddRange(jobAssignment.PipelineStageCriterionScores);
        }




        [HttpPost]
        [Route("api/AddJobAssignment")]
        public IHttpActionResult AddJobAssignment(JobAssignment jobAssignment)
        {
            SharedService sharedService = new SharedService();
            JobAssignment getJobAssignment = sharedService.OnAddJobAssignment(jobAssignment);

            if (getJobAssignment == null)
            {
                return Ok(new {statusText = _statusTextService.SomethingWentWrong});
            }

            _context.JobAssignments.Add(getJobAssignment);
            _context.SaveChanges();

            return Ok(new { jobAssignment, statusText = _statusTextService.Success});
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

            List<GeneralComment> generalComments = _context.GeneralComments
                .Where(x => x.JobAssignmentId == getJobAssignment.Id)
                .ToList();

            List<PipelineStageScore> pipelineStageScores = _context.PipelineStageScores
                .Where(x => x.JobAssignmentId == getJobAssignment.Id)
                .ToList();

            List<PipelineStageCriterionScore> pipelineStageCriterionScores = _context.PipelineStageCriterionScores
                .Where(x => x.JobAssignmentId == getJobAssignment.Id)
                .ToList();

            _context.GeneralComments.RemoveRange(generalComments);
            _context.PipelineStageScores.RemoveRange(pipelineStageScores);
            _context.PipelineStageCriterionScores.RemoveRange(pipelineStageCriterionScores);

            _context.JobAssignments.Remove(getJobAssignment);
            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });

        }
    }
}
