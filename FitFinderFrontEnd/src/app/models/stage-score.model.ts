
export class StageScore {
  Id: number;
  JobAssignedId: number;
  Rating: number;
  PipelineStageId: number;
  CandidateId: number;
  JobId: number;

  constructor(
    id: number,
    jobAssignedId: number,
    rating: number,
    pipelineStageId: number,
    candidateId: number,
    jobId: number
    ) {
    this.Id = id;
    this.Rating = rating;
    this.PipelineStageId = pipelineStageId;
    this.CandidateId = candidateId;
    this.JobId = jobId;
    this.JobAssignedId = jobAssignedId;
  }
}
