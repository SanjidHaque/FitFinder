import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {Job} from '../../../models/job/job.model';
import * as moment from 'moment';
import {Department} from '../../../models/settings/department.model';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {JobService} from '../../../services/shared-services/job.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';

@Component({
  selector: 'app-job-id',
  templateUrl: './job-id.component.html',
  styleUrls: ['./job-id.component.css']
})
export class JobIdComponent implements OnInit {
  isDisabled = false;

  jobId: number;
  job: Job;
  jobs: Job[] = [];
  departments: Department[] = [];

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private notifierService: NotifierService,
              private jobDataStorageService: JobDataStorageService,
              private jobService: JobService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.jobId = +params['job-id'];
        }
      );
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.job = data['job'].job;
          this.jobService.job = this.job;
        });
  }


  restoreJobs(job: Job) {
    this.dialogService.confirmationDialog(
      'Restore Job',
      'far fa-window-restore',
      '400px',
      'warn',
      'Are you sure?',
      'Restore',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          const jobs: Job[] = [];
          jobs.push(job);

          this.isDisabled = true;
          this.jobDataStorageService.restoreJobs(jobs)
            .subscribe((response: any) => {
              this.isDisabled = false;

              this.job.IsArchived = false;
              this.notifierService.notify('default', 'Restored successfully!')
            });
        }
      });
  }

  getClosingDays() {
    const today = new Date();
    const closingDate = moment(new Date(this.job.ClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));
  }

}
