import {PipelineStageCriteria} from './pipeline-stage-criteria.model';

export class PipelineStage {
  Id: number;
  Name: string;
  Color: string;
  PipelineId: number;
  PipelineStageCriteria: PipelineStageCriteria[];

  constructor(
    id: number,
    name: string,
    color: string,
    pipelineId: number,
    pipelineStageCriteria: PipelineStageCriteria[] = []
  ) {
    this.Id = id;
    this.Name = name;
    this.Color = color;
    this.PipelineId = pipelineId;
    this.PipelineStageCriteria = pipelineStageCriteria;
  }
}
