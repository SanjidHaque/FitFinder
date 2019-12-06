import {PipelineStageCriterion} from './pipeline-stage-criterion.model';
import {JobAssignment} from '../candidate/job-assignment.model';
import {Candidate} from '../candidate/candidate.model';

export class CriteriaScore {
  constructor(
    public Id: number,
    public JobAssignment: JobAssignment,
    public JobAssignmentId: number,
    public Candidate: Candidate,
    public CandidateId: number,
    public Rating: number,
    public PipelineStageCriterion: PipelineStageCriterion,
    public PipelineStageCriterionId: number
  ) {
  }
}
