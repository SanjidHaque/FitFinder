import {StageScore} from './pipeline-stage-star-rating.model';
import {CriteriaScore} from './pipeline-stage-criteria-star-rating.model';
import {StageComment} from './pipeline-stage-comment.model';

export class JobAssigned {
  public Id: number;
  public CandidateId: number;
  public JobId: number;
  public PipelineStageStarRating: StageScore[];
  public PipelineStageCriteriaStarRating: CriteriaScore[];
  public PipelineStageComment: StageComment[];

  constructor(
    id: number,
    candidateId: number,
    jobId: number,
    pipelineStageStarRating: StageScore[] = [],
    pipelineStageCriteriaStarRating: CriteriaScore[] = [],
    pipelineStageComment: StageComment[]
  ) {
    this.Id = id;
    this.CandidateId = candidateId;
    this.JobId = jobId;
    this.PipelineStageStarRating = pipelineStageStarRating;
    this.PipelineStageCriteriaStarRating = pipelineStageCriteriaStarRating;
    this.PipelineStageComment = pipelineStageComment;
  }
}
