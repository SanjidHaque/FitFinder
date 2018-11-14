import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './modules/app-routing.module';
import {RouterModule} from '@angular/router';
import {CompanyResolverService} from './route-resolvers/company-resolver.service';
import {DataStorageService} from './services/data-storage.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {DataShareService} from './services/data-share.service';
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
    ProfileComponent
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
        autoHide: 10000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      }
    })
  ],

  providers: [
    DataStorageService,
    DataShareService,
    CompanyResolverService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
