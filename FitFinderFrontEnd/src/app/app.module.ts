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

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyDetailsComponent,
    DepartmentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    DataStorageService,
    CompanyResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
