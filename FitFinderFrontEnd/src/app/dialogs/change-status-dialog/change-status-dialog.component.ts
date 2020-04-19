import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/settings/pipeline-stage.model';
import {PipelineStageScore} from '../../models/settings/pipeline-stage-score.model';
import {PipelineStageCriterionScore} from '../../models/settings/pipeline-stage-criterion-score.model';
import {JobAssignmentDataStorageService} from '../../services/data-storage-services/job-assignment-data-storage.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent implements OnInit {
  currentPipelineStageId: number;
  currentPipelineStageName: string;

  pipelineStages: PipelineStage[] = [];

  constructor(public dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
              private jobAssignmentDataStorageService: JobAssignmentDataStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    for (let i = 0; i < this.data.pipelines.length; i++) {
      for (let j = 0; j < this.data.pipelines[i].PipelineStages.length; j++) {
        this.pipelineStages.push(this.data.pipelines[i].PipelineStages[j]);
      }
    }
    this.currentPipelineStageName = this.pipelineStages[this.data.selectTab].Name;
    this.currentPipelineStageId = this.data.pipelineStageId;
  }

  pipelineStageChanged(index: number) {
    this.currentPipelineStageName = this.pipelineStages[index].Name;
    this.currentPipelineStageId = this.pipelineStages[index].Id;

    this.data.comment = '';
    this.data.selectTab = index;
  }


  updatePipelineStageCriterionScore(event: any, pipelineStageCriterionId?: number) {
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



  updatePipelineStageScore(event: any, pipelineStageId?: number) {
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
      event.rating
    );
    this.data.pipelineStageScores.push(pipelineStageScore);
  }


  getPipelineStageScore(stageId: number) {
    for (let j = 0; j < this.data.pipelineStageScores.length; j++) {
      if (this.data.pipelineStageScores[j].PipelineStageId === stageId) {
        return this.data.pipelineStageScores[j].Rating;
      }
    }
    return 0;
  }

  getPipelineStageCriterionScore(criteriaId: number) {
    for (let j = 0; j < this.data.pipelineStageCriterionScores.length; j++) {
      if (this.data.pipelineStageCriterionScores[j].PipelineStageCriterionId === criteriaId) {
        return this.data.pipelineStageCriterionScores[j].Rating;
      }
    }
    return 0;
  }
}
