export class PipelineStageCriteria {
  Id: number;
  Name: string;
  PipelineStageId: number;
  JobId: number;

  constructor(
    id: number,
    name: string,
    pipelineStageId: number,
    jobId: number
  ) {
    this.Id = id;
    this.Name = name;
    this.PipelineStageId = pipelineStageId;
    this.JobId = jobId;
  }
}
