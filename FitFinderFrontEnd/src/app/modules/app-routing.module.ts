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
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';
import {ViewCandidateComponent} from '../components/candidates/view-candidate/view-candidate.component';
import {ViewInterviewComponent} from '../components/interviews/view-interview/view-interview.component';
import {ViewJobComponent} from '../components/jobs/view-job/view-job.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve:
      {
        candidates: CandidateResolverService,
        interviews: InterviewResolverService,
        jobs: JobResolverService
      }
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
      },
      {
        path: ':job-id/view-job',
        component: ViewJobComponent
      },
      {
        path: ':job-id',
        redirectTo: ':job-id/view-job',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'candidates',
    component: CandidatesComponent,
    resolve:
      {
      candidates: CandidateResolverService,
      jobs: JobResolverService
      },
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
      },
      {
        path: ':candidate-id/view-candidate',
        component: ViewCandidateComponent
      },
      {
        path: ':candidate-id',
        redirectTo: ':candidate-id/view-candidate',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'interviews',
    component: InterviewsComponent,
    resolve: {
      interviews: InterviewResolverService,
      candidates: CandidateResolverService,
      jobs: JobResolverService
    },
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
      },
      {
        path: ':interview-id/view-interview',
        component: ViewInterviewComponent
      },
      {
        path: ':interview-id',
        redirectTo: ':interview-id/view-interview',
        pathMatch: 'full'
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
  },
  { path: 'not-found',
    component: PageNotFoundComponent,
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
