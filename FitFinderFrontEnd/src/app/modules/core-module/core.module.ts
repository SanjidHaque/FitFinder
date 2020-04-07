import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {AppRoutingModule} from '../../app-routing.module';
import {CandidateDataStorageService} from '../../services/data-storage-services/candidate-data-storage.service';
import {InterviewDataStorageService} from '../../services/data-storage-services/interview-data-storage.service';
import {CandidatesResolverService} from '../../route-resolvers/candidates-resolver.service';
import {InterviewsResolverService} from '../../route-resolvers/interviews-resolver.service';
import {WorkflowsResolverService} from '../../route-resolvers/workflows-resolver.service';
import {CompaniesResolverService} from '../../route-resolvers/companies-resolver.service';
import {SourcesResolverService} from '../../route-resolvers/sources-resolver.service';
import {JobTypesResolverService} from '../../route-resolvers/job-types-resolver.service';
import {JobFunctionsResolverService} from '../../route-resolvers/job-functions-resolver.service';
import {DepartmentsResolverService} from '../../route-resolvers/departments-resolver.service';
import {JobsResolverService} from '../../route-resolvers/jobs-resolver.service';
import {CompanyResolverService} from '../../route-resolvers/company-resolver.service';
import {RolesResolverService} from '../../route-resolvers/roles-resolver.service';
import {SettingsDataStorageService} from '../../services/data-storage-services/settings-data-storage.service';
import {UserAccountDataStorageService} from '../../services/data-storage-services/user-account-data-storage.service';
import {JobDataStorageService} from '../../services/data-storage-services/job-data-storage.service';
import {JobService} from '../../services/shared-services/job.service';
import {CandidateResolverService} from '../../route-resolvers/candidate-resolver.service';
import {JobResolverService} from '../../route-resolvers/job-resolver.service';
import {UserAccountsResolverService} from '../../route-resolvers/user-accounts-resolver.service';
import {UserAccountResolverService} from '../../route-resolvers/user-account-resolver.service';
import {CurrentUserAccountResolverService} from '../../route-resolvers/current-user-account-resolver.service';
import {InterviewResolverService} from '../../route-resolvers/interview-resolver.service';
import {SettingsService} from '../../services/shared-services/settings.service';
import {GapiService} from '../../services/google-api-services/gapi.service';
import {AuthGuard} from '../../auth/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../auth/auth.interceptor';
import {HttpErrorInterceptor} from '../../http-error-interceptor/http-error.interceptor';
import {StarRatingConfigService} from 'angular-star-rating';
import {AttachmentDataStorageService} from '../../services/data-storage-services/attachment-data-storage.service';
import {JobAssignmentDataStorageService} from '../../services/data-storage-services/job-assignment-data-storage.service';
import {CandidateSpecificInterviewResolverService} from '../../route-resolvers/candidate-specific-interview-resolver.service';

export function initGapi(gapiService: GapiService) {
  return () => gapiService.initClient();
}

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    CandidateDataStorageService,
    InterviewDataStorageService,
    CandidatesResolverService,
    InterviewsResolverService,
    WorkflowsResolverService,
    CompaniesResolverService,
    SourcesResolverService,
    JobTypesResolverService,
    JobFunctionsResolverService,
    DepartmentsResolverService,
    JobsResolverService,
    CompanyResolverService,
    RolesResolverService,
    CandidateSpecificInterviewResolverService,
    SettingsDataStorageService,
    UserAccountDataStorageService,
    JobDataStorageService,
    AttachmentDataStorageService,
    JobAssignmentDataStorageService,
    JobService,
    CandidateResolverService,
    JobResolverService,
    UserAccountsResolverService,
    UserAccountResolverService,
    CurrentUserAccountResolverService,
    InterviewResolverService,
    SettingsService,
    GapiService,
    StarRatingConfigService,
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
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initGapi,
      deps: [GapiService],
      multi: true
    }
  ]
})
export class CoreModule {}
