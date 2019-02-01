export class PipelineStageCriteria {
  Id: number;
  Name: string;
  PipelineStageId: number;
  constructor(
    id: number,
    name: string,
    pipelineStageId: number
  ) {
    this.Id = id;
    this.Name = name;
    this.PipelineStageId = pipelineStageId;
  }
}
