import {PipelineStage} from './pipeline-stage.model';
import {Job} from '../job/job.model';

export class PipelineStageCriterion {
  constructor(
    public Id: number,
    public Name: string,
    public PipelineStage: PipelineStage,
    public PipelineStageId: number,
    public Job: Job,
    public JobId: number
  ) {
  }
}
