import {PipelineStageCriterion} from './pipeline-stage-criterion.model';
import {Pipeline} from './pipeline.model';

export class PipelineStage {
  constructor(
    public Id: number,
    public Name: string,
    public Color: string,
    public Pipeline: Pipeline,
    public PipelineId: number,
    public PipelineStageCriteria: PipelineStageCriterion[]
  ) {
  }
}
