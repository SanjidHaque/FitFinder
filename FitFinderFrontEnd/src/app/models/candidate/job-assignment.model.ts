import {PipelineStageScore} from '../settings/pipeline-stage-score.model';
import {PipelineStageCriterionScore} from '../settings/pipeline-stage-criterion-score.model';
import {Job} from '../job/job.model';
import {Candidate} from './candidate.model';
import {GeneralComment} from './general-comment.model';

export class JobAssignment {
  constructor(
    public Id: number,
    public Candidate: Candidate,
    public CandidateId: number,
    public Job: Job,
    public JobId: number,
    public PipelineStageScores: PipelineStageScore[],
    public PipelineStageCriterionScores: PipelineStageCriterionScore[],
    public GeneralComments: GeneralComment[],
    public CurrentStageId: number,
    public IsActive: boolean
  ) {}
}
