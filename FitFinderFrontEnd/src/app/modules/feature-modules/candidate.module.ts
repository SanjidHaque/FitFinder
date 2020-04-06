import {NgModule} from '@angular/core';
import {CandidatesComponent} from '../../components/candidates/candidates.component';
import {AddNewCandidateComponent} from '../../components/candidates/add-new-candidate/add-new-candidate.component';
import {CandidatePanelComponent} from '../../components/candidates/candidate-panel/candidate-panel.component';
import {CandidateIdComponent} from '../../components/candidates/candidate-id/candidate-id.component';
import {CandidateInfoComponent} from '../../components/candidates/candidate-id/candidate-info/candidate-info.component';
import {CandidateTaskComponent} from '../../components/candidates/candidate-id/candidate-task/candidate-task.component';
import {CandidateEmailComponent} from '../../components/candidates/candidate-id/candidate-email/candidate-email.component';
import {CandidateInterviewComponent} from '../../components/candidates/candidate-id/candidate-interview/candidate-interview.component';
import {CandidateScoreCardComponent} from '../../components/candidates/candidate-id/candidate-score-card/candidate-score-card.component';
import {CommonModule} from '@angular/common';
import {CandidateRoutingModule} from './candidate-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {StarRatingModule} from 'angular-star-rating';
import {PipeModule} from '../shared-modules/pipe.module';
import {DialogModule} from '../shared-modules/dialog.module';
import {EditCandidateComponent} from '../../components/candidates/edit-candidate/edit-candidate.component';


@NgModule({
  declarations: [
    CandidatesComponent,
    CandidateIdComponent,
    CandidateInfoComponent,
    CandidateTaskComponent,
    EditCandidateComponent,
    CandidatePanelComponent,
    CandidateEmailComponent,
    AddNewCandidateComponent,
    CandidateInterviewComponent,
    CandidateScoreCardComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    DialogModule,
    PipeModule,
    FormsModule,
    StarRatingModule.forChild()
  ]
})
export class CandidateModule {}
