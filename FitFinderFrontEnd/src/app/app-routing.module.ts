import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CandidatesResolverService} from './route-resolvers/candidates-resolver.service';
import {InterviewsResolverService} from './route-resolvers/interviews-resolver.service';
import {JobsResolverService} from './route-resolvers/jobs-resolver.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {DepartmentsResolverService} from './route-resolvers/departments-resolver.service';
import {SourcesResolverService} from './route-resolvers/sources-resolver.service';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {EmailConfirmedComponent} from './components/email-confirmed/email-confirmed.component';
import {EmailConfirmationLinkExpiredComponent} from './components/email-confirmation-link-expired/email-confirmation-link-expired.component';
import {AuthGuard} from './auth/auth.guard';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve:
      {
        candidates: CandidatesResolverService,
        interviews: InterviewsResolverService,
        jobs: JobsResolverService,
        departments: DepartmentsResolverService,
        sources: SourcesResolverService
      }
  },
  {
    path : '',
    redirectTo: '/dashboard',
    pathMatch : 'full'
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
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
