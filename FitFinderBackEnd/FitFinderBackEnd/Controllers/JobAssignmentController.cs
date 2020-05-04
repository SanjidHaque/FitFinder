﻿using System.Collections.Generic;
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
        [Route("api/AddJobAssignments")]
        public IHttpActionResult AddJobAssignments(List<Candidate> candidates)
        {
            SharedService sharedService = new SharedService();
            List<JobAssignment> newJobAssignments = new List<JobAssignment>();

            candidates.ForEach(candidate =>
            {
                JobAssignment getJobAssignment = sharedService.OnAddJobAssignment(candidate.JobAssignments[0]);
                if (getJobAssignment != null)
                {
                    newJobAssignments.Add(getJobAssignment);
                }
            });

           
            _context.JobAssignments.AddRange(newJobAssignments);
            _context.SaveChanges();


            candidates.ForEach(candidate =>
            {
                List<JobAssignment> jobAssignments = _context.JobAssignments
                    .Where(x => x.CandidateId == candidate.Id)
                    .ToList();
                candidate.JobAssignments = jobAssignments;
            });
                
            return Ok(new { candidates, newJobAssignments, statusText = _statusTextService.Success });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/AddGeneralComments")]
        public IHttpActionResult AddGeneralComments(List<GeneralComment> generalComments)
        {
            _context.GeneralComments.AddRange(generalComments);
            _context.SaveChanges();
            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("api/AddNewPipelineStageCriterionScore")]
        public IHttpActionResult AddNewPipelineStageCriterionScore(PipelineStageCriterionScore pipelineStageCriterionScore)
        {
            _context.PipelineStageCriterionScores.Add(pipelineStageCriterionScore);   
            _context.SaveChanges();
            return Ok(new { pipelineStageCriterionScore.Id,  statusText = _statusTextService.Success });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/AddNewPipelineStageScore")]
        public IHttpActionResult AddNewPipelineStageScore(PipelineStageScore pipelineStageScore)
        {
            _context.PipelineStageScores.Add(pipelineStageScore);
            _context.SaveChanges();
            return Ok(new { pipelineStageScore.Id, statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/UpdatePipelineStageCriterionScore")]
        [AllowAnonymous]
        public IHttpActionResult UpdatePipelineStageCriterionScore(PipelineStageCriterionScore pipelineStageCriterionScore)
        {
            PipelineStageCriterionScore getPipelineStageCriterionScore = _context
                .PipelineStageCriterionScores
                .FirstOrDefault(x => x.Id == pipelineStageCriterionScore.Id);

            if (getPipelineStageCriterionScore == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getPipelineStageCriterionScore.Rating = pipelineStageCriterionScore.Rating;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }

        [HttpPut]
        [Route("api/UpdatePipelineStageScore")]
        [AllowAnonymous]
        public IHttpActionResult UpdatePipelineStageScore(PipelineStageScore pipelineStageScore)
        {
            PipelineStageScore getpipelineStageScore = _context
                .PipelineStageScores
                .FirstOrDefault(x => x.Id == pipelineStageScore.Id);

            if (getpipelineStageScore == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            getpipelineStageScore.Rating = pipelineStageScore.Rating;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
        }


        [HttpPut]
        [Route("api/ChangePipelineStage")]
        [AllowAnonymous]
        public IHttpActionResult ChangePipelineStage(JobAssignment jobAssignment)
        {
            JobAssignment getJobAssignment = _context.JobAssignments
                .FirstOrDefault(x => x.Id == jobAssignment.Id);

            if (getJobAssignment == null)
            {
                return Ok(new { statusText = _statusTextService.ResourceNotFound });
            }

            _context.GeneralComments.AddRange(jobAssignment.GeneralComments);
            getJobAssignment.CurrentPipelineStageId = jobAssignment.CurrentPipelineStageId;
            _context.SaveChanges();

            return Ok(new { statusText = _statusTextService.Success });
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
