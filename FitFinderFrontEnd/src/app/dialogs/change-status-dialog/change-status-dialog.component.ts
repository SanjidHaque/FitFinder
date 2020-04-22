import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PipelineStage} from '../../models/settings/pipeline-stage.model';
import {PipelineStageScore} from '../../models/settings/pipeline-stage-score.model';
import {PipelineStageCriterionScore} from '../../models/settings/pipeline-stage-criterion-score.model';
import {JobAssignmentDataStorageService} from '../../services/data-storage-services/job-assignment-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GeneralComment} from '../../models/candidate/general-comment.model';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent implements OnInit {
  commentForm: FormGroup;
  noWhitespaceRegExp: RegExp = new RegExp('\\S');

  currentPipelineStageId: number;
  currentPipelineStageName: string;
  currentUserName = '';

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
    this.currentUserName = localStorage.getItem('userName');

    this.commentForm = new FormGroup({
      'comment' : new FormControl('', Validators.pattern(this.noWhitespaceRegExp))
    });
  }

  pipelineStageChanged(index: number) {
    this.currentPipelineStageName = this.pipelineStages[index].Name;
    this.currentPipelineStageId = this.pipelineStages[index].Id;
    this.commentForm.controls['comment'].setValue('');
    this.data.selectTab = index;
  }


  updatePipelineStageCriterionScore(rating: number,
                                    pipelineStageCriterionId: number,
                                    pipelineStageCriterionName: string) {

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

            const comment = this.currentUserName
              + '  changed score from 0 star to '
              + rating
              + ' star in '
              + pipelineStageCriterionName
              + ' of '
              + this.currentPipelineStageName
              + '.';

            const generalComment = new GeneralComment(
              null,
              comment,
              null,
              this.data.jobAssignmentId
            );

            this.data.generalComments.push(generalComment);

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

          const comment = this.currentUserName
            + '  changed score from '
            + getPipelineStageCriterionScore.Rating
            + ' star to '
            + rating
            + ' star in '
            + pipelineStageCriterionName
            + ' of '
            + this.currentPipelineStageName
            + '.';

          const generalComment = new GeneralComment(
            null,
            comment,
            null,
            this.data.jobAssignmentId
          );

          this.data.generalComments.push(generalComment);

          getPipelineStageCriterionScore.Rating = rating;
        }

      });
  }

  updatePipelineStageScore(rating: number,
                           pipelineStageId: number) {
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

            const comment = this.currentUserName
              + '  changed score from 0 star to '
              + rating
              + ' star in '
              + this.currentPipelineStageName
              + '.';

            const generalComment = new GeneralComment(
              null,
              comment,
              null,
              this.data.jobAssignmentId
            );

            this.data.generalComments.push(generalComment);

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

          const comment = this.currentUserName
            + '  changed score from '
            + getPipelineStageScore.Rating
            + ' star to '
            + rating
            + ' star in '
            + this.currentPipelineStageName
            + '.';

          const generalComment = new GeneralComment(
            null,
            comment,
            null,
            this.data.jobAssignmentId
          );

          this.data.generalComments.push(generalComment);
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

  confirmClick() {
    if (this.commentForm.controls['comment'].value !== '') {

      const comment = this.currentUserName
        + ' commented at '
        + this.currentPipelineStageName
        + ', "'
        + this.commentForm.controls['comment'].value
        + '"';


      const generalComment = new GeneralComment(
        null,
        comment,
        null,
        this.data.jobAssignmentId
      );
      this.data.generalComments.push(generalComment);
    }

    this.data.currentPipelineStageId = this.currentPipelineStageId;
    this.dialogRef.close(this.data);
  }

  cancelClick() {
    this.dialogRef.close();
  }
}
