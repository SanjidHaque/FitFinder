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

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'jobs',
    component: JobsComponent,
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
    component: SettingsComponent
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
