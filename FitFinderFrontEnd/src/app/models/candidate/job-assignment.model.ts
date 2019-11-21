import {StageScore} from '../settings/stage-score.model';
import {CriteriaScore} from '../settings/criteria-score.model';
import {StageComment} from '../settings/stage-comment.model';
import {Job} from '../job/job.model';
import {Candidate} from './candidate.model';

export class JobAssignment {
  constructor(
    public Id: number,
    public Candidate: Candidate,
    public CandidateId: number,
    public Job: Job,
    public JobId: number,
    public StageScores: StageScore[],
    public CriteriaScores: CriteriaScore[],
    public StageComments: StageComment[],
    public CurrentStageId: number,
    public IsActive: boolean
  ) {}
}
