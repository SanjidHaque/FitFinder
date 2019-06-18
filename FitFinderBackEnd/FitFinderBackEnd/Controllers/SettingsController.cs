using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using FitFinderBackEnd.Models;
using FitFinderBackEnd.Models.Settings;

namespace FitFinderBackEnd.Controllers
{
    [Authorize]
    public class SettingsController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public SettingsController()
        {
            _context = new ApplicationDbContext();
        }
        [HttpGet]
        [Route("api/GetAllJobType")]
        public IHttpActionResult GetAllJobType(long companyId)
        {
            List<JobType> jobTypes = _context.JobTypes.OrderBy(x => x.Id).ToList();
            return Ok(jobTypes);
        }



        [HttpGet]
        [Route("api/GetAllSource")]
        public IHttpActionResult GetAllSource(long companyId)
        {
            List<Source> sources = _context.Sources.OrderBy(x => x.Id).ToList();
            return Ok(sources);
        }

        [HttpGet]
        [Route("api/GetAllJobFunction")]
        public IHttpActionResult GetAllJobFunction(long companyId)
        {
            List<JobFunction> jobFunctions = _context.JobFunctions.OrderBy(x => x.Id).ToList();
            return Ok(jobFunctions);
        }

        [HttpGet]
        [Route("api/GetAllDepartment")]
        public IHttpActionResult GetAllDepartment(long companyId)
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
        public IHttpActionResult GetAllRejectedReason(long companyId)
        {
            List<RejectedReason> rejectedReasons = _context.RejectedReasons.OrderBy(x => x.Id).ToList();
            return Ok(rejectedReasons);
        }

        [HttpGet]
        [Route("api/GetAllWithdrawnReason")]
        public IHttpActionResult GetAllWithdrawnReason(long companyId)
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
        public IHttpActionResult GetAllPipeline(long companyId)
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
    }
}
