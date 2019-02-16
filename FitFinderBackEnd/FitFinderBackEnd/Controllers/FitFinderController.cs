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
using System.Web.Routing;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Candidate;
using FitFinderBackEnd.Models.Interview;
using FitFinderBackEnd.Models.Job;
using FitFinderBackEnd.Models.Settings;

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
            _context.Candidates.Add(candidate);

            foreach (var candidateEducation in candidate.CandidateEducation)
            {
                candidateEducation.Id = candidate.Id;
            }
            foreach (var candidateExperience in candidate.CandidateExperience)
            {
                candidateExperience.Id = candidate.Id;
            }

            foreach (var candidateAttachment in candidate.CandidateAttachment)
            {
                candidateAttachment.Id = candidate.Id;
            }

           

            _context.CandidateAttachments.AddRange(candidate.CandidateAttachment);
            _context.CandidateEducations.AddRange(candidate.CandidateEducation);
            _context.CandidateExperiences.AddRange(candidate.CandidateExperience);
            
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("api/UploadAttachments")]
        public IHttpActionResult UploadAttachments()
        {              
            var httpRequest = HttpContext.Current.Request;          
            for (int i = 0; i<  httpRequest.Files.Count; i++)
            {
                var postedFile = httpRequest.Files[i];
                var filePath = HttpContext.Current.Server.MapPath("~/Content/Attachments/" + postedFile.FileName);
                postedFile.SaveAs(filePath);        
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllCandidate")]
        public IHttpActionResult GetAllCandidate()
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


        [HttpPost]
        [Route("api/AddNewJob")]
        public IHttpActionResult AddNewJob(Job job)
        {
            if (job == null)
            {
                return NotFound();
            }

            _context.Jobs.Add(job);
            foreach (var jobAttachment in job.JobAttachment)
            {
                jobAttachment.JobId = job.Id;
            }
            _context.JobAttachments.AddRange(job.JobAttachment);
           
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllJob")]
        public IHttpActionResult GetAllJob()
        {
            List<Job> job = _context.Jobs.
                Include(e => e.JobAttachment).OrderBy(x => x.Id).ToList();
            return Ok(job);
        }

        [HttpGet]
        [Route("api/GetAllJobType")]
        public IHttpActionResult GetAllJobType()
        {
            List<JobType> jobTypes = _context.JobTypes.OrderBy(x => x.Id).ToList();
            return Ok(jobTypes);
        }

        

        [HttpGet]
        [Route("api/GetAllSource")]
        public IHttpActionResult GetAllSource()
        {
            List<Source> sources = _context.Sources.OrderBy(x => x.Id).ToList();
            return Ok(sources);
        }

        [HttpGet]
        [Route("api/GetAllJobFunction")]
        public IHttpActionResult GetAllJobFunction()
        {
            List<JobFunction> jobFunctions = _context.JobFunctions.OrderBy(x => x.Id).ToList();
            return Ok(jobFunctions);
        }

        [HttpGet]
        [Route("api/GetAllDepartment")]
        public IHttpActionResult GetAllDepartment()
        {
            List<Department> departments = _context.Departments.OrderBy(x => x.Id).ToList();
            return Ok(departments);
        }




        [HttpPost]
        [Route("api/AddNewDepartment")]
        public IHttpActionResult AddNewDepartment(Department department)
        {
            if (department == null)
            {
                return NotFound();
            }
            _context.Departments.Add(department);
            _context.SaveChanges();
            return Ok(department);
        }

       

        [HttpPost]
        [Route("api/AddNewSource")]
        public IHttpActionResult AddNewSource(Source source)
        {
            if (source == null)
            {
                return NotFound();
            }
            _context.Sources.Add(source);
            _context.SaveChanges();
            return Ok(source);
        }

        [HttpPost]
        [Route("api/AddNewJobFunction")]
        public IHttpActionResult AddNewJobFunction(JobFunction jobFunction)
        {
            if (jobFunction == null)
            {
                return NotFound();
            }
            _context.JobFunctions.Add(jobFunction);
            _context.SaveChanges();
            return Ok(jobFunction);
        }


        [HttpPost]
        [Route("api/AddNewJobType")]
        public IHttpActionResult AddNewJobType(JobType jobType)
        {
            if (jobType == null)
            {
                return NotFound();
            }
            _context.JobTypes.Add(jobType);
            _context.SaveChanges();
            return Ok(jobType);
        }

        [HttpPut]
        [Route("api/EditJobType")]
        public IHttpActionResult EditJobType(JobType jobType)
        {
            if (jobType == null)
            {
                return NotFound();
            }

            JobType getJobType = _context.JobTypes.FirstOrDefault(x => x.Id == jobType.Id);

            if (getJobType == null)
            {
                return NotFound();
            }
            getJobType.Name = jobType.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditJobFunction")]
        public IHttpActionResult EditJobFunction(JobFunction jobFunction)
        {
            if (jobFunction == null)
            {
                return NotFound();
            }

            JobFunction getJobFunction = _context.JobFunctions.FirstOrDefault(x => x.Id == jobFunction.Id);

            if (getJobFunction == null)
            {
                return NotFound();
            }
            getJobFunction.Name = jobFunction.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditDepartment")]
        public IHttpActionResult EditDepartment(Department department)
        {
            if (department == null)
            {
                return NotFound();
            }

            Department getDepartment = _context.Departments.FirstOrDefault(x => x.Id == department.Id);

            if (getDepartment == null)
            {
                return NotFound();
            }

            getDepartment.Name = department.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditSource")]
        public IHttpActionResult EditSource(Source source)
        {
            if (source == null)
            {
                return NotFound();
            }

            Source getSource = _context.Sources.FirstOrDefault(x => x.Id == source.Id);

            if (getSource == null)
            {
                return NotFound();
            }
            getSource.Name = source.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Route("api/AddNewRejectedReason")]
        public IHttpActionResult AddNewRejectedReason(RejectedReason rejectedReason)
        {
            if (rejectedReason == null)
            {
                return NotFound();
            }
            _context.RejectedReasons.Add(rejectedReason);
            _context.SaveChanges();
            return Ok(rejectedReason);
        }

        [HttpPost]
        [Route("api/AddNewWithdrawnReason")]
        public IHttpActionResult AddNewWithdrawnReason(WithdrawnReason withdrawnReason)
        {
            if (withdrawnReason == null)
            {
                return NotFound();
            }
            _context.WithdrawnReasons.Add(withdrawnReason);
            _context.SaveChanges();
            return Ok(withdrawnReason);
        }

        [HttpGet]
        [Route("api/GetAllRejectedReason")]
        public IHttpActionResult GetAllRejectedReason()
        {
            List<RejectedReason> rejectedReasons = _context.RejectedReasons.OrderBy(x => x.Id).ToList();
            return Ok(rejectedReasons);
        }

        [HttpGet]
        [Route("api/GetAllWithdrawnReason")]
        public IHttpActionResult GetAllWithdrawnReason()
        {
            List<WithdrawnReason> withdrawnReasons = _context.WithdrawnReasons.OrderBy(x => x.Id).ToList();
            return Ok(withdrawnReasons);
        }


        [HttpPut]
        [Route("api/EditRejectedReason")]
        public IHttpActionResult EditRejectedReason(RejectedReason rejectedReason)
        {
            if (rejectedReason == null)
            {
                return NotFound();
            }

            RejectedReason getRejectedReason = _context.RejectedReasons.FirstOrDefault(x => x.Id == rejectedReason.Id);

            if (getRejectedReason == null)
            {
                return NotFound();
            }

            getRejectedReason.Name = rejectedReason.Name;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditWithdrawnReason")]
        public IHttpActionResult EditWithdrawnReason(WithdrawnReason withdrawnReason)
        {
            if (withdrawnReason == null)
            {
                return NotFound();
            }

            WithdrawnReason getWithdrawnReason = _context.WithdrawnReasons.FirstOrDefault(x => x.Id == withdrawnReason.Id);

            if (getWithdrawnReason == null)
            {
                return NotFound();
            }

            getWithdrawnReason.Name = withdrawnReason.Name;
            _context.SaveChanges();

            return Ok();
        }


        [HttpPost]
        [Route("api/AddNewPipeline")]
        public IHttpActionResult AddNewPipeline(Pipeline pipeline)
        {
            _context.Pipelines.Add(pipeline);

            foreach (var pipelineStage in pipeline.PipelineStage)
            {
                pipelineStage.PipelineId = pipeline.Id;
            }

            _context.PipelineStages.AddRange(pipeline.PipelineStage);

            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("api/GetAllPipeline")]
        public IHttpActionResult GetAllPipeline()
        {
            List<Pipeline> pipelines = _context.Pipelines.Include(a => a.PipelineStage.Select(b => b.PipelineStageCriteria))
                .OrderBy(x => x.Id).ToList();
            return Ok(pipelines);
        }

        [HttpPost]
        [Route("api/AddNewPipelineStage")]
        public IHttpActionResult AddNewPipelineStage(PipelineStage pipelineStage)
        {
            if (pipelineStage == null)
            {
                return NotFound();
            }

            _context.PipelineStages.Add(pipelineStage);
            _context.SaveChanges();
            return Ok(pipelineStage);
        }

        [HttpPost]
        [Route("api/AddNewPipelineStageCriteria")]
        public IHttpActionResult AddNewPipelineStageCriteria(PipelineStageCriteria pipelineStageCriteria)
        {
            if (pipelineStageCriteria == null)
            {
                return NotFound();
            }

            _context.PipelineStageCriterias.Add(pipelineStageCriteria);
            _context.SaveChanges();
            return Ok(pipelineStageCriteria);
        }

        [HttpPut]
        [Route("api/EditPipelineStageCriteria")]
        public IHttpActionResult EditPipelineStageCriteria(PipelineStageCriteria pipelineStageCriteria)
        {
            if (pipelineStageCriteria == null)  
            {
                return NotFound();
            }

            PipelineStageCriteria getPipelineStageCriteria = _context.PipelineStageCriterias.FirstOrDefault(x => x.Id == pipelineStageCriteria.Id);

            if (getPipelineStageCriteria == null)
            {
                return NotFound();
            }

            getPipelineStageCriteria.Name = pipelineStageCriteria.Name;

            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/EditPipelineStage")]
        public IHttpActionResult EditPipelineStage(PipelineStage pipelineStage)
        {
            if (pipelineStage == null)
            {
                return NotFound();
            }

            PipelineStage getPipelineStage = _context.PipelineStages.FirstOrDefault(x => x.Id == pipelineStage.Id);

            if (getPipelineStage == null)
            {
                return NotFound();
            }
            getPipelineStage.Name = pipelineStage.Name;
            getPipelineStage.Color = pipelineStage.Color;

            _context.SaveChanges();
           

            return Ok();
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
            getAssignedJob.CurrentStageId = jobAssigned.CurrentStageId;
            _context.SaveChanges();

            RemoveOldScores(jobAssigned);
            AddNewScores(jobAssigned);
            if (jobAssigned.StageComment.Count!=0)
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

