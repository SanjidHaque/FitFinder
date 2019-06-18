import { Injectable } from '@angular/core';
import {Pipeline} from '../../models/pipeline.model';
import {JobType} from '../../models/job-type.model';
import {Department} from '../../models/department.model';
import {JobFunction} from '../../models/job-function.model';
import {Source} from '../../models/source.model';
import {Tag} from '../../models/tag.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {RejectedReason} from '../../models/rejected-reason.model';
import {WithdrawnReason} from '../../models/withdrawn-reason.model';
import {PipelineStage} from '../../models/pipeline-stage.model';
import {PipelineStageCriteria} from '../../models/pipeline-stage-criteria.model';

@Injectable({
  providedIn: 'root'
})

export class SettingsDataStorageService {
  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }

  getAllSource() {
    return this.httpClient.get<Source[]>(this.rootUrl + '/api/GetAllSource');
  }

  getAllDepartment() {
    return this.httpClient.get<Department[]>(this.rootUrl + '/api/GetAllDepartment');
  }

  getAllJobFunction() {
    return this.httpClient.get<JobFunction[]>(this.rootUrl + '/api/GetAllJobFunction');
  }

  getAllJobType() {
    return this.httpClient.get<JobType[]>(this.rootUrl + '/api/GetAllJobType');
  }

  getAllTag() {
    return this.httpClient.get<Tag[]>(this.rootUrl + '/api/GetAllTag');
  }

  getAllPipeline() {
    return this.httpClient.get<Pipeline[]>(this.rootUrl + '/api/GetAllPipeline');
  }


  addNewDepartment(department: Department) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewDepartment', department);
  }

  addNewTag(tag: Tag) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewTag', tag);
  }

  addNewSource(source: Source) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewSource', source);
  }

  addNewJobType(jobType: JobType) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewJobType', jobType);
  }

  addNewJobFunction(jobFunction: JobFunction) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewJobFunction', jobFunction);
  }

  editTag(tag: Tag) {
    return this.httpClient.put(this.rootUrl + '/api/EditTag', tag);
  }

  editJobType(jobType: JobType) {
    return this.httpClient.put(this.rootUrl + '/api/EditJobType', jobType);
  }

  editJobFunction(jobFunction: JobFunction) {
    return this.httpClient.put(this.rootUrl + '/api/EditJobFunction', jobFunction);
  }

  editSource(source: Source) {
    return this.httpClient.put(this.rootUrl + '/api/EditSource', source);
  }

  editDepartment(department: Department) {
    return this.httpClient.put(this.rootUrl + '/api/EditDepartment', department);
  }


  addNewRejectedReason(rejectedReason: RejectedReason) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewRejectedReason', rejectedReason);
  }

  addNewWithdrawnReason(withdrawnReason: WithdrawnReason) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewWithdrawnReason', withdrawnReason);
  }

  editRejectedReason(rejectedReason: RejectedReason) {
    return this.httpClient.put(this.rootUrl + '/api/EditRejectedReason', rejectedReason);
  }

  editWithdrawnReason(withdrawnReason: WithdrawnReason) {
    return this.httpClient.put(this.rootUrl + '/api/EditWithdrawnReason', withdrawnReason);
  }

  getAllRejectedReason() {
    return this.httpClient.get<RejectedReason[]>(this.rootUrl + '/api/GetAllRejectedReason');
  }

  getAllWithdrawnReason() {
    return this.httpClient.get<WithdrawnReason[]>(this.rootUrl + '/api/GetAllRejectedReason');
  }

  addNewPipelineStage(pipelineStage: PipelineStage) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewPipelineStage', pipelineStage);
  }

  editPipelineStage(pipelineStage: PipelineStage) {
    return this.httpClient.put(this.rootUrl + '/api/EditPipelineStage', pipelineStage);
  }

  addNewPipelineStageCriteria(pipelineStageCriteria: PipelineStageCriteria) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewPipelineStageCriteria', pipelineStageCriteria);
  }

  editPipelineStageCriteria(pipelineStageCriteria: PipelineStageCriteria) {
    return this.httpClient.put(this.rootUrl + '/api/EditPipelineStageCriteria', pipelineStageCriteria);
  }

}
