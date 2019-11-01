import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CandidatesComponent} from '../../components/candidates/candidates.component';
import {AuthGuard} from '../../auth/auth.guard';
import {CandidatePanelComponent} from '../../components/candidates/candidate-panel/candidate-panel.component';
import {JobsResolverService} from '../../route-resolvers/jobs-resolver.service';
import {SourcesResolverService} from '../../route-resolvers/sources-resolver.service';
import {CandidatesResolverService} from '../../route-resolvers/candidates-resolver.service';
import {AddNewCandidateComponent} from '../../components/candidates/add-new-candidate/add-new-candidate.component';
import {CandidateIdComponent} from '../../components/candidates/candidate-id/candidate-id.component';
import {CandidateResolverService} from '../../route-resolvers/candidate-resolver.service';
import {WorkflowsResolverService} from '../../route-resolvers/workflows-resolver.service';
import {DepartmentsResolverService} from '../../route-resolvers/departments-resolver.service';
import {CandidateInfoComponent} from '../../components/candidates/candidate-id/candidate-info/candidate-info.component';
import {CandidateScoreCardComponent} from '../../components/candidates/candidate-id/candidate-score-card/candidate-score-card.component';
import {CandidateEmailComponent} from '../../components/candidates/candidate-id/candidate-email/candidate-email.component';
import {CandidateInterviewComponent} from '../../components/candidates/candidate-id/candidate-interview/candidate-interview.component';
import {CandidateTaskComponent} from '../../components/candidates/candidate-id/candidate-task/candidate-task.component';
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
import {InterviewsComponent} from '../../components/interviews/interviews.component';
import {InterviewPanelComponent} from '../../components/interviews/interview-panel/interview-panel.component';
import {InterviewsResolverService} from '../../route-resolvers/interviews-resolver.service';
import {AddNewInterviewComponent} from '../../components/interviews/add-new-interview/add-new-interview.component';
import {InterviewIdComponent} from '../../components/interviews/interview-id/interview-id.component';
import {InterviewResolverService} from '../../route-resolvers/interview-resolver.service';


const interviewRoutes: Routes = [
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
            candidates: CandidatesResolverService,
            sources: SourcesResolverService
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
];

@NgModule({
  imports: [
    RouterModule.forChild(interviewRoutes)
  ],
  exports: [RouterModule]
})
export class InterviewRoutingModule {}
