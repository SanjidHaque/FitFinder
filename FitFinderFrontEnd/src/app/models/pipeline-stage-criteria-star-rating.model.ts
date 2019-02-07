export class PipelineStageCriteriaStarRating {
  Id: number;
  AssignedJobToCandidateId: number;
  Rating: number;
  PipelineStageCriteriaId: number;
  CandidateId: number;
  JobId: number;

  constructor(
    id: number,
    assignedJobToCandidate: number,
    rating: number,
    pipelineStageCriteriaId: number,
    candidateId: number,
    jobId: number
  ) {
    this.Id = id;
    this.Rating = rating;
    this.PipelineStageCriteriaId = pipelineStageCriteriaId;
    this.CandidateId = candidateId;
    this.JobId = jobId;
    this.AssignedJobToCandidateId = assignedJobToCandidate;
  }
}
