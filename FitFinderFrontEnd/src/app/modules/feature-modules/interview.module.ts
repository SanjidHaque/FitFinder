import {NgModule} from '@angular/core';
import {InterviewsComponent} from '../../components/interviews/interviews.component';
import {AddNewInterviewComponent} from '../../components/interviews/add-new-interview/add-new-interview.component';
import {InterviewPanelComponent} from '../../components/interviews/interview-panel/interview-panel.component';
import {SelectCandidatesForInterviewDialogComponent} from '../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {InterviewIdComponent} from '../../components/interviews/interview-id/interview-id.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../shared-modules/pipe.module';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {InterviewRoutingModule} from './interview-routing.module';
import {StarRatingModule} from 'angular-star-rating';
import {DialogModule} from '../shared-modules/dialog.module';
import {AmazingTimePickerModule} from 'amazing-time-picker';

@NgModule({
  declarations: [
    InterviewsComponent,
    AddNewInterviewComponent,
    InterviewIdComponent,
    InterviewPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    DialogModule,
    AmazingTimePickerModule,
    PipeModule,
    InterviewRoutingModule,
    StarRatingModule.forChild()
  ]
})
export class InterviewModule {}
