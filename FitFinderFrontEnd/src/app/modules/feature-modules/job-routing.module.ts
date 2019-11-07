import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../auth/auth.guard';

import {JobsResolverService} from '../../route-resolvers/jobs-resolver.service';
import {WorkflowsResolverService} from '../../route-resolvers/workflows-resolver.service';
import {DepartmentsResolverService} from '../../route-resolvers/departments-resolver.service';
import {JobsComponent} from '../../components/jobs/jobs.component';
import {JobPanelComponent} from '../../components/jobs/job-panel/job-panel.component';
import {AddNewJobComponent} from '../../components/jobs/add-new-job/add-new-job.component';
import {JobTypesResolverService} from '../../route-resolvers/job-types-resolver.service';
import {JobFunctionsResolverService} from '../../route-resolvers/job-functions-resolver.service';
import {JobIdComponent} from '../../components/jobs/job-id/job-id.component';
import {JobResolverService} from '../../route-resolvers/job-resolver.service';
import {JobInfoComponent} from '../../components/jobs/job-id/job-info/job-info.component';
import {JobCandidatesComponent} from '../../components/jobs/job-id/job-candidates/job-candidates.component';
import {JobAnalyticsComponent} from '../../components/jobs/job-id/job-analytics/job-analytics.component';


const jobRoutes: Routes = [
  {
    path: '',
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
            departments: DepartmentsResolverService,
            workflows: WorkflowsResolverService
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
                  departments: DepartmentsResolverService,
                  jobFunctions: JobFunctionsResolverService,
                  jobTypes: JobTypesResolverService
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
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(jobRoutes)
  ],
  exports: [RouterModule]
})
export class JobRoutingModule {}