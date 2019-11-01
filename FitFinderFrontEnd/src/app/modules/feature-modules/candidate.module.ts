import {NgModule} from '@angular/core';
import {CandidatesComponent} from '../../components/candidates/candidates.component';
import {AddNewCandidateComponent} from '../../components/candidates/add-new-candidate/add-new-candidate.component';
import {CandidatePanelComponent} from '../../components/candidates/candidate-panel/candidate-panel.component';
import {SearchCandidatePipe} from '../../pipes/search-candidate.pipe';
import {CandidateIdComponent} from '../../components/candidates/candidate-id/candidate-id.component';
import {CandidateInfoComponent} from '../../components/candidates/candidate-id/candidate-info/candidate-info.component';
import {CandidateTaskComponent} from '../../components/candidates/candidate-id/candidate-task/candidate-task.component';
import {CandidateEmailComponent} from '../../components/candidates/candidate-id/candidate-email/candidate-email.component';
import {CandidateInterviewComponent} from '../../components/candidates/candidate-id/candidate-interview/candidate-interview.component';
import {CandidateScoreCardComponent} from '../../components/candidates/candidate-id/candidate-score-card/candidate-score-card.component';
import {AssignJobToCandidateDialogComponent} from '../../dialogs/assign-job-to-candidate-dialog/assign-job-to-candidate-dialog.component';
import {ChangeStatusDialogComponent} from '../../dialogs/change-status-dialog/change-status-dialog.component';
import {CommonModule} from '@angular/common';
import {CandidateRoutingModule} from './candidate-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {StarRatingModule} from 'angular-star-rating';
import {SearchJobPipe} from '../../pipes/search-job.pipe';
import {PipeModule} from '../shared-modules/pipe.module';
import {DialogModule} from '../shared-modules/dialog.module';


@NgModule({
  declarations: [
    CandidatesComponent,
    AddNewCandidateComponent,
    CandidatePanelComponent,
    CandidateIdComponent,
    CandidateInfoComponent,
    CandidateTaskComponent,
    CandidateEmailComponent,
    CandidateInterviewComponent,
    CandidateScoreCardComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    DialogModule,
    FormsModule,
    PipeModule,
    FormsModule,
    StarRatingModule.forChild()
  ]
})
export class CandidateModule {}
