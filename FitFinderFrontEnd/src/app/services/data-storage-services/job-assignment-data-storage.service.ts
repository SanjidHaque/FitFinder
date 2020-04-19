import { Injectable } from '@angular/core';
import {JobAssignment} from '../../models/candidate/job-assignment.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {PipelineStageScore} from '../../models/settings/pipeline-stage-score.model';
import {PipelineStageCriterionScore} from '../../models/settings/pipeline-stage-criterion-score.model';
import {GeneralComment} from '../../models/candidate/general-comment.model';

@Injectable({
  providedIn: 'root'
})
export class JobAssignmentDataStorageService {
  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }


  addJobAssignment(jobAssignment: JobAssignment) {
    return this.httpClient.post<JobAssignment>(this.rootUrl + '/api/AddJobAssignment',
      jobAssignment);
  }

  updatePipelineStageScore(pipelineStageScore: PipelineStageScore) {
    return this.httpClient.put<PipelineStageScore>(this.rootUrl + '/api/UpdatePipelineStageScore', workflow);
  }

  updatePipelineStageCriterionScore(pipelineStageCriterionScore: PipelineStageCriterionScore) {
    return this.httpClient.put<PipelineStageCriterionScore>(this.rootUrl + '/api/UpdatePipelineStageCriterionScore', workflow);
  }

  addGeneralComment(generalComment: GeneralComment) {
    return this.httpClient.put<GeneralComment>(this.rootUrl + '/api/AddGeneralComment', generalComment);
  }

  updateJobAssignment(jobAssignment: JobAssignment) {
    return this.httpClient.post<JobAssignment>(this.rootUrl + '/api/UpdateJobAssignment',
      jobAssignment);
  }

  removeJobAssignment (jobAssignment: JobAssignment) {
    return this.httpClient.post<JobAssignment>(this.rootUrl + '/api/RemoveJobAssignment',
      jobAssignment);
  }
}
