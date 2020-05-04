import { Injectable } from '@angular/core';
import {JobAssignment} from '../../models/candidate/job-assignment.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {PipelineStageScore} from '../../models/settings/pipeline-stage-score.model';
import {PipelineStageCriterionScore} from '../../models/settings/pipeline-stage-criterion-score.model';
import {GeneralComment} from '../../models/candidate/general-comment.model';
import {Candidate} from '../../models/candidate/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class JobAssignmentDataStorageService {
  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }


  addJobAssignments(candidates: Candidate[]) {
    return this.httpClient.post<Candidate[]>(this.rootUrl + '/api/AddJobAssignments',
      candidates);
  }

  addNewPipelineStageScore(pipelineStageScore: PipelineStageScore) {
    return this.httpClient.post<PipelineStageScore>(this.rootUrl + '/api/AddNewPipelineStageScore', pipelineStageScore);
  }

  addNewPipelineStageCriterionScore(pipelineStageCriterionScore: PipelineStageCriterionScore) {
    return this.httpClient.post<PipelineStageCriterionScore>(this.rootUrl + '/api/AddNewPipelineStageCriterionScore', pipelineStageCriterionScore);
  }

  updatePipelineStageScore(pipelineStageScore: PipelineStageScore) {
    return this.httpClient.put<PipelineStageScore>(this.rootUrl + '/api/UpdatePipelineStageScore', pipelineStageScore);
  }

  updatePipelineStageCriterionScore(pipelineStageCriterionScore: PipelineStageCriterionScore) {
    return this.httpClient.put<PipelineStageCriterionScore>(this.rootUrl + '/api/UpdatePipelineStageCriterionScore', pipelineStageCriterionScore);
  }

  addGeneralComment(generalComments: GeneralComment[]) {
    return this.httpClient.post<GeneralComment[]>(this.rootUrl + '/api/AddGeneralComments', generalComments);
  }

  changePipelineStage(jobAssignment: JobAssignment) {
    return this.httpClient.put<JobAssignment>(this.rootUrl + '/api/ChangePipelineStage',
      jobAssignment);
  }

  removeJobAssignment (jobAssignment: JobAssignment) {
    return this.httpClient.post<JobAssignment>(this.rootUrl + '/api/RemoveJobAssignment',
      jobAssignment);
  }
}
