export class PipelineStageStarRating {
  Id: number;
  Rating: number;
  PipelineStageId: number;
  CandidateId: number;

  constructor(
    id: number,
    rating: number,
    pipelineStageId: number,
    candidateId: number
) {
    this.Id = id;
    this.Rating = rating;
    this.PipelineStageId = pipelineStageId;
    this.CandidateId = candidateId;
  }
}
