export class PipelineStageStarRating {
  Id: string;
  Rating: number;
  PipelineStageId: string;
  CandidateId: string;

  constructor(
    id: string,
    rating: number,
    pipelineStageId: string,
    candidateId: string
) {
    this.Id = id;
    this.Rating = rating;
    this.PipelineStageId = pipelineStageId;
    this.CandidateId = candidateId;
  }
}
