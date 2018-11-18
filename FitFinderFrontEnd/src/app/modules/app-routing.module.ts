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
import {ManageAccountComponent} from '../components/settings/manage-account/manage-account.component';
import {ManageUsersComponent} from '../components/settings/manage-users/manage-users.component';
import {DisqualifyReasonsComponent} from '../components/settings/disqualify-reasons/disqualify-reasons.component';
import {WorkflowComponent} from '../components/settings/workflow/workflow.component';
import {JobOpeningsComponent} from '../components/settings/job-openings/job-openings.component';
import {CandidatesAndLeadsComponent} from '../components/settings/candidates-and-leads/candidates-and-leads.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'jobs',
    component: JobsComponent,
    resolve: { jobs: JobResolverService },
    children: [
      {
        path: '',
        redirectTo: 'job-panel',
        pathMatch: 'full'
      },
      {
        path: 'job-panel',
        component: JobPanelComponent
      },
      {
        path: 'add-new-job',
        component: AddNewJobComponent
      }
    ]
  },
  {
    path: 'candidates',
    component: CandidatesComponent,
    resolve: { candidates: CandidateResolverService },
    children: [
      {
        path: '',
        redirectTo: 'candidate-panel',
        pathMatch: 'full'
      },
      {
        path: 'candidate-panel',
        component: CandidatePanelComponent
      },
      {
        path: 'add-new-candidate',
        component: AddNewCandidateComponent
      }
    ]
  },

  {
    path: 'interviews',
    component: InterviewsComponent,
    resolve: { interviews: InterviewResolverService },
    children: [
      {
        path: '',
        redirectTo: 'interview-panel',
        pathMatch: 'full'
      },
      {
        path: 'interview-panel',
        component: InterviewPanelComponent
      },
      {
        path: 'add-new-interview',
        component: AddNewInterviewComponent
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'manage-account',
        component: ManageAccountComponent
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'candidates-and-leads',
        component: CandidatesAndLeadsComponent
      },
      {
        path: 'job-openings',
        component: JobOpeningsComponent
      },
      {
        path: 'workflow',
        component: WorkflowComponent
      },
      {
        path: 'disqualify-reasons',
        component: DisqualifyReasonsComponent
      }
    ]
  },
  {
    path : '',
    redirectTo: '/dashboard',
    pathMatch : 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
