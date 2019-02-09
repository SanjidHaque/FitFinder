import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/pipeline-stage.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  pipelineStages: PipelineStage[] = [];
  currentStageName: string;
  currentStageId: number;
  status = false;

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
  }

  resetCriteriaMark() {

  }

  criteriaScoreChanged(event: any, criteriaId: number) {
    this.status = true;
    for (let j = 0; j < this.data.criteriaScore.length; j++) {
      if (this.data.criteriaScore[j].PipelineStageCriteriaId === criteriaId) {
        this.data.criteriaScore[j].Rating = event.rating;

      }
    }
  }



  stageScoreChanged(event: any, stageId: number) {
    this.status = true;
    for (let j = 0; j < this.data.stageScore.length; j++) {
      if (this.data.stageScore[j].PipelineStageId === stageId) {
        this.data.stageScore[j].Rating = event.rating;

      }
    }
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
