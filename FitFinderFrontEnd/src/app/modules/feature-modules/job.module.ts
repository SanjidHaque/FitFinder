import {NgModule} from '@angular/core';
import {JobsComponent} from '../../components/jobs/jobs.component';
import {AddNewJobComponent} from '../../components/jobs/add-new-job/add-new-job.component';
import {JobPanelComponent} from '../../components/jobs/job-panel/job-panel.component';
import {JobIdComponent} from '../../components/jobs/job-id/job-id.component';
import {JobInfoComponent} from '../../components/jobs/job-id/job-info/job-info.component';
import {JobCandidatesComponent} from '../../components/jobs/job-id/job-candidates/job-candidates.component';
import {JobAnalyticsComponent} from '../../components/jobs/job-id/job-analytics/job-analytics.component';
import {CommonModule} from '@angular/common';
import {JobRoutingModule} from './job-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../shared-modules/angular-material.module';
import {PipeModule} from '../shared-modules/pipe.module';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {DialogModule} from '../shared-modules/dialog.module';


@NgModule({
  declarations: [
    JobsComponent,
    JobIdComponent,
    JobInfoComponent,
    JobPanelComponent,
    AddNewJobComponent,
    JobAnalyticsComponent,
    JobCandidatesComponent
  ],
  imports: [
    FormsModule,
    PipeModule,
    CommonModule,
    DialogModule,
    JobRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class JobModule {}
