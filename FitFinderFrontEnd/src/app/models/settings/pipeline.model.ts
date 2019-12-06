import {PipelineStage} from './pipeline-stage.model';
import {Workflow} from './workflow.model';

export class Pipeline {
  constructor(
    public Id: number,
    public Name: string,
    public Workflow: Workflow,
    public WorkflowId: number,
    public PipelineStages: PipelineStage[]
  ) {
  }
}
