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
import {CandidatesResolverService} from '../route-resolvers/candidates-resolver.service';
import {
  InterviewsResolverService} from '../route-resolvers/interviews-resolver.service';
import {JobsResolverService} from '../route-resolvers/jobs-resolver.service';
import {ManageCompaniesComponent} from '../components/settings/manage-companies/manage-companies.component';
import {DisqualifyReasonsComponent} from '../components/settings/disqualify-reasons/disqualify-reasons.component';
import {WorkflowsComponent} from '../components/settings/workflows/workflows.component';
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
import {PipelineComponent} from '../components/settings/workflows/pipeline/pipeline.component';
import {WorkflowsResolverService} from '../route-resolvers/workflows-resolver.service';
import {JobTypesResolverService} from '../route-resolvers/job-types-resolver.service';
import {JobFunctionsResolverService} from '../route-resolvers/job-functions-resolver.service';
import {DepartmentsResolverService} from '../route-resolvers/departments-resolver.service';
import {SourcesResolverService} from '../route-resolvers/sources-resolver.service';
import {TagsResolverService} from '../route-resolvers/tags-resolver.service';
import {RejectedReasonsResolverService} from '../route-resolvers/rejected-reasons-resolver.service';
import {WithdrawnReasonsResolverService} from '../route-resolvers/withdrawn-reasons-resolver.service';
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
import {CompaniesResolverService} from '../route-resolvers/companies-resolver.service';
import {UserAccountsResolverService} from '../route-resolvers/user-accounts-resolver.service';
import {CompanyIdComponent} from '../components/settings/manage-companies/company-id/company-id.component';
import {ManageUserAccountsComponent} from '../components/settings/manage-user-accounts/manage-user-accounts.component';
import {AddNewUserAccountComponent} from '../components/settings/manage-user-accounts/add-new-user-account/add-new-user-account.component';
import {UserAccountPanelComponent} from '../components/settings/manage-user-accounts/user-account-panel/user-account-panel.component';
import {UserAccountIdComponent} from '../components/settings/manage-user-accounts/user-account-id/user-account-id.component';
import {EditUserAccountComponent} from '../components/settings/manage-user-accounts/edit-user-account/edit-user-account.component';
import {RolesResolverService} from '../route-resolvers/roles-resolver.service';
import {ProfileDetailComponent} from '../components/settings/profile/profile-detail/profile-detail.component';
import {EditProfileComponent} from '../components/settings/profile/edit-profile/edit-profile.component';
import {ChangeProfilePasswordComponent} from '../components/settings/profile/change-profile-password/change-profile-password.component';
import {CompanyResolverService} from '../route-resolvers/company-resolver.service';
import {CandidateResolverService} from '../route-resolvers/candidate-resolver.service';
import {InterviewResolverService} from '../route-resolvers/interview-resolver.service';
import {JobResolverService} from '../route-resolvers/job-resolver.service';
import {UserAccountResolverService} from '../route-resolvers/user-account-resolver.service';
import {CurrentUserAccountResolverService} from '../route-resolvers/current-user-account-resolver.service';
import {WorkflowListComponent} from '../components/settings/workflows/workflow-list/workflow-list.component';
import {DefaultWorkflowResolverService} from '../route-resolvers/default-workflow-resolver.service';
import {WorkflowResolverService} from '../route-resolvers/workflow-resolver.service';
import {AddNewWorkflowComponent} from '../components/settings/workflows/add-new-workflow/add-new-workflow.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve:
      {
        candidates: CandidatesResolverService,
        interviews: InterviewsResolverService,
        jobs: JobsResolverService,
        departments: DepartmentsResolverService,
        sources: SourcesResolverService
      }
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [AuthGuard],
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
            jobs: JobsResolverService,
            departments: DepartmentsResolverService
          }
      },
      {
        path: 'add-new-job',
        component: AddNewJobComponent,
        resolve:
          {
            jobTypes: JobTypesResolverService,
            jobFunctions: JobFunctionsResolverService,
            departments: DepartmentsResolverService
          }
      },
      {
        path: ':job-id',
        component: JobIdComponent,
        resolve:
          {
            job: JobResolverService,
            departments: DepartmentsResolverService
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
            component: JobInfoComponent,
            resolve:
              {
                job: JobResolverService,
                departments: DepartmentsResolverService,
                jobFunctions: JobFunctionsResolverService
              }
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
            jobs: JobsResolverService,
            sources: SourcesResolverService,
            candidates: CandidatesResolverService
          }
      },
      {
        path: 'add-new-candidate',
        component: AddNewCandidateComponent,
        resolve:
          {
            jobs: JobsResolverService,
            sources: SourcesResolverService
          }
      },
      {
        path: ':candidate-id',
        component: CandidateIdComponent,
        resolve:
          {
            jobs: JobsResolverService,
            sources: SourcesResolverService,
            candidate: CandidateResolverService,
            pipelines: WorkflowsResolverService,
            departments: DepartmentsResolverService
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
            interviews: InterviewsResolverService
          }
      },
      {
        path: 'add-new-interview',
        component: AddNewInterviewComponent,
        resolve:
          {
            jobs: JobsResolverService,
            candidates: CandidatesResolverService
          }
      },
      {
        path: ':interview-id',
        component: InterviewIdComponent,
        resolve:
          {
            interview: InterviewResolverService,
            candidates: CandidatesResolverService,
            jobs: JobsResolverService,
            sources: SourcesResolverService
          }
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    resolve:
      {
        defaultWorkflow: DefaultWorkflowResolverService
      },
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'manage-companies',
        component: ManageCompaniesComponent,
        data:
          {
            roles: ['Admin']
          },
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
                companies: CompaniesResolverService
              }
          },
          {
            path: ':id',
            component: CompanyIdComponent,
            resolve:
              {
                company: CompanyResolverService
              }
          },
          {
            path: ':id/edit-company',
            component: EditCompanyComponent,
            resolve:
              {
                company: CompanyResolverService
              }
          }
        ]
      },
      {
        path: 'manage-user-accounts',
        component: ManageUserAccountsComponent,
        data:
          {
            roles: ['HR', 'Admin']
          },
        children:
          [
            {
              path: '',
              redirectTo: 'user-account-panel',
              pathMatch: 'full'
            },
            {
              path: 'add-new-user-account',
              component: AddNewUserAccountComponent,
              resolve:
                {
                  roles: RolesResolverService,
                  departments: DepartmentsResolverService
                }
            },
            {
              path: 'user-account-panel',
              component: UserAccountPanelComponent,
              resolve:
                {
                  userAccounts: UserAccountsResolverService
                }
            },
            {
              path: ':user-account-id',
              component: UserAccountIdComponent,
              resolve:
                {
                  userAccount: UserAccountResolverService,
                  departments: DepartmentsResolverService
                }
            },
            {
              path: ':user-account-id/edit-user-account',
              component: EditUserAccountComponent,
              resolve:
                {
                  userAccount: UserAccountResolverService,
                  departments: DepartmentsResolverService,
                  roles: RolesResolverService
                }
            }
          ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children:
        [
          {
            path: '',
            redirectTo: 'profile-detail',
            pathMatch: 'full'
          },
          {
            path: 'profile-detail',
            component: ProfileDetailComponent,
            resolve:
              {
                currentUserAccount: CurrentUserAccountResolverService,
                company: CompanyResolverService,
                departments: DepartmentsResolverService
              }
          },
          {
            path: 'edit-profile',
            component: EditProfileComponent,
            resolve:
              {
                currentUserAccount: CurrentUserAccountResolverService,
                company: CompanyResolverService,
                departments: DepartmentsResolverService
              }
          },
          {
            path: 'change-profile-password',
            component: ChangeProfilePasswordComponent,
            resolve:
              {
                userAccounts: UserAccountsResolverService
              }
          }
        ]
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
                sources: SourcesResolverService
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
                departments: DepartmentsResolverService
              }
          },
          {
            path: 'job-types',
            component: JobTypesComponent,
            resolve:
              {
                jobTypes: JobTypesResolverService
              }
          },
          {
            path: 'job-functions',
            component: JobFunctionsComponent,
            resolve:
              {
                jobFunctions: JobFunctionsResolverService
              }
          }
        ]
      },
      {
        path: 'workflows',
        component: WorkflowsComponent,
        children:
        [
          {
            path: '',
            redirectTo: 'workflow-list',
            pathMatch: 'full'
          },
          {
            path: 'workflow-list',
            component: WorkflowListComponent,
            resolve:
              {
                workflows: WorkflowsResolverService
              }
          },
          {
            path: 'add-new-workflow',
            component: AddNewWorkflowComponent,
            resolve:
              {
                defaultWorkflow: DefaultWorkflowResolverService
              }
          },
          {
            path: ':workflow-id',
            component: PipelineComponent,
            resolve:
              {
                workflow: WorkflowResolverService
              }
          },
        ]
      },
      {
        path: 'disqualify-reasons',
        component: DisqualifyReasonsComponent,
        resolve:
          {
            withdrawnReasons: WithdrawnReasonsResolverService,
            rejectedReasons: RejectedReasonsResolverService
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
