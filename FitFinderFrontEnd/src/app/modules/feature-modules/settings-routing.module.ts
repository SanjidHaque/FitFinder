import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../auth/auth.guard';
import {JobsResolverService} from '../../route-resolvers/jobs-resolver.service';
import {SourcesResolverService} from '../../route-resolvers/sources-resolver.service';
import {WorkflowsResolverService} from '../../route-resolvers/workflows-resolver.service';
import {DepartmentsResolverService} from '../../route-resolvers/departments-resolver.service';
import {JobTypesResolverService} from '../../route-resolvers/job-types-resolver.service';
import {JobFunctionsResolverService} from '../../route-resolvers/job-functions-resolver.service';
import {SettingsComponent} from '../../components/settings/settings.component';
import {DefaultWorkflowResolverService} from '../../route-resolvers/default-workflow-resolver.service';
import {ManageCompaniesComponent} from '../../components/settings/manage-companies/manage-companies.component';
import {AddNewCompanyComponent} from '../../components/settings/manage-companies/add-new-company/add-new-company.component';
import {CompanyPanelComponent} from '../../components/settings/manage-companies/company-panel/company-panel.component';
import {CompaniesResolverService} from '../../route-resolvers/companies-resolver.service';
import {CompanyIdComponent} from '../../components/settings/manage-companies/company-id/company-id.component';
import {CompanyResolverService} from '../../route-resolvers/company-resolver.service';
import {EditCompanyComponent} from '../../components/settings/manage-companies/edit-company/edit-company.component';
import {ManageUserAccountsComponent} from '../../components/settings/manage-user-accounts/manage-user-accounts.component';
import {AddNewUserAccountComponent} from '../../components/settings/manage-user-accounts/add-new-user-account/add-new-user-account.component';
import {RolesResolverService} from '../../route-resolvers/roles-resolver.service';
import {UserAccountPanelComponent} from '../../components/settings/manage-user-accounts/user-account-panel/user-account-panel.component';
import {UserAccountsResolverService} from '../../route-resolvers/user-accounts-resolver.service';
import {UserAccountIdComponent} from '../../components/settings/manage-user-accounts/user-account-id/user-account-id.component';
import {UserAccountResolverService} from '../../route-resolvers/user-account-resolver.service';
import {EditUserAccountComponent} from '../../components/settings/manage-user-accounts/edit-user-account/edit-user-account.component';
import {ProfileComponent} from '../../components/settings/profile/profile.component';
import {ProfileDetailComponent} from '../../components/settings/profile/profile-detail/profile-detail.component';
import {CurrentUserAccountResolverService} from '../../route-resolvers/current-user-account-resolver.service';
import {EditProfileComponent} from '../../components/settings/profile/edit-profile/edit-profile.component';
import {ChangeProfilePasswordComponent} from '../../components/settings/profile/change-profile-password/change-profile-password.component';
import {CandidatesAndLeadsComponent} from '../../components/settings/candidates-and-leads/candidates-and-leads.component';
import {SourcesComponent} from '../../components/settings/candidates-and-leads/sources/sources.component';
import {JobOpeningsComponent} from '../../components/settings/job-openings/job-openings.component';
import {DepartmentsComponent} from '../../components/settings/job-openings/departments/departments.component';
import {JobTypesComponent} from '../../components/settings/job-openings/job-types/job-types.component';
import {JobFunctionsComponent} from '../../components/settings/job-openings/job-functions/job-functions.component';
import {WorkflowsComponent} from '../../components/settings/workflows/workflows.component';
import {WorkflowListComponent} from '../../components/settings/workflows/workflow-list/workflow-list.component';
import {AddNewWorkflowComponent} from '../../components/settings/workflows/add-new-workflow/add-new-workflow.component';
import {PipelineComponent} from '../../components/settings/workflows/pipeline/pipeline.component';
import {WorkflowResolverService} from '../../route-resolvers/workflow-resolver.service';
import {DisqualifyReasonsComponent} from '../../components/settings/disqualify-reasons/disqualify-reasons.component';
import {WithdrawnReasonsResolverService} from '../../route-resolvers/withdrawn-reasons-resolver.service';
import {RejectedReasonsResolverService} from '../../route-resolvers/rejected-reasons-resolver.service';


const settingsRoutes: Routes = [
  {
    path: '',
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
                  companies: CompaniesResolverService
                }
            },
            {
              path: ':id/edit-company',
              component: EditCompanyComponent,
              resolve:
                {
                  companies: CompaniesResolverService
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
                  userAccount: UserAccountResolverService
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
        data:
          {
            roles: ['TeamMember']
          },
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
                  departments: DepartmentsResolverService,
                  jobs: JobsResolverService
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
];

@NgModule({
  imports: [
    RouterModule.forChild(settingsRoutes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
