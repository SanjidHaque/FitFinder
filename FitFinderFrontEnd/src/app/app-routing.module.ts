import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompanyComponent} from './components/company/company.component';
import {CompanyResolverService} from './route-resolvers/company-resolver.service';

const appRoutes: Routes = [
  { path: 'company',
    component: CompanyComponent,
    resolve: { companies: CompanyResolverService }
  },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
