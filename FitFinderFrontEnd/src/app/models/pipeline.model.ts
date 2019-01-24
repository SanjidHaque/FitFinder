import {PipelineStage} from './pipeline-stage.model';

export class Pipeline {
  Id: string;
  Name: string;
  PipelineStage: PipelineStage[];

  constructor(
    id: string,
    name: string,
    pipelineStage: PipelineStage[] = []
  ) {
    this.Id = id;
    this.Name = name;
    this.PipelineStage = pipelineStage;
  }
}
