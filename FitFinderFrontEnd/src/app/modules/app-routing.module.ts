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
import {TypesComponent} from '../components/settings/job-openings/types/types.component';
import {FunctionsComponent} from '../components/settings/job-openings/functions/functions.component';
import {PipelineComponent} from '../components/settings/workflow/pipeline/pipeline.component';

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
        path: ':job-id',
        component: JobIdComponent,
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
        path: ':candidate-id',
        component: CandidateIdComponent,
        children:
        [
          {
            path: '',
            redirectTo: 'candidate-info',
            pathMatch: 'full'
          },
          {
            path: 'candidate-info',
            component: CandidateInfoComponent
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
        path: ':interview-id/interview-info',
        component: InterviewIdComponent
      },
      {
        path: ':interview-id',
        redirectTo: ':interview-id/interview-info',
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
            component: SourcesComponent
          },
          {
            path: 'tags',
            component: TagsComponent
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
            redirectTo: 'departments',
            pathMatch: 'full'
          },
          {
            path: 'departments',
            component: DepartmentsComponent
          },
          {
            path: 'types',
            component: TypesComponent
          },
          {
            path: 'functions',
            component: FunctionsComponent
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
            component: PipelineComponent
          }
        ]
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
