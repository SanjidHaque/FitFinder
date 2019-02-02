	import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Candidate} from '../models/candidate.model';
import {Interview} from '../models/interview.model';
import {Job} from '../models/job.model';
  import {Pipeline} from '../models/pipeline.model';
  import {Source} from '../models/source.model';
  import {Department} from '../models/department.model';
  import {JobFunction} from '../models/job-function.model';
  import {JobType} from '../models/job-type.model';
  import {Tag} from '../models/tag.model';
  import {RejectedReason} from '../models/rejected-reason.model';
  import {WithdrawnReason} from '../models/withdrawn-reason.model';
  import {PipelineStage} from '../models/pipeline-stage.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private httpClient: HttpClient) { }

  private apiRootUrl = 'http://localhost:55586/api/';

  private getAllPipelineJson = 'assets/mock-data/pipelines.json';
  private getAllPipelineApi = 'http://localhost:55586/api/GetAllPipeline';

  private getAllCandidateJson = 'assets/mock-data/candidates.json';
  private getAllCandidateApi = 'http://localhost:55586/api/GetAllCandidate';

  private getAllInterviewJson = 'assets/mock-data/interviews.json';
  private getAllInterviewApi = 'http://localhost:55586/api/GetAllInterview';

  private getAllJobJson = 'assets/mock-data/jobs.json';
  private getAllJobApi = 'http://localhost:55586/api/GetAllJob';

  private getAllSourceJson = 'assets/mock-data/sources.json';
  private getAllSourceApi = 'http://localhost:55586/api/GetAllSource';

  private getAllJobFunctionJson = 'assets/mock-data/job-functions.json';
  private getAllJobFunctionApi = 'http://localhost:55586/api/GetAllJobFunction';

  private getAllJobTypeJson = 'assets/mock-data/job-types.json';
  private getAllJobTypeApi = 'http://localhost:55586/api/GetAllJobType';

  private getAllDepartmentJson = 'assets/mock-data/departments.json';
  private getAllDepartmentApi = 'http://localhost:55586/api/GetAllDepartment';

  private getAllTagJson = 'assets/mock-data/tags.json';
  private getAllTagApi = 'http://localhost:55586/api/GetAllTag';

  private getAllRejectedReasonJson = 'assets/mock-data/rejected-reasons.json';
  private getAllRejectedReasonApi = 'http://localhost:55586/api/GetAllRejectedReason';

  private getAllWithdrawnReasonJson = 'assets/mock-data/withdrawn-reasons.json';
  private getAllWithdrawnReasonApi = 'http://localhost:55586/api/GetAllWithdrawnReason';



  getAllSource() {
    return this.httpClient.get<Source[]>(this.getAllSourceApi);
  }

  getAllDepartment() {
    return this.httpClient.get<Department[]>(this.getAllDepartmentApi);
  }

  getAllJobFunction() {
    return this.httpClient.get<JobFunction[]>(this.getAllJobFunctionApi);
  }

  getAllJobType() {
    return this.httpClient.get<JobType[]>(this.getAllJobTypeApi);
  }

  getAllTag() {
    return this.httpClient.get<Tag[]>(this.getAllTagApi);
  }

  getAllCandidate() {
    return this.httpClient.get<Candidate[]>(this.getAllCandidateJson);
  }

  getAllInterview() {
    return this.httpClient.get<Interview[]>(this.getAllInterviewJson);
  }

  getAllJob() {
    return this.httpClient.get<Job[]>(this.getAllJobJson);
  }

  getAllPipeline() {
    return this.httpClient.get<Pipeline[]>(this.getAllPipelineApi);
  }

  addNewCandidate(candidate: Candidate) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewCandidate', candidate);
  }

  uploadAttachments(attachments: Array<File>) {
    const formData = new FormData();
    for (let i = 0; i < attachments.length; i++) {
      formData.append('Attachments', attachments[i], attachments[i].name);
    }
    return this.httpClient.post(this.apiRootUrl + 'UploadAttachments', formData);
  }

  addNewInterview(interview: Interview) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewInterview', interview);
  }

  addNewJob(job: Job) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewJob', job);
  }

  addNewDepartment(department: Department) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewDepartment', department);
  }

  addNewTag(tag: Tag) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewTag', tag);
  }

  addNewSource(source: Source) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewSource', source);
  }

  addNewJobType(jobType: JobType) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewJobType', jobType);
  }

  addNewJobFunction(jobFunction: JobFunction) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewJobFunction', jobFunction);
  }

  editTag(tag: Tag) {
    return this.httpClient.put(this.apiRootUrl + 'EditTag', tag);
  }

  editJobType(jobType: JobType) {
    return this.httpClient.put(this.apiRootUrl + 'EditJobType', jobType);
  }

  editJobFunction(jobFunction: JobFunction) {
    return this.httpClient.put(this.apiRootUrl + 'EditJobFunction', jobFunction);
  }

  editSource(source: Source) {
    return this.httpClient.put(this.apiRootUrl + 'EditSource', source);
  }

  editDepartment(department: Department) {
    return this.httpClient.put(this.apiRootUrl + 'EditDepartment', department);
  }


  addNewRejectedReason(rejectedReason: RejectedReason) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewRejectedReason', rejectedReason);
  }

  addNewWithdrawnReason(withdrawnReason: WithdrawnReason) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewWithdrawnReason', withdrawnReason);
  }

  editRejectedReason(rejectedReason: RejectedReason) {
    return this.httpClient.put(this.apiRootUrl + 'EditRejectedReason', rejectedReason);
  }

  editWithdrawnReason(withdrawnReason: WithdrawnReason) {
    return this.httpClient.put(this.apiRootUrl + 'EditWithdrawnReason', withdrawnReason);
  }

  getAllRejectedReason() {
    return this.httpClient.get<RejectedReason[]>(this.getAllRejectedReasonApi);
  }

  getAllWithdrawnReason() {
    return this.httpClient.get<WithdrawnReason[]>(this.getAllWithdrawnReasonApi);
  }

  addNewPipelineStage(pipelineStage: PipelineStage) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewPipelineStage', pipelineStage);
  }

  editPipelineStage(pipelineStage: PipelineStage) {
    return this.httpClient.put(this.apiRootUrl + 'EditPipelineStage', pipelineStage);
  }


}
