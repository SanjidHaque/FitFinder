import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {CompanyResolverService} from './route-resolvers/company-resolver.service';
import {DataStorageService} from './services/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent
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
