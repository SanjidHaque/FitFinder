export class CriteriaScore {
  Id: number;
  JobAssignedId: number;
  Rating: number;
  PipelineStageCriteriaId: number;
  CandidateId: number;
  JobId: number;

  constructor(
    id: number,
    jobAssignedId: number,
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
    this.JobAssignedId = jobAssignedId;
  }
}
