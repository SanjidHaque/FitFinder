import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/settings/pipeline-stage.model';
import {StageScore} from '../../models/settings/stage-score.model';
import {CriteriaScore} from '../../models/settings/criteria-score.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent implements OnInit {

  pipelineStages: PipelineStage[] = [];
  currentStageName: string;
  currentStageId: number;
  criteriaScores: CriteriaScore[] = [];


  constructor(
    public dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
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

  resetCriteriaScore(criteriaId: number) {
    for (let j = 0; j < this.data.criteriaScore.length; j++) {
      if (this.data.criteriaScore[j].PipelineStageCriterionId === criteriaId) {
        this.data.criteriaScore[j].Rating = 0;
        return;
      }
    }
  }

  resetStageScore(stageId: number) {
    for (let j = 0; j < this.data.stageScore.length; j++) {
      if (this.data.stageScore[j].PipelineStageId === stageId) {
        this.data.stageScore[j].Rating = 0;
        return;
      }
    }
  }

  criteriaScoreChanged(event: any, pipelineStageCriterionId: number) {
    for (let j = 0; j < this.data.criteriaScore.length; j++) {
      if (this.data.criteriaScore[j].PipelineStageCriterionId === pipelineStageCriterionId) {
        this.data.criteriaScore[j].Rating = event.rating;
        return;
      }
    }
    const criteriaScore = new CriteriaScore(
      null,
      null,
      this.data.candidate.JobAssignments[this.data.candidate.JobAssignments.length - 1].Id,
     null,
      this.data.candidate.Id,
      event.rating,
      null,
      pipelineStageCriterionId
    );
    this.data.criteriaScore.push(criteriaScore);
  }



  stageScoreChanged(event: any, pipelineStageId: number) {
    for (let j = 0; j < this.data.stageScore.length; j++) {
      if (this.data.stageScore[j].PipelineStageId === pipelineStageId) {
        this.data.stageScore[j].Rating = event.rating;
        return;
      }
    }
    const stageScore = new StageScore(
      null,
      null,
      this.data.candidate.JobAssignments[this.data.candidate.JobAssignments.length - 1].Id,
      null,
      pipelineStageId,
      null,
      this.data.candidate.Id,
      event.rating,
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
      if (this.data.criteriaScore[j].PipelineStageCriterionId === criteriaId) {
        return this.data.criteriaScore[j].Rating;
      }
    }
    return 0;
  }


}
