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
import {DepartmentsResolverService} from '../../route-resolvers/departments-resolver.service';
import {CandidateInterviewComponent} from '../../components/candidates/candidate-id/candidate-interview/candidate-interview.component';
import {EditCandidateComponent} from '../../components/candidates/edit-candidate/edit-candidate.component';
import {CandidateSpecificInterviewsResolverService} from '../../route-resolvers/candidate-specific-interviews-resolver.service';
import {WithdrawnReasonsResolverService} from '../../route-resolvers/withdrawn-reasons-resolver.service';
import {RejectedReasonsResolverService} from '../../route-resolvers/rejected-reasons-resolver.service';
import {CandidateOverviewComponent} from '../../components/candidates/candidate-overview/candidate-overview.component';

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
            candidates: CandidatesResolverService
          }
      },
      {
        path: 'add-new-candidate',
        component: AddNewCandidateComponent,
        resolve:
          {
            sources: SourcesResolverService,
            jobs: JobsResolverService
          }
      },
      {
        path: ':candidate-id/edit-candidate',
        component: EditCandidateComponent,
        resolve:
          {
            candidate: CandidateResolverService,
            sources: SourcesResolverService
          }
      },
      {
        path: ':candidate-id/:job-assignment-id',
        component: CandidateIdComponent,
        resolve:
          {
            jobs: JobsResolverService,
            sources: SourcesResolverService,
            withdrawnReasons: WithdrawnReasonsResolverService,
            rejectedReasons: RejectedReasonsResolverService,
            candidate: CandidateResolverService,
            departments: DepartmentsResolverService,
            candidateSpecificInterviews: CandidateSpecificInterviewsResolverService
          },
        children:
          [
            {
              path: '',
              redirectTo: 'candidate-overview',
              pathMatch: 'full'
            },
            {
              path: 'candidate-overview',
              component: CandidateOverviewComponent
            },
            {
              path: 'candidate-interviews',
              component: CandidateInterviewComponent
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
