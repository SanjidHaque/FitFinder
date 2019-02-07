
export class PipelineStageStarRating {
  Id: number;
  AssignedJobToCandidateId: number;
  Rating: number;
  PipelineStageId: number;
  CandidateId: number;
  JobId: number;

  constructor(
    id: number,
    assignedJobToCandidate: number,
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
    this.AssignedJobToCandidateId = assignedJobToCandidate;
  }
}
