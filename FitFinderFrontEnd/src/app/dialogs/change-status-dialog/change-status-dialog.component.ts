import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/settings/pipeline-stage.model';
import {PipelineStageScore} from '../../models/settings/pipeline-stage-score.model';
import {PipelineStageCriterionScore} from '../../models/settings/pipeline-stage-criterion-score.model';
import {JobAssignmentDataStorageService} from '../../services/data-storage-services/job-assignment-data-storage.service';
import {NotifierService} from 'angular-notifier';

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
              private notifierService: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    for (let i = 0; i < this.data.pipelines.length; i++) {
      for (let j = 0; j < this.data.pipelines[i].PipelineStages.length; j++) {
        this.pipelineStages.push(this.data.pipelines[i].PipelineStages[j]);
      }
    }
    this.currentPipelineStageName = this.pipelineStages[this.data.selectTab].Name;
    this.currentPipelineStageId = this.data.currentPipelineStageId;
  }

  pipelineStageChanged(index: number) {
    this.currentPipelineStageName = this.pipelineStages[index].Name;
    this.currentPipelineStageId = this.pipelineStages[index].Id;
    this.data.comment = '';
    this.data.selectTab = index;
  }


  updatePipelineStageCriterionScore(rating: number, pipelineStageCriterionId: number) {

    const getPipelineStageCriterionScore = this.data.pipelineStageCriterionScores
      .find(x => x.PipelineStageCriterionId === pipelineStageCriterionId);

    if (getPipelineStageCriterionScore === undefined) {

      const pipelineStageCriterionScore = new PipelineStageCriterionScore(
        null,
        null,
        this.data.jobAssignmentId,
        null,
        this.data.candidateId,
        rating,
        null,
        pipelineStageCriterionId
      );

      this.jobAssignmentDataStorageService
        .addNewPipelineStageCriterionScore(pipelineStageCriterionScore)
        .subscribe((data: any) => {

          if (data.statusText !== 'Success') {
            this.notifierService.notify('default', data.statusText);
          } else {
            pipelineStageCriterionScore.Id = data.Id;
            this.data.pipelineStageCriterionScores.push(pipelineStageCriterionScore);
          }

        });

      return;
    }

    if (getPipelineStageCriterionScore.Rating === rating) {
      return;
    }

    const pipelineStageCriterionScore = new PipelineStageCriterionScore(
      getPipelineStageCriterionScore.Id,
      null,
      null,
      null,
      null,
      rating,
      null,
      null
    );

    this.jobAssignmentDataStorageService
      .updatePipelineStageCriterionScore(pipelineStageCriterionScore)
      .subscribe((data: any) => {

        if (data.statusText !== 'Success') {
          this.notifierService.notify('default', data.statusText);
        } else {
          getPipelineStageCriterionScore.Rating = rating;
        }

      });
  }

  updatePipelineStageScore(rating: number, pipelineStageId: number) {
    const getPipelineStageScore = this.data.pipelineStageScores
      .find(x => x.PipelineStageId === pipelineStageId);

    if (getPipelineStageScore === undefined) {

      const pipelineStageScore = new PipelineStageScore(
        null,
        null,
        this.data.jobAssignmentId,
        null,
        pipelineStageId,
        null,
        this.data.candidateId,
        rating
      );

      this.jobAssignmentDataStorageService
        .addNewPipelineStageScore(pipelineStageScore)
        .subscribe((data: any) => {

          if (data.statusText !== 'Success') {
            this.notifierService.notify('default', data.statusText);
          } else {
            pipelineStageScore.Id = data.Id;
            this.data.pipelineStageScores.push(pipelineStageScore);
          }

        });

      return;
    }

    if (getPipelineStageScore.Rating === rating) {
      return;
    }

    const pipelineStageScore = new PipelineStageScore(
      getPipelineStageScore.Id,
      null,
      null,
      null,
      null,
      null,
      null,
      rating
    );

    this.jobAssignmentDataStorageService
      .updatePipelineStageScore(pipelineStageScore)
      .subscribe((data: any) => {

        if (data.statusText !== 'Success') {
          this.notifierService.notify('default', data.statusText);
        } else {
          getPipelineStageScore.Rating = rating;
        }

      });
  }


  getPipelineStageScore(pipelineStageId: number) {
    const getPipelineStageScore = this.data.pipelineStageScores
      .find(x => x.PipelineStageId === pipelineStageId);

    if (getPipelineStageScore === undefined) {
      return 0;
    }

    return getPipelineStageScore.Rating;
  }

  getPipelineStageCriterionScore(pipelineStageCriterionId: number) {
    const getPipelineStageCriterionScore = this.data.pipelineStageCriterionScores
      .find(x => x.PipelineStageCriterionId === pipelineStageCriterionId);

    if (getPipelineStageCriterionScore === undefined) {
      return 0;
    }

    return getPipelineStageCriterionScore.Rating;
  }

  closeDialog() {
    this.data.currentPipelineStageId = this.currentPipelineStageId;
    this.dialogRef.close(this.data);
  }
}
