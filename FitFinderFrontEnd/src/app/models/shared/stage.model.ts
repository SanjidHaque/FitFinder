import {JobAssignment} from '../candidate/job-assignment.model';
import {Candidate} from '../candidate/candidate.model';
import {PipelineStage} from '../settings/pipeline-stage.model';

export class Stage {
  constructor(
    public Id: number,
    public JobAssignment: JobAssignment,
    public JobAssignmentId: number,
    public PipelineStage: PipelineStage,
    public PipelineStageId: number,
    public Candidate: Candidate,
    public CandidateId: number
  ) {
  }
}
