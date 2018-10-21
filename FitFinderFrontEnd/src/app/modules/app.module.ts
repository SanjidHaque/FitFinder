import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import {AppComponent} from '../app.component';
import {CompanyComponent} from '../components/company/company.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {CompanyResolverService} from '../route-resolvers/company-resolver.service';
import {DataStorageService} from '../services/data-storage.service';
import {CompanyDetailsComponent} from '../components/company/company-details/company-details.component';
import {DepartmentDetailsComponent} from '../components/company/company-details/department-details/department-details.component';
import {CreateNewCompanyComponent} from '../components/company/create-new-company/create-new-company.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicantsComponent} from '../components/applicants/applicants.component';
import {UsersComponent } from '../components/users/users.component';
import {AppMaterialModule} from './app-material.module';
import {FormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {DataShareService} from '../services/data-share.service';



@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyDetailsComponent,
    DepartmentDetailsComponent,
    CreateNewCompanyComponent,
    ApplicantsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'bottom',
          distance: 12,
          gap: 10
        }
      },
      behaviour: {
        autoHide: 10000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      }
    })
  ],

  providers: [
    DataStorageService,
    DataShareService,
    CompanyResolverService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
