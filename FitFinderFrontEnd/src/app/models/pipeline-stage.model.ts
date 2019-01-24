import {PipelineStageCriteria} from './pipeline-stage-criteria.model';

export class PipelineStage {
  Id: string;
  Name: string;
  Color: string;
  PipelineStageCriteria: PipelineStageCriteria[];

  constructor(
    id: string,
    name: string,
    color: string,
    pipelineStageCriteria: PipelineStageCriteria[] = []
  ) {
    this.Id = id;
    this.Name = name;
    this.Color = color;
    this.PipelineStageCriteria = pipelineStageCriteria;
  }
}
