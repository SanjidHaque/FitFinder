import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './modules/app-routing.module';
import {RouterModule} from '@angular/router';
import {DataStorageService} from './services/data-storage.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {HeaderComponent} from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { InterviewsComponent } from './components/interviews/interviews.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddNewCandidateComponent } from './components/candidates/add-new-candidate/add-new-candidate.component';
import { AddNewInterviewComponent } from './components/interviews/add-new-interview/add-new-interview.component';
import { AddNewJobComponent } from './components/jobs/add-new-job/add-new-job.component';
import { JobPanelComponent } from './components/jobs/job-panel/job-panel.component';
import { CandidatePanelComponent } from './components/candidates/candidate-panel/candidate-panel.component';
import {InterviewPanelComponent} from './components/interviews/interview-panel/interview-panel.component';
import { ProfileComponent } from './components/settings/profile/profile.component';
import {CandidateResolverService} from './route-resolvers/candidate-resolver.service';
import {CandidateService} from './services/candidate.service';
import {InterviewService} from './services/interview.service';
import {InterviewResolverService} from './route-resolvers/interview-resolver.service';
import {JobResolverService} from './route-resolvers/job-resolver.service';
import { ManageAccountComponent } from './components/settings/manage-account/manage-account.component';
import { ManageUsersComponent } from './components/settings/manage-users/manage-users.component';
import { CandidatesAndLeadsComponent } from './components/settings/candidates-and-leads/candidates-and-leads.component';
import { JobOpeningsComponent } from './components/settings/job-openings/job-openings.component';
import { WorkflowComponent } from './components/settings/workflow/workflow.component';
import { DisqualifyReasonsComponent } from './components/settings/disqualify-reasons/disqualify-reasons.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    CandidatesComponent,
    JobsComponent,
    InterviewsComponent,
    SettingsComponent,
    AddNewCandidateComponent,
    AddNewInterviewComponent,
    AddNewJobComponent,
    JobPanelComponent,
    CandidatePanelComponent,
    InterviewPanelComponent,
    ProfileComponent,
    ManageAccountComponent,
    ManageUsersComponent,
    CandidatesAndLeadsComponent,
    JobOpeningsComponent,
    WorkflowComponent,
    DisqualifyReasonsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'bottom',
          distance: 12,
          gap: 10
        }
      },
      behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      }
    })
  ],

  providers: [
    DataStorageService,
    CandidateService,
    InterviewService,
    CandidateResolverService,
    InterviewResolverService,
    JobResolverService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
