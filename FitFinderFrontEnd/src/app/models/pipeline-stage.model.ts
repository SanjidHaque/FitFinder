import {PipelineStageCriteria} from './pipeline-stage-criteria.model';

export class PipelineStage {
  Id: string;
  Name: string;
  Color: string;
  PipelineId: string;
  PipelineStageCriteria: PipelineStageCriteria[];

  constructor(
    id: string,
    name: string,
    color: string,
    pipelineId: string,
    pipelineStageCriteria: PipelineStageCriteria[] = []
  ) {
    this.Id = id;
    this.Name = name;
    this.Color = color;
    this.PipelineId = pipelineId;
    this.PipelineStageCriteria = pipelineStageCriteria;
  }
}
