import {NgModule} from '@angular/core';
import {SettingsComponent} from '../../components/settings/settings.component';
import {ProfileComponent} from '../../components/settings/profile/profile.component';
import {ManageCompaniesComponent} from '../../components/settings/manage-companies/manage-companies.component';
import {ManageUserAccountsComponent} from '../../components/settings/manage-user-accounts/manage-user-accounts.component';
import {CandidatesAndLeadsComponent} from '../../components/settings/candidates-and-leads/candidates-and-leads.component';
import {WorkflowsComponent} from '../../components/settings/workflows/workflows.component';
import {DisqualifyReasonsComponent} from '../../components/settings/disqualify-reasons/disqualify-reasons.component';
import {TagsComponent} from '../../components/settings/candidates-and-leads/tags/tags.component';
import {SourcesComponent} from '../../components/settings/candidates-and-leads/sources/sources.component';
import {DepartmentsComponent} from '../../components/settings/job-openings/departments/departments.component';
import {JobTypesComponent} from '../../components/settings/job-openings/job-types/job-types.component';
import {JobFunctionsComponent} from '../../components/settings/job-openings/job-functions/job-functions.component';
import {PipelineComponent} from '../../components/settings/workflows/pipeline/pipeline.component';
import {AddNewCompanyComponent} from '../../components/settings/manage-companies/add-new-company/add-new-company.component';
import {CompanyPanelComponent} from '../../components/settings/manage-companies/company-panel/company-panel.component';
import {EditCompanyComponent} from '../../components/settings/manage-companies/edit-company/edit-company.component';
import {EditUserAccountComponent} from '../../components/settings/manage-user-accounts/edit-user-account/edit-user-account.component';
import {AddNewUserAccountComponent} from '../../components/settings/manage-user-accounts/add-new-user-account/add-new-user-account.component';
import {UserAccountPanelComponent} from '../../components/settings/manage-user-accounts/user-account-panel/user-account-panel.component';
import {UserAccountIdComponent} from '../../components/settings/manage-user-accounts/user-account-id/user-account-id.component';
import {CompanyIdComponent} from '../../components/settings/manage-companies/company-id/company-id.component';
import {ProfileDetailComponent} from '../../components/settings/profile/profile-detail/profile-detail.component';
import {EditProfileComponent} from '../../components/settings/profile/edit-profile/edit-profile.component';
import {ChangeProfilePasswordComponent} from '../../components/settings/profile/change-profile-password/change-profile-password.component';
import {WorkflowListComponent} from '../../components/settings/workflows/workflow-list/workflow-list.component';
import {AddNewWorkflowDialogComponent} from '../../dialogs/add-new-workflow-dialog/add-new-workflow-dialog.component';
import {AddNewWorkflowComponent} from '../../components/settings/workflows/add-new-workflow/add-new-workflow.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {JobOpeningsComponent} from '../../components/settings/job-openings/job-openings.component';
import {SettingsRoutingModule} from './settings-routing.module';
import {DialogModule} from '../shared-modules/dialog.module';

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent,
    ManageCompaniesComponent,
    ManageUserAccountsComponent,
    CandidatesAndLeadsComponent,
    JobOpeningsComponent,
    WorkflowsComponent,
    DisqualifyReasonsComponent,
    TagsComponent,
    SourcesComponent,
    DepartmentsComponent,
    JobTypesComponent,
    JobFunctionsComponent,
    PipelineComponent,
    AddNewCompanyComponent,
    CompanyPanelComponent,
    EditCompanyComponent,
    EditUserAccountComponent,
    AddNewUserAccountComponent,
    UserAccountPanelComponent,
    UserAccountIdComponent,
    CompanyIdComponent,
    ProfileDetailComponent,
    EditProfileComponent,
    ChangeProfilePasswordComponent,
    WorkflowListComponent,
    AddNewWorkflowDialogComponent,
    AddNewWorkflowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule {}

