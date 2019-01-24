export class PipelineStageCriteria {
  Id: string;
  Name: string;
  PipelineStageId: string;
  constructor(
    id: string,
    name: string,
    pipelineStageId: string
  ) {
    this.Id = id;
    this.Name = name;
    this.PipelineStageId = pipelineStageId;
  }
}
