
export class PipelineStageComment {
  Id: number;
  AssignedJobToCandidateId: number;
  PipelineStageId: number;
  CandidateId: number;
  JobId: number;
  Comment: string;

  constructor(
    id: number,
    assignedJobToCandidate: number,
    pipelineStageId: number,
    candidateId: number,
    jobId: number,
    comment: string
  ) {
    this.Id = id;
    this.PipelineStageId = pipelineStageId;
    this.CandidateId = candidateId;
    this.JobId = jobId;
    this.Comment = comment;
    this.AssignedJobToCandidateId = assignedJobToCandidate;
  }
}
