import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/pipeline-stage.model';
import {StageScore} from '../../models/stage-score.model';
import {CriteriaScore} from '../../models/criteria-score.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  pipelineStages: PipelineStage[] = [];
  currentStageName: string;
  currentStageId: number;
  criteriaScores: CriteriaScore[] = [];


  constructor(
    public dialogRef: MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    for (let i = 0; i < this.data.pipelines.length; i++) {
      for (let j = 0; j < this.data.pipelines[i].PipelineStage.length; j++) {
        this.pipelineStages.push(this.data.pipelines[i].PipelineStage[j]);
      }
    }
    this.currentStageName =
      this.pipelineStages[this.data.selectTab].Name;
    this.currentStageId = this.data.pipelineStageId;
  }

  tabChange(index: number) {
    this.currentStageName =
      this.pipelineStages[index].Name;
    this.currentStageId = this.pipelineStages[index].Id;
    this.data.comment = '';
    this.data.selectTab = index;
  }

  resetCriteriaMark() {

  }

  criteriaScoreChanged(event: any, criteriaId: number) {
    for (let j = 0; j < this.data.criteriaScore.length; j++) {
      if (this.data.criteriaScore[j].PipelineStageCriteriaId === criteriaId) {
        this.data.criteriaScore[j].Rating = event.rating;
        return;
      }
    }
    const criteriaScore = new CriteriaScore(
      null,
      this.data.candidate.JobAssigned[this.data.candidate.JobAssigned.length - 1].Id,
      event.rating,
      criteriaId,
      this.data.candidate.Id,
      this.data.candidate.JobAssigned[this.data.candidate.JobAssigned.length - 1].JobId
    );
    this.data.criteriaScore.push(criteriaScore);
  }



  stageScoreChanged(event: any, stageId: number) {
    for (let j = 0; j < this.data.stageScore.length; j++) {
      if (this.data.stageScore[j].PipelineStageId === stageId) {
        this.data.stageScore[j].Rating = event.rating;
        return;
      }
    }
    const stageScore = new StageScore(
      null,
      this.data.candidate.JobAssigned[this.data.candidate.JobAssigned.length - 1].Id,
      event.rating,
      stageId,
      this.data.candidate.Id,
      this.data.candidate.JobAssigned[this.data.candidate.JobAssigned.length - 1].JobId
    );
    this.data.stageScore.push(stageScore);
  }


  getStageScore(stageId: number) {
    for (let j = 0; j < this.data.stageScore.length; j++) {
      if (this.data.stageScore[j].PipelineStageId === stageId) {
        return this.data.stageScore[j].Rating;
      }
    }
    return 0;
  }

  getCriteriaScore(criteriaId: number) {

    for (let j = 0; j < this.data.criteriaScore.length; j++) {
      if (this.data.criteriaScore[j].PipelineStageCriteriaId === criteriaId) {
        return this.data.criteriaScore[j].Rating;
      }
    }
    return 0;
  }


}
