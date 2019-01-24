export class PipelineStageCriteriaStarRating {
  Id: string;
  Rating: number;
  PipelineStageCriteriaId: string;
  CandidateId: string;

  constructor(
    id: string,
    rating: number,
    pipelineStageCriteriaId: string,
    candidateId: string
  ) {
    this.Id = id;
    this.Rating = rating;
    this.PipelineStageCriteriaId = pipelineStageCriteriaId;
    this.CandidateId = candidateId;
  }
}
