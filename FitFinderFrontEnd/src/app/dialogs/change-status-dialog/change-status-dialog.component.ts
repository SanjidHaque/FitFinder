import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/settings/pipeline-stage.model';
import {PipelineStageScore} from '../../models/settings/pipeline-stage-score.model';
import {PipelineStageCriterionScore} from '../../models/settings/pipeline-stage-criterion-score.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent implements OnInit {

  pipelineStages: PipelineStage[] = [];
  currentStageName: string;
  currentStageId: number;


  constructor(
    public dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    for (let i = 0; i < this.data.pipelines.length; i++) {
      for (let j = 0; j < this.data.pipelines[i].PipelineStages.length; j++) {
        this.pipelineStages.push(this.data.pipelines[i].PipelineStages[j]);
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
    for (let j = 0; j < this.data.pipelineStageCriterionScores.length; j++) {
      if (this.data.pipelineStageCriterionScores[j].PipelineStageCriterionId === criteriaId) {
        this.data.pipelineStageCriterionScores[j].Rating = 0;
        return;
      }
    }
  }

  resetStageScore(stageId: number) {
    for (let j = 0; j < this.data.pipelineStageCriterionScores.length; j++) {
      if (this.data.pipelineStageScores[j].PipelineStageId === stageId) {
        this.data.pipelineStageScores[j].Rating = 0;
        return;
      }
    }
  }

  criteriaScoreChanged(event: any, pipelineStageCriterionId: number) {
    for (let j = 0; j < this.data.pipelineStageCriterionScores.length; j++) {
      if (this.data.pipelineStageCriterionScores[j].PipelineStageCriterionId === pipelineStageCriterionId) {
        this.data.pipelineStageCriterionScores[j].Rating = event.rating;
        return;
      }
    }
    const criteriaScore = new PipelineStageCriterionScore(
      null,
      null,
      this.data.candidate.JobAssignments[this.data.candidate.JobAssignments.length - 1].Id,
     null,
      this.data.candidate.Id,
      event.rating,
      null,
      pipelineStageCriterionId
    );
    this.data.pipelineStageCriterionScores.push(criteriaScore);
  }



  stageScoreChanged(event: any, pipelineStageId: number) {
    for (let j = 0; j < this.data.pipelineStageScores.length; j++) {
      if (this.data.pipelineStageScores[j].PipelineStageId === pipelineStageId) {
        this.data.pipelineStageScores[j].Rating = event.rating;
        return;
      }
    }
    const pipelineStageScore = new PipelineStageScore(
      null,
      null,
      this.data.candidate.JobAssignments[this.data.candidate.JobAssignments.length - 1].Id,
      null,
      pipelineStageId,
      null,
      this.data.candidate.Id,
      event.rating,
      []
    );
    this.data.pipelineStageScores.push(pipelineStageScore);
  }


  getStageScore(stageId: number) {
    for (let j = 0; j < this.data.pipelineStageScores.length; j++) {
      if (this.data.pipelineStageScores[j].PipelineStageId === stageId) {
        return this.data.pipelineStageScores[j].Rating;
      }
    }
    return 0;
  }

  getCriteriaScore(criteriaId: number) {
    for (let j = 0; j < this.data.pipelineStageCriterionScores.length; j++) {
      if (this.data.pipelineStageCriterionScores[j].PipelineStageCriterionId === criteriaId) {
        return this.data.pipelineStageCriterionScores[j].Rating;
      }
    }
    return 0;
  }


}
