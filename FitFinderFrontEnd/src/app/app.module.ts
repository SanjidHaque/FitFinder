import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {CompanyResolverService} from './route-resolvers/company-resolver.service';
import {DataStorageService} from './services/data-storage.service';
import {CompanyDetailsComponent} from './components/company/company-details/company-details.component';
import {DepartmentDetailsComponent} from './components/company/company-details/department-details/department-details.component';
import {CreateNewCompanyComponent} from './components/company/create-new-company/create-new-company.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicantsComponent} from './components/applicants/applicants.component';
import {UsersComponent } from './components/users/users.component';
import {AppMaterialModule} from './modules/app-material.module';




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
    AppMaterialModule
  ],


  providers: [
    DataStorageService,
    CompanyResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
