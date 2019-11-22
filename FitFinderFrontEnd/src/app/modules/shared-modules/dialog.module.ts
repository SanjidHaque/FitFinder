import {NgModule} from '@angular/core';
import {CandidateScoreCardComponent} from '../../components/candidates/candidate-id/candidate-score-card/candidate-score-card.component';
import {JobAssignmentDialogComponent} from '../../dialogs/job-assignment-dialog/job-assignment-dialog.component';
import {ChangeStatusDialogComponent} from '../../dialogs/change-status-dialog/change-status-dialog.component';
import {SelectCandidatesForInterviewDialogComponent} from '../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {AddUpdateDialogComponent} from '../../dialogs/add-update-dialog/add-update-dialog.component';
import {AddUpdatePipelineStageDialogComponent} from '../../dialogs/add-update-pipeline-stage-dialog/add-update-pipeline-stage-dialog.component';
import {PipelineStageCriteriaDialogComponent} from '../../dialogs/pipeline-stage-criteria-dialog/pipeline-stage-criteria-dialog.component';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from './angular-material.module';
import {PipeModule} from './pipe.module';
import {StarRatingModule} from 'angular-star-rating';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    JobAssignmentDialogComponent,
    ChangeStatusDialogComponent,
    SelectCandidatesForInterviewDialogComponent,
    AddUpdateDialogComponent,
    AddUpdatePipelineStageDialogComponent,
    PipelineStageCriteriaDialogComponent,
    ConfirmationDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    PipeModule,
    ColorPickerModule,
    StarRatingModule.forChild()
  ],
  entryComponents: [
    JobAssignmentDialogComponent,
    ChangeStatusDialogComponent,
    SelectCandidatesForInterviewDialogComponent,
    AddUpdateDialogComponent,
    AddUpdatePipelineStageDialogComponent,
    PipelineStageCriteriaDialogComponent,
    ConfirmationDialogComponent,
    DeleteDialogComponent
  ]
})
export class DialogModule {}
