export class PipelineStageCriteriaStarRating {
  Id: number;
  Rating: number;
  PipelineStageCriteriaId: number;
  CandidateId: number;

  constructor(
    id: number,
    rating: number,
    pipelineStageCriteriaId: number,
    candidateId: number
  ) {
    this.Id = id;
    this.Rating = rating;
    this.PipelineStageCriteriaId = pipelineStageCriteriaId;
    this.CandidateId = candidateId;
  }
}
