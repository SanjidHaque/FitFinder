import { Injectable } from '@angular/core';
import {JobType} from '../../models/settings/job-type.model';
import {Department} from '../../models/settings/department.model';
import {JobFunction} from '../../models/settings/job-function.model';
import {Source} from '../../models/settings/source.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {RejectedReason} from '../../models/settings/rejected-reason.model';
import {WithdrawnReason} from '../../models/settings/withdrawn-reason.model';
import {PipelineStage} from '../../models/settings/pipeline-stage.model';
import {Workflow} from '../../models/settings/workflow.model';
import {PipelineStageCriterion} from '../../models/settings/pipeline-stage-criterion.model';

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

  getAllWorkflow() {
    return this.httpClient.get<Workflow[]>(this.rootUrl + '/api/GetAllWorkflow');
  }

  getDefaultWorkflow() {
    return this.httpClient.get(this.rootUrl + '/api/GetDefaultWorkflow');
  }

  getWorkflow(workflowId: number) {
    return this.httpClient.get<Workflow>(`${this.rootUrl + '/api/GetWorkflow'}/${workflowId}`);
  }


  addNewDepartment(department: Department) {
    return this.httpClient.post<Department>(this.rootUrl + '/api/AddNewDepartment', department);
  }

  addNewSource(source: Source) {
    return this.httpClient.post<Source>(this.rootUrl + '/api/AddNewSource', source);
  }

  addNewJobType(jobType: JobType) {
    return this.httpClient.post<JobType>(this.rootUrl + '/api/AddNewJobType', jobType);
  }

  addNewJobFunction(jobFunction: JobFunction) {
    return this.httpClient.post<JobFunction>(this.rootUrl + '/api/AddNewJobFunction', jobFunction);
  }


  editJobType(jobType: JobType) {
    return this.httpClient.put<JobType>(this.rootUrl + '/api/EditJobType', jobType);
  }

  editJobFunction(jobFunction: JobFunction) {
    return this.httpClient.put<JobFunction>(this.rootUrl + '/api/EditJobFunction', jobFunction);
  }

  editSource(source: Source) {
    return this.httpClient.put<Source>(this.rootUrl + '/api/EditSource', source);
  }

  editDepartment(department: Department) {
    return this.httpClient.put<Department>(this.rootUrl + '/api/EditDepartment', department);
  }


  addNewRejectedReason(rejectedReason: RejectedReason) {
    return this.httpClient.post<RejectedReason>(this.rootUrl + '/api/AddNewRejectedReason', rejectedReason);
  }

  addNewWithdrawnReason(withdrawnReason: WithdrawnReason) {
    return this.httpClient.post<WithdrawnReason>(this.rootUrl + '/api/AddNewWithdrawnReason', withdrawnReason);
  }

  editRejectedReason(rejectedReason: RejectedReason) {
    return this.httpClient.put<RejectedReason>(this.rootUrl + '/api/EditRejectedReason', rejectedReason);
  }

  editWithdrawnReason(withdrawnReason: WithdrawnReason) {
    return this.httpClient.put<WithdrawnReason>(this.rootUrl + '/api/EditWithdrawnReason', withdrawnReason);
  }

  getAllRejectedReason() {
    return this.httpClient.get<RejectedReason[]>(this.rootUrl + '/api/GetAllRejectedReason');
  }

  getAllWithdrawnReason() {
    return this.httpClient.get<WithdrawnReason[]>(this.rootUrl + '/api/GetAllWithdrawnReason');
  }

  addNewPipelineStage(pipelineStage: PipelineStage) {
    return this.httpClient.post<PipelineStage>(this.rootUrl + '/api/AddNewPipelineStage', pipelineStage);
  }

  editPipelineStage(pipelineStage: PipelineStage) {
    return this.httpClient.put<PipelineStage>(this.rootUrl + '/api/EditPipelineStage', pipelineStage);
  }

  addNewPipelineStageCriterion(pipelineStageCriterion: PipelineStageCriterion) {
    return this.httpClient.post<PipelineStageCriterion>(this.rootUrl + '/api/AddNewPipelineStageCriterion', pipelineStageCriterion);
  }

  addNewPipelineStageCriteria(pipelineStageCriteria: PipelineStageCriterion[]) {
    return this.httpClient.post<PipelineStageCriterion[]>
    (this.rootUrl + '/api/AddNewPipelineStageCriteria', pipelineStageCriteria);
  }

  editPipelineStageCriterion(pipelineStageCriterion: PipelineStageCriterion) {
    return this.httpClient.put<PipelineStageCriterion>(this.rootUrl + '/api/EditPipelineStageCriterion', pipelineStageCriterion);
  }

  addNewWorkflow(workflow: Workflow) {
    return this.httpClient.post<Workflow>(this.rootUrl + '/api/AddNewWorkflow', workflow);
  }

  editWorkflowName(workflow: Workflow) {
    return this.httpClient.put<Workflow>(this.rootUrl + '/api/EditWorkflowName', workflow);
  }

  deleteRejectedReason(rejectedReasonId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteRejectedReason'}/${rejectedReasonId}`);
  }

  deleteWithdrawnReason(withdrawnReasonId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteWithdrawnReason'}/${withdrawnReasonId}`);
  }

  deleteSource(sourceId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteSource'}/${sourceId}`);
  }

  deleteDepartment(departmentId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteDepartment'}/${departmentId}`);
  }

  deleteJobType(jobTypeId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteJobType'}/${jobTypeId}`);
  }

  deleteJobFunction(jobFunctionId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteJobFunction'}/${jobFunctionId}`);
  }

  deleteWorkflow(workflowId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteWorkflow'}/${workflowId}`);
  }

  deletePipelineStage(pipelineStageId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeletePipelineStage'}/${pipelineStageId}`);
  }

  deletePipelineStageCriterion(pipelineStageCriterionId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeletePipelineStageCriterion'}/${pipelineStageCriterionId}`);
  }
}
