import {PipelineStageScore} from './pipeline-stage-score.model';

export class PipelineStageComment {
  constructor(
    public Id: number,
    public Comment: string,
    public PipelineStageScore: PipelineStageScore,
    public PipelineStageScoreId: number
  ) {}
}
