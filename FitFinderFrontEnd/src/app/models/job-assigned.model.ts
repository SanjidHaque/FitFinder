import {StageScore} from './stage-score.model';
import {CriteriaScore} from './criteria-score.model';
import {StageComment} from './pipeline-stage-comment.model';

export class JobAssigned {
  public Id: number;
  public CandidateId: number;
  public JobId: number;
  public StageScore: StageScore[];
  public CriteriaScore: CriteriaScore[];
  public StageComment: StageComment[];

  constructor(
    id: number,
    candidateId: number,
    jobId: number,
    stageScore: StageScore[] = [],
    criteriaScore: CriteriaScore[] = [],
    stageComment: StageComment[] = []
  ) {
    this.Id = id;
    this.CandidateId = candidateId;
    this.JobId = jobId;
    this.StageScore = stageScore;
    this.CriteriaScore = criteriaScore;
    this.StageComment = stageComment;
  }
}
