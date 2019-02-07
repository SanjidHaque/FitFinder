import {PipelineStageStarRating} from './pipeline-stage-star-rating.model';
import {PipelineStageCriteriaStarRating} from './pipeline-stage-criteria-star-rating.model';
import {PipelineStageComment} from './pipeline-stage-comment.model';

export class AssignedJobToCandidate {
  public Id: number;
  public CandidateId: number;
  public JobId: number;
  public PipelineStageStarRating: PipelineStageStarRating[];
  public PipelineStageCriteriaStarRating: PipelineStageCriteriaStarRating[];
  public PipelineStageComment: PipelineStageComment[];

  constructor(
    id: number,
    candidateId: number,
    jobId: number,
    pipelineStageStarRating: PipelineStageStarRating[] = [],
    pipelineStageCriteriaStarRating: PipelineStageCriteriaStarRating[] = [],
    pipelineStageComment: PipelineStageComment[]
  ) {
    this.Id = id;
    this.CandidateId = candidateId;
    this.JobId = jobId;
    this.PipelineStageStarRating = pipelineStageStarRating;
    this.PipelineStageCriteriaStarRating = pipelineStageCriteriaStarRating;
    this.PipelineStageComment = pipelineStageComment;
  }
}
