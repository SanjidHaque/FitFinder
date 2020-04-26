import {NgModule} from '@angular/core';
import {DisplayJobDialogComponent} from '../../dialogs/display-job-dialog/display-job-dialog.component';
import {ChangeStatusDialogComponent} from '../../dialogs/change-status-dialog/change-status-dialog.component';
import {SelectCandidatesDialogComponent} from '../../dialogs/select-candidates-for-interview-dialog/select-candidates-dialog.component';
import {AddUpdateDialogComponent} from '../../dialogs/add-update-dialog/add-update-dialog.component';
import {AddUpdatePipelineStageDialogComponent} from '../../dialogs/add-update-pipeline-stage-dialog/add-update-pipeline-stage-dialog.component';
import {DisplayPipelineStageCriteriaDialogComponent} from '../../dialogs/display-pipeline-stage-criteria-dialog/display-pipeline-stage-criteria-dialog.component';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from './angular-material.module';
import {PipeModule} from './pipe.module';
import {StarRatingModule} from 'angular-star-rating';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    DisplayJobDialogComponent,
    ChangeStatusDialogComponent,
    SelectCandidatesDialogComponent,
    AddUpdateDialogComponent,
    AddUpdatePipelineStageDialogComponent,
    DisplayPipelineStageCriteriaDialogComponent,
    ConfirmationDialogComponent
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
    DisplayJobDialogComponent,
    ChangeStatusDialogComponent,
    SelectCandidatesDialogComponent,
    AddUpdateDialogComponent,
    AddUpdatePipelineStageDialogComponent,
    DisplayPipelineStageCriteriaDialogComponent,
    ConfirmationDialogComponent]
})
export class DialogModule {}
