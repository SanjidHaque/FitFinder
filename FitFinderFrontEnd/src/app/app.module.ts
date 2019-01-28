import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './modules/app-routing.module';
import {RouterModule} from '@angular/router';
import {DataStorageService} from './services/data-storage.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CandidatesComponent} from './components/candidates/candidates.component';
import {JobsComponent} from './components/jobs/jobs.component';
import {InterviewsComponent} from './components/interviews/interviews.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AddNewCandidateComponent} from './components/candidates/add-new-candidate/add-new-candidate.component';
import {AddNewInterviewComponent} from './components/interviews/add-new-interview/add-new-interview.component';
import {AddNewJobComponent} from './components/jobs/add-new-job/add-new-job.component';
import {JobPanelComponent} from './components/jobs/job-panel/job-panel.component';
import {CandidatePanelComponent} from './components/candidates/candidate-panel/candidate-panel.component';
import {InterviewPanelComponent} from './components/interviews/interview-panel/interview-panel.component';
import {ProfileComponent} from './components/settings/profile/profile.component';
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
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {
  SelectCandidatesForInterviewDialogComponent} from './components/interviews/add-new-interview/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import { SearchCandidatePipe } from './pipes/search-candidate.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchJobPipe } from './pipes/search-job.pipe';
import { JobIdComponent } from './components/jobs/job-id/job-id.component';
import { JobInfoComponent } from './components/jobs/job-id/job-info/job-info.component';
import { JobCandidatesComponent } from './components/jobs/job-id/job-candidates/job-candidates.component';
import { JobAnalyticsComponent } from './components/jobs/job-id/job-analytics/job-analytics.component';
import {CandidateIdComponent} from './components/candidates/candidate-id/candidate-id.component';
import {CandidateInfoComponent} from './components/candidates/candidate-id/candidate-info/candidate-info.component';
import {CandidateEmailComponent} from './components/candidates/candidate-id/candidate-email/candidate-email.component';
import {CandidateTaskComponent} from './components/candidates/candidate-id/candidate-task/candidate-task.component';
import {CandidateInterviewComponent} from './components/candidates/candidate-id/candidate-interview/candidate-interview.component';
import {InterviewIdComponent} from './components/interviews/interview-id/interview-id.component';
import { TagsComponent } from './components/settings/candidates-and-leads/tags/tags.component';
import { SourcesComponent } from './components/settings/candidates-and-leads/sources/sources.component';
import { DepartmentsComponent } from './components/settings/job-openings/departments/departments.component';
import { TypesComponent } from './components/settings/job-openings/types/types.component';
import { FunctionsComponent } from './components/settings/job-openings/functions/functions.component';
import { PipelineComponent } from './components/settings/workflow/pipeline/pipeline.component';
import {PipelineResolverService} from './route-resolvers/pipeline-resolver.service';
import { CreateSourceComponent } from './dialogs/create-source/create-source.component';
import { CreateTagComponent } from './dialogs/create-tag/create-tag.component';
import {CreateDepartmentComponent} from './dialogs/create-department/create-department.component';
import {CreateJobFunctionComponent} from './dialogs/create-job-function/create-job-function.component';
import {CreateJobTypeComponent} from './dialogs/create-job-type/create-job-type.component';
import {SourceResolverService} from './route-resolvers/source-resolver.service';
import {TagResolverService} from './route-resolvers/tag-resolver.service';
import {JobTypeResolverService} from './route-resolvers/job-type-resolver.service';
import {JobFunctionResolverService} from './route-resolvers/job-function-resolver.service';
import {DepartmentResolverService} from './route-resolvers/department-resolver.service';
import {SettingsService} from './services/settings.service';
import { AddUpdateComponent } from './dialogs/add-update/add-update.component';



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
    DisqualifyReasonsComponent,
    SelectCandidatesForInterviewDialogComponent,
    SearchCandidatePipe,
    CreateJobFunctionComponent,
    CreateJobTypeComponent,
    CreateDepartmentComponent,
    PageNotFoundComponent,
    SearchJobPipe,
    CandidateIdComponent,
    InterviewIdComponent,
    JobIdComponent,
    JobInfoComponent,
    JobCandidatesComponent,
    JobAnalyticsComponent,
    CandidateInfoComponent,
    CandidateTaskComponent,
    CandidateEmailComponent,
    CandidateInterviewComponent,
    TagsComponent,
    SourcesComponent,
    DepartmentsComponent,
    TypesComponent,
    FunctionsComponent,
    PipelineComponent,
    CreateSourceComponent,
    CreateTagComponent,
    AddUpdateComponent
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
    AmazingTimePickerModule,
    AngularEditorModule,
    StarRatingModule.forRoot(),
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
    PipelineResolverService,
    SourceResolverService,
    TagResolverService,
    JobTypeResolverService,
    JobFunctionResolverService,
    DepartmentResolverService,
    JobResolverService,
    SettingsService
  ],
  entryComponents: [
    SelectCandidatesForInterviewDialogComponent,
    CreateDepartmentComponent,
    CreateJobFunctionComponent,
    CreateJobTypeComponent,
    CreateSourceComponent,
    CreateTagComponent,
    AddUpdateComponent
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
