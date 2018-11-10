import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CandidatesComponent} from '../components/candidates/candidates.component';
import {JobsComponent} from '../components/jobs/jobs.component';
import {InterviewsComponent} from '../components/interviews/interviews.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'candidates',
    component: CandidatesComponent
  },
  {
    path: 'interviews',
    component: InterviewsComponent
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
