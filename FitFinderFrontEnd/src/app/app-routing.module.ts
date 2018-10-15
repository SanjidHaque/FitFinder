import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompanyComponent} from './components/company/company.component';
import {CompanyResolverService} from './route-resolvers/company-resolver.service';
import {CompanyDetailsComponent} from './components/company/company-details/company-details.component';
import {DepartmentDetailsComponent} from './components/company/company-details/department-details/department-details.component';
import {CreateNewCompanyComponent} from './components/company/create-new-company/create-new-company.component';

const appRoutes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    resolve: { companies: CompanyResolverService },
    children:
      [
        { path: 'create-new-company',
          component: CreateNewCompanyComponent
        }
      ]
  },
  {
    path: 'company/:companyId/department',
    component: CompanyDetailsComponent,
    resolve: { companies: CompanyResolverService }
  },
  {
    path: 'company/:companyId/department/:departmentId/job',
    component: DepartmentDetailsComponent,
    resolve: { companies: CompanyResolverService }
  },

  { path : '', redirectTo: '/company', pathMatch : 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
