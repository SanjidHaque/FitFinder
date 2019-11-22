import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
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

const candidateRoutes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(candidateRoutes)
  ],
  exports: [RouterModule]
})
export class CandidateRoutingModule {}
