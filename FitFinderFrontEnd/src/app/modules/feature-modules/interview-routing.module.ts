import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../auth/auth.guard';

import {JobsResolverService} from '../../route-resolvers/jobs-resolver.service';
import {CandidatesResolverService} from '../../route-resolvers/candidates-resolver.service';
import {InterviewsComponent} from '../../components/interviews/interviews.component';
import {InterviewPanelComponent} from '../../components/interviews/interview-panel/interview-panel.component';
import {InterviewsResolverService} from '../../route-resolvers/interviews-resolver.service';
import {AddNewInterviewComponent} from '../../components/interviews/add-new-interview/add-new-interview.component';
import {InterviewIdComponent} from '../../components/interviews/interview-id/interview-id.component';
import {InterviewResolverService} from '../../route-resolvers/interview-resolver.service';
import {UserAccountsResolverService} from '../../route-resolvers/user-accounts-resolver.service';
import {EditInterviewComponent} from '../../components/interviews/edit-interview/edit-interview.component';
import {WithdrawnReasonsResolverService} from '../../route-resolvers/withdrawn-reasons-resolver.service';
import {RejectedReasonsResolverService} from '../../route-resolvers/rejected-reasons-resolver.service';


const interviewRoutes: Routes = [
  {
    path: '',
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
            userAccounts: UserAccountsResolverService
          }
      },
      {
        path: ':interview-id',
        component: InterviewIdComponent,
        resolve:
          {
            interview: InterviewResolverService,
            candidates: CandidatesResolverService,
            userAccounts: UserAccountsResolverService,
            withdrawnReasons: WithdrawnReasonsResolverService,
            rejectedReasons: RejectedReasonsResolverService,
          }
      },
      {
        path: ':interview-id/edit-interview',
        component: EditInterviewComponent,
        resolve:
          {
            interview: InterviewResolverService,
            userAccounts: UserAccountsResolverService
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
