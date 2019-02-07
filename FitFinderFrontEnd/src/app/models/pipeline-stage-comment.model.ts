
export class StageComment {
  Id: number;
  JobAssignedId: number;
  PipelineStageId: number;
  CandidateId: number;
  JobId: number;
  Comment: string;

  constructor(
    id: number,
    jobAssignedId: number,
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
    this.JobAssignedId = jobAssignedId;
  }
}
