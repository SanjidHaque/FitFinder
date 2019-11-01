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
import {CandidateModule} from './modules/feature-modules/candidate.module';
import {PipeModule} from './modules/shared-modules/pipe.module';
import {JobModule} from './modules/feature-modules/job.module';
import {CoreModule} from './modules/core-module/core.module';
import {InterviewModule} from './modules/feature-modules/interview.module';
import {SettingsModule} from './modules/feature-modules/settings.module';
import {DialogModule} from './modules/shared-modules/dialog.module';
import {AuthModule} from './modules/auth/auth.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InterviewModule,
    SettingsModule,
    RouterModule,
    HttpClientModule,
    CandidateModule,
    JobModule,
    AuthModule,
    PipeModule,
    DialogModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgProgressHttpModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#673ab7',
      min: 20
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
