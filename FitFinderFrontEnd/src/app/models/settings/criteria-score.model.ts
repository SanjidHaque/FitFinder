import {StageScore} from './stage-score.model';
import {PipelineStageCriterion} from './pipeline-stage-criterion.model';

export class CriteriaScore extends StageScore  {
  constructor(
    public PipelineStageCriterion: PipelineStageCriterion,
    public PipelineStageCriterionId: number
  ) {
  }
}
