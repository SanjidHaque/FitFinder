import {PipelineStage} from './pipeline-stage.model';

export class Pipeline {
  Id: number;
  Name: string;
  PipelineStage: PipelineStage[];

  constructor(
    id: number,
    name: string,
    pipelineStage: PipelineStage[] = []
  ) {
    this.Id = id;
    this.Name = name;
    this.PipelineStage = pipelineStage;
  }
}
