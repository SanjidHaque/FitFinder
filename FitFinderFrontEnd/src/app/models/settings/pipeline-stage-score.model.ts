import {JobAssignment} from '../candidate/job-assignment.model';
import {PipelineStage} from './pipeline-stage.model';
import {Candidate} from '../candidate/candidate.model';
import {PipelineStageComment} from './pipeline-stage-comment.model';

export class PipelineStageScore {
  constructor(
    public Id: number,
    public JobAssignment: JobAssignment,
    public JobAssignmentId: number,
    public PipelineStage: PipelineStage,
    public PipelineStageId: number,
    public Candidate: Candidate,
    public CandidateId: number,
    public Rating: number,
    public PipelineStageComments: PipelineStageComment[]
  ) {
  }
}
