import {StageScore} from './stage-score.model';
import {CriteriaScore} from './criteria-score.model';
import {StageComment} from './stage-comment.model';

export class JobAssigned {
  public Id: number;
  public CandidateId: number;
  public JobId: number;
  public StageScore: StageScore[];
  public CriteriaScore: CriteriaScore[];
  public StageComment: StageComment[];
  public CurrentStageId: number;
  public IsActive: boolean;

  constructor(
    id: number,
    candidateId: number,
    jobId: number,
    stageScore: StageScore[] = [],
    criteriaScore: CriteriaScore[] = [],
    stageComment: StageComment[] = [],
    currentStageId: number,
    isActive: boolean
  ) {
    this.Id = id;
    this.CandidateId = candidateId;
    this.JobId = jobId;
    this.StageScore = stageScore;
    this.CriteriaScore = criteriaScore;
    this.StageComment = stageComment;
    this.CurrentStageId = currentStageId;
    this.IsActive = isActive;
  }
}
