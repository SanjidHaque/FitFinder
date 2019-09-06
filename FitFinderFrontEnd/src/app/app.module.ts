import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './modules/app-routing.module';
import {RouterModule} from '@angular/router';
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
import {CandidatesResolverService} from './route-resolvers/candidates-resolver.service';
import {CandidateDataStorageService} from './services/data-storage/candidate-data-storage.service';
import {InterviewDataStorageService} from './services/data-storage/interview-data-storage.service';
import {InterviewsResolverService} from './route-resolvers/interviews-resolver.service';
import {JobsResolverService} from './route-resolvers/jobs-resolver.service';
import { ManageCompaniesComponent } from './components/settings/manage-companies/manage-companies.component';
import { CandidatesAndLeadsComponent } from './components/settings/candidates-and-leads/candidates-and-leads.component';
import { JobOpeningsComponent } from './components/settings/job-openings/job-openings.component';
import { WorkflowComponent } from './components/settings/workflow/workflow.component';
import { DisqualifyReasonsComponent } from './components/settings/disqualify-reasons/disqualify-reasons.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {
  SelectCandidatesForInterviewDialogComponent} from './dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
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
import { JobTypesComponent } from './components/settings/job-openings/job-types/job-types.component';
import { JobFunctionsComponent } from './components/settings/job-openings/job-functions/job-functions.component';
import { PipelineComponent } from './components/settings/workflow/pipeline/pipeline.component';
import {PipelinesResolverService} from './route-resolvers/pipelines-resolver.service';
import {SourcesResolverService} from './route-resolvers/sources-resolver.service';
import {TagsResolverService} from './route-resolvers/tags-resolver.service';
import {JobTypesResolverService} from './route-resolvers/job-types-resolver.service';
import {JobFunctionsResolverService} from './route-resolvers/job-functions-resolver.service';
import {DepartmentsResolverService} from './route-resolvers/departments-resolver.service';
import {SettingsDataStorageService} from './services/data-storage/settings-data-storage.service';
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';
import { AddUpdatePipelineStageDialogComponent } from './dialogs/add-update-pipeline-stage-dialog/add-update-pipeline-stage-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PipelineStageCriteriaDialogComponent } from './dialogs/pipeline-stage-criteria-dialog/pipeline-stage-criteria-dialog.component';
import { CandidateScoreCardComponent } from './components/candidates/candidate-id/candidate-score-card/candidate-score-card.component';
import { AssignJobToCandidateDialogComponent } from './dialogs/assign-job-to-candidate-dialog/assign-job-to-candidate-dialog.component';
import { ChangeStatusDialogComponent } from './dialogs/change-status-dialog/change-status-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import { EmailConfirmedComponent } from './components/email-confirmed/email-confirmed.component';
import { EmailConfirmationLinkExpiredComponent } from './components/email-confirmation-link-expired/email-confirmation-link-expired.component';
import {UserAccountDataStorageService} from './services/data-storage/user-account-data-storage.service';
import { AddNewCompanyComponent } from './components/settings/manage-companies/add-new-company/add-new-company.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {AuthGuard} from './auth/auth.guard';
import {HttpErrorInterceptor} from './http-error-interceptor/http-error.interceptor';
import {AuthInterceptor} from './auth/auth.interceptor';
import {JobDataStorageService} from './services/data-storage/job-data-storage.service';
import {JobService} from './services/shared/job.service';
import { CompanyPanelComponent } from './components/settings/manage-companies/company-panel/company-panel.component';
import { EditCompanyComponent } from './components/settings/manage-companies/edit-company/edit-company.component';
import {CompaniesResolverService} from './route-resolvers/companies-resolver.service';
import { CompanyIdComponent } from './components/settings/manage-companies/company-id/company-id.component';
import {ManageUserAccountsComponent} from './components/settings/manage-user-accounts/manage-user-accounts.component';
import {UserAccountIdComponent} from './components/settings/manage-user-accounts/user-account-id/user-account-id.component';
import {UserAccountPanelComponent} from './components/settings/manage-user-accounts/user-account-panel/user-account-panel.component';
import {AddNewUserAccountComponent} from './components/settings/manage-user-accounts/add-new-user-account/add-new-user-account.component';
import {EditUserAccountComponent} from './components/settings/manage-user-accounts/edit-user-account/edit-user-account.component';
import {RolesResolverService} from './route-resolvers/roles-resolver.service';
import { EditProfileComponent } from './components/settings/profile/edit-profile/edit-profile.component';
import { ChangeProfilePasswordComponent } from './components/settings/profile/change-profile-password/change-profile-password.component';
import {ProfileDetailComponent} from './components/settings/profile/profile-detail/profile-detail.component';
import {CompanyResolverService} from './route-resolvers/company-resolver.service';
import {CandidateResolverService} from './route-resolvers/candidate-resolver.service';
import {JobResolverService} from './route-resolvers/job-resolver.service';
import {InterviewResolverService} from './route-resolvers/interview-resolver.service';
import {UserAccountsResolverService} from './route-resolvers/user-accounts-resolver.service';
import {UserAccountResolverService} from './route-resolvers/user-account-resolver.service';



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
    ManageCompaniesComponent,
    ManageUserAccountsComponent,
    CandidatesAndLeadsComponent,
    JobOpeningsComponent,
    WorkflowComponent,
    DisqualifyReasonsComponent,
    SelectCandidatesForInterviewDialogComponent,
    SearchCandidatePipe,
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
    JobTypesComponent,
    JobFunctionsComponent,
    PipelineComponent,
    AddUpdateDialogComponent,
    AddUpdatePipelineStageDialogComponent,
    PipelineStageCriteriaDialogComponent,
    CandidateScoreCardComponent,
    AssignJobToCandidateDialogComponent,
    ChangeStatusDialogComponent,
    ConfirmationDialogComponent,
    DeleteDialogComponent,
    SignInComponent,
    ForgotPasswordComponent,
    EmailConfirmedComponent,
    EmailConfirmationLinkExpiredComponent,
    AddNewCompanyComponent,
    ForbiddenComponent,
    CompanyPanelComponent,
    EditCompanyComponent,
    EditUserAccountComponent,
    AddNewUserAccountComponent,
    UserAccountPanelComponent,
    UserAccountIdComponent,
    CompanyIdComponent,
    ProfileDetailComponent,
    EditProfileComponent,
    ChangeProfilePasswordComponent
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
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
    NgProgressHttpModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#673ab7',
      min: 20
    }),
    NgProgressRouterModule,
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
        autoHide: 1000000000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      }
    })
  ],

  providers: [
    CandidateDataStorageService,
    InterviewDataStorageService,
    CandidatesResolverService,
    InterviewsResolverService,
    PipelinesResolverService,
    CompaniesResolverService,
    SourcesResolverService,
    TagsResolverService,
    JobTypesResolverService,
    JobFunctionsResolverService,
    DepartmentsResolverService,
    JobsResolverService,
    CompanyResolverService,
    RolesResolverService,
    SettingsDataStorageService,
    UserAccountDataStorageService,
    JobDataStorageService,
    JobService,
    CandidateResolverService,
    JobResolverService,
    UserAccountsResolverService,
    UserAccountResolverService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    SelectCandidatesForInterviewDialogComponent,
    AssignJobToCandidateDialogComponent,
    AddUpdateDialogComponent,
    AddUpdatePipelineStageDialogComponent,
    PipelineStageCriteriaDialogComponent,
    ChangeStatusDialogComponent,
    ConfirmationDialogComponent,
    DeleteDialogComponent
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
