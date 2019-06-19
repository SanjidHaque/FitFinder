import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CandidatesComponent} from '../components/candidates/candidates.component';
import {JobsComponent} from '../components/jobs/jobs.component';
import {InterviewsComponent} from '../components/interviews/interviews.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {AddNewCandidateComponent} from '../components/candidates/add-new-candidate/add-new-candidate.component';
import {AddNewInterviewComponent} from '../components/interviews/add-new-interview/add-new-interview.component';
import {AddNewJobComponent} from '../components/jobs/add-new-job/add-new-job.component';
import {JobPanelComponent} from '../components/jobs/job-panel/job-panel.component';
import {CandidatePanelComponent} from '../components/candidates/candidate-panel/candidate-panel.component';
import {InterviewPanelComponent} from '../components/interviews/interview-panel/interview-panel.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {ProfileComponent} from '../components/settings/profile/profile.component';
import {CandidateResolverService} from '../route-resolvers/candidate-resolver.service';
import {
  InterviewResolverService} from '../route-resolvers/interview-resolver.service';
import {JobResolverService} from '../route-resolvers/job-resolver.service';
import {ManageCompaniesComponent} from '../components/settings/manage-companies/manage-companies.component';
import {ManageUsersComponent} from '../components/settings/manage-users/manage-users.component';
import {DisqualifyReasonsComponent} from '../components/settings/disqualify-reasons/disqualify-reasons.component';
import {WorkflowComponent} from '../components/settings/workflow/workflow.component';
import {JobOpeningsComponent} from '../components/settings/job-openings/job-openings.component';
import {CandidatesAndLeadsComponent} from '../components/settings/candidates-and-leads/candidates-and-leads.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';
import {CandidateIdComponent} from '../components/candidates/candidate-id/candidate-id.component';
import {JobIdComponent} from '../components/jobs/job-id/job-id.component';
import {JobInfoComponent} from '../components/jobs/job-id/job-info/job-info.component';
import {JobCandidatesComponent} from '../components/jobs/job-id/job-candidates/job-candidates.component';
import {JobAnalyticsComponent} from '../components/jobs/job-id/job-analytics/job-analytics.component';
import {CandidateInfoComponent} from '../components/candidates/candidate-id/candidate-info/candidate-info.component';
import {CandidateEmailComponent} from '../components/candidates/candidate-id/candidate-email/candidate-email.component';
import {CandidateInterviewComponent} from '../components/candidates/candidate-id/candidate-interview/candidate-interview.component';
import {CandidateTaskComponent} from '../components/candidates/candidate-id/candidate-task/candidate-task.component';
import {InterviewIdComponent} from '../components/interviews/interview-id/interview-id.component';
import {SourcesComponent} from '../components/settings/candidates-and-leads/sources/sources.component';
import {TagsComponent} from '../components/settings/candidates-and-leads/tags/tags.component';
import {DepartmentsComponent} from '../components/settings/job-openings/departments/departments.component';
import {JobTypesComponent} from '../components/settings/job-openings/job-types/job-types.component';
import {JobFunctionsComponent} from '../components/settings/job-openings/job-functions/job-functions.component';
import {PipelineComponent} from '../components/settings/workflow/pipeline/pipeline.component';
import {PipelineResolverService} from '../route-resolvers/pipeline-resolver.service';
import {JobTypeResolverService} from '../route-resolvers/job-type-resolver.service';
import {JobFunctionResolverService} from '../route-resolvers/job-function-resolver.service';
import {DepartmentResolverService} from '../route-resolvers/department-resolver.service';
import {SourceResolverService} from '../route-resolvers/source-resolver.service';
import {TagResolverService} from '../route-resolvers/tag-resolver.service';
import {RejectedReasonResolverService} from '../route-resolvers/rejected-reason-resolver.service';
import {WithdrawnReasonResolverService} from '../route-resolvers/withdrawn-reason-resolver.service';
import {CandidateScoreCardComponent} from '../components/candidates/candidate-id/candidate-score-card/candidate-score-card.component';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {ForgotPasswordComponent} from '../components/forgot-password/forgot-password.component';
import {EmailConfirmedComponent} from '../components/email-confirmed/email-confirmed.component';
import {EmailConfirmationLinkExpiredComponent} from '../components/email-confirmation-link-expired/email-confirmation-link-expired.component';
import {AddNewCompanyComponent} from '../components/settings/manage-companies/add-new-company/add-new-company.component';
import {AuthGuard} from '../auth/auth.guard';
import {ForbiddenComponent} from '../components/forbidden/forbidden.component';
import {CompanyPanelComponent} from '../components/settings/manage-companies/company-panel/company-panel.component';
import {EditCompanyComponent} from '../components/settings/manage-companies/edit-company/edit-company.component';
import {CompanyResolverService} from '../route-resolvers/company-resolver.service';
import {AddNewUserAccountComponent} from '../components/settings/manage-users/add-new-user-account/add-new-user-account.component';
import {UserAccountResolverService} from '../route-resolvers/user-account-resolver.service';
import {UserAccountPanelComponent} from '../components/settings/manage-users/user-account-panel/user-account-panel.component';
import {EditUserAccountComponent} from '../components/settings/manage-users/edit-user-account/edit-user-account.component';
import {CompanyIdComponent} from '../components/settings/manage-companies/company-id/company-id.component';
import {UserAccountIdComponent} from '../components/settings/manage-users/user-account-id/user-account-id.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve:
      {
        candidates: CandidateResolverService,
        interviews: InterviewResolverService,
        jobs: JobResolverService,
        departments: DepartmentResolverService,
        sources: SourceResolverService
      }
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [AuthGuard],
    resolve:
      {
        jobs: JobResolverService,
        jobTypes: JobTypeResolverService,
        jobFunctions: JobFunctionResolverService,
        departments: DepartmentResolverService,
        sources: SourceResolverService
      },
    children: [
      {
        path: '',
        redirectTo: 'job-panel',
        pathMatch: 'full'
      },
      {
        path: 'job-panel',
        component: JobPanelComponent,
        resolve:
          {
            jobs: JobResolverService,
            departments: DepartmentResolverService
          }
      },
      {
        path: 'add-new-job',
        component: AddNewJobComponent,
        resolve:
          {
            jobTypes: JobTypeResolverService,
            jobFunctions: JobFunctionResolverService,
            departments: DepartmentResolverService
          }
      },
      {
        path: ':job-id',
        component: JobIdComponent,
        resolve:
          {
            jobs: JobResolverService,
            departments: DepartmentResolverService
          },
        children:
        [
          {
            path: '',
            redirectTo: 'job-info',
            pathMatch: 'full'
          },
          {
            path: 'job-info',
            component: JobInfoComponent
          },
          {
            path: 'job-candidates',
            component: JobCandidatesComponent
          },
          {
            path: 'job-analytics',
            component: JobAnalyticsComponent
          }
        ]
      }
    ]
  },
  {
    path: 'candidates',
    component: CandidatesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'candidate-panel',
        pathMatch: 'full'
      },
      {
        path: 'candidate-panel',
        component: CandidatePanelComponent,
        resolve:
          {
            jobs: JobResolverService,
            sources: SourceResolverService,
            candidates: CandidateResolverService
          }
      },
      {
        path: 'add-new-candidate',
        component: AddNewCandidateComponent,
        resolve:
          {
            jobs: JobResolverService,
            sources: SourceResolverService
          }
      },
      {
        path: ':candidate-id',
        component: CandidateIdComponent,
        resolve:
          {
            jobs: JobResolverService,
            sources: SourceResolverService,
            candidates: CandidateResolverService,
            pipelines: PipelineResolverService
          },
        children:
        [
          {
            path: '',
            redirectTo: 'candidate-scorecard',
            pathMatch: 'full'
          },
          {
            path: 'candidate-info',
            component: CandidateInfoComponent
          },
          {
            path: 'candidate-scorecard',
            component: CandidateScoreCardComponent
          },
          {
            path: 'candidate-email',
            component: CandidateEmailComponent
          },
          {
            path: 'candidate-interview',
            component: CandidateInterviewComponent
          },
          {
            path: 'candidate-task',
            component: CandidateTaskComponent
          }
        ]
      }
    ]
  },

  {
    path: 'interviews',
    canActivate: [AuthGuard],
    component: InterviewsComponent,

    children: [
      {
        path: '',
        redirectTo: 'interview-panel',
        pathMatch: 'full'
      },
      {
        path: 'interview-panel',
        component: InterviewPanelComponent,
        resolve:
          {
            interviews: InterviewResolverService
          }
      },
      {
        path: 'add-new-interview',
        component: AddNewInterviewComponent,
        resolve:
          {
            jobs: JobResolverService,
            candidates: CandidateResolverService
          }
      },
      {
        path: ':interview-id',
        component: InterviewIdComponent,
        resolve:
          {
            interviews: InterviewResolverService,
            candidates: CandidateResolverService,
            jobs: JobResolverService,
            sources: SourceResolverService
          }
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'workflow',
        pathMatch: 'full'
      },
      {
        path: 'manage-companies',
        component: ManageCompaniesComponent,
        children:
        [
          {
            path: '',
            redirectTo: 'company-panel',
            pathMatch: 'full'
          },
          {
            path: 'add-new-company',
            component: AddNewCompanyComponent
          },
          {
            path: 'company-panel',
            component: CompanyPanelComponent,
            resolve:
              {
                companies: CompanyResolverService
              }
          },
          {
            path: ':id',
            component: CompanyIdComponent,
            resolve:
              {
                companies: CompanyResolverService
              }
          },
          {
            path: ':id/edit-company',
            component: EditCompanyComponent
          }
        ]
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        children:
          [
            {
              path: '',
              redirectTo: 'user-account-panel',
              pathMatch: 'full'
            },
            {
              path: 'add-new-user-account',
              component: AddNewUserAccountComponent
            },
            {
              path: 'user-account-panel',
              component: UserAccountPanelComponent,
              resolve:
                {
                  userAccounts: UserAccountResolverService
                }
            },
            {
              path: ':id',
              component: UserAccountIdComponent,
              resolve:
                {
                  userAccounts: UserAccountResolverService
                }
            },
            {
              path: ':id/edit-user-account',
              component: EditUserAccountComponent
            }
          ]
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'candidates-and-leads',
        component: CandidatesAndLeadsComponent,
        children:
        [
          {
            path: '',
            redirectTo: 'sources',
            pathMatch: 'full'
          },
          {
            path: 'sources',
            component: SourcesComponent,
            resolve:
              {
                sources: SourceResolverService
              }
          }
        ]
      },
      {
        path: 'job-openings',
        component: JobOpeningsComponent,
        children:
        [
          {
            path: '',
            redirectTo: 'job-types',
            pathMatch: 'full'
          },
          {
            path: 'departments',
            component: DepartmentsComponent,
            resolve:
              {
                departments: DepartmentResolverService
              }
          },
          {
            path: 'job-types',
            component: JobTypesComponent,
            resolve:
              {
                jobTypes: JobTypeResolverService
              }
          },
          {
            path: 'job-functions',
            component: JobFunctionsComponent,
            resolve:
              {
                jobFunctions: JobFunctionResolverService
              }
          }
        ]
      },
      {
        path: 'workflow',
        component: WorkflowComponent,
        children:
        [
          {
            path: '',
            redirectTo: 'pipeline',
            pathMatch: 'full'
          },
          {
            path: 'pipeline',
            component: PipelineComponent,
            resolve:
              {
                pipelines: PipelineResolverService
              }
          }
        ]
      },
      {
        path: 'disqualify-reasons',
        component: DisqualifyReasonsComponent,
        resolve:
          {
            withdrawnReasons: WithdrawnReasonResolverService,
            rejectedReasons: RejectedReasonResolverService
          }
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'email-confirmed',
    component: EmailConfirmedComponent
  },
  {
    path: 'email-confirmation-dialog-link-expired',
    component: EmailConfirmationLinkExpiredComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path : '',
    redirectTo: '/dashboard',
    pathMatch : 'full'
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [AuthGuard],
  },
  { path: '**',
    redirectTo: '/not-found'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
