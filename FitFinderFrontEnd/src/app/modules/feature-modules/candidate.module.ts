import {NgModule} from '@angular/core';
import {CandidatesComponent} from '../../components/candidates/candidates.component';
import {AddNewCandidateComponent} from '../../components/candidates/add-new-candidate/add-new-candidate.component';
import {CandidatePanelComponent} from '../../components/candidates/candidate-panel/candidate-panel.component';
import {CandidateIdComponent} from '../../components/candidates/candidate-id/candidate-id.component';
import {CandidateInterviewComponent} from '../../components/candidates/candidate-id/candidate-interview/candidate-interview.component';
import {CommonModule} from '@angular/common';
import {CandidateRoutingModule} from './candidate-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {StarRatingModule} from 'angular-star-rating';
import {PipeModule} from '../shared-modules/pipe.module';
import {DialogModule} from '../shared-modules/dialog.module';
import {EditCandidateComponent} from '../../components/candidates/edit-candidate/edit-candidate.component';
import {CandidateOverviewComponent} from '../../components/candidates/candidate-overview/candidate-overview.component';


@NgModule({
  declarations: [
    CandidatesComponent,
    CandidateIdComponent,
    EditCandidateComponent,
    CandidatePanelComponent,
    AddNewCandidateComponent,
    CandidateOverviewComponent,
    CandidateInterviewComponent
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
