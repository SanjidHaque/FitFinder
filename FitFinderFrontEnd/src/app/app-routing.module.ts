import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {InterviewsResolverService} from './route-resolvers/interviews-resolver.service';
import {JobsResolverService} from './route-resolvers/jobs-resolver.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SourcesResolverService} from './route-resolvers/sources-resolver.service';
import {AuthGuard} from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve:
      {
        interviews: InterviewsResolverService,
        jobs: JobsResolverService,
        sources: SourcesResolverService
      }
  },
  {
    path: 'candidates',
    loadChildren: './modules/feature-modules/candidate.module#CandidateModule'
  },
  {
    path: 'interviews',
    loadChildren: './modules/feature-modules/interview.module#InterviewModule'
  },
  {
    path: 'jobs',
    loadChildren: './modules/feature-modules/job.module#JobModule'
  },
  {
    path: 'settings',
    loadChildren: './modules/feature-modules/settings.module#SettingsModule'
  },
  {
    path : '',
    redirectTo: '/forgot-password',
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
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  // imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
