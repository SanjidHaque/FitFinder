import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './modules/shared-modules/angular-material.module';
import {NotifierModule} from 'angular-notifier';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressRouterModule} from '@ngx-progressbar/router';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {PipeModule} from './modules/shared-modules/pipe.module';
import {CoreModule} from './modules/core-module/core.module';
import {DialogModule} from './modules/shared-modules/dialog.module';
import {AuthModule} from './modules/auth/auth.module';
import { EditJobComponent } from './components/jobs/edit-job/edit-job.component';
import { EditCandidateComponent } from './components/candidates/edit-candidate/edit-candidate.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AuthModule,
    PipeModule,
    DialogModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgProgressHttpModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#673ab7',
      min: .2
    }),
    NgProgressRouterModule,
    AppRoutingModule,
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
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      }
    }),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
