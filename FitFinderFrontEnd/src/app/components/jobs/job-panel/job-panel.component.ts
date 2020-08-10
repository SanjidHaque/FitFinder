import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {SelectionModel} from '@angular/cdk/collections';

import * as moment from 'moment';
import {Department} from '../../../models/settings/department.model';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Data} from '@angular/router';
import {JobService} from '../../../services/shared-services/job.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';

@Component({
  selector: 'app-job-panel',
  templateUrl: './job-panel.component.html',
  styleUrls: ['./job-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JobPanelComponent implements OnInit {
  isDisabled = false;
  isFilterTouched = false;

  archivedSelected = false;
  favouriteSelected = false;
  publishedSelected = 'all';

  jobs: Job[] = [];
  selection = new SelectionModel<Job>(true, []);
  departments: Department[] = [];

  constructor(private jobDataStorageService: JobDataStorageService,
              private notifierService: NotifierService,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private jobService: JobService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
        this.jobService.jobs = data['jobs'].jobs;
        this.jobs = this.jobService.getAllJob()
          .filter(x => x.IsArchived === false);
      });
  }


  favouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);
    this.jobDataStorageService.favouriteJobs(jobs)
      .subscribe((response: any) => {
          for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].Id === job.Id) {
              this.jobs[i].IsFavourite = true;
            }
          }
          this.notifierService.notify('default', 'Added to favourites.');
        });
  }

  unfavouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);

    this.jobDataStorageService.unfavouriteJobs(jobs)
      .subscribe((response: any) => {
          for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].Id === job.Id) {
              this.jobs[i].IsFavourite = false;
            }
          }
          this.notifierService.notify('default', 'Removed from favourites.');
        });
  }

  archiveJobs() {
    this.dialogService.confirmationDialog(
      'Archive Jobs',
      'fas fa-archive',
      '400px',
      'warn',
      'Are you sure?',
      'Archive',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          let jobs: Job[] = this.selection.selected;
          jobs = jobs.filter(x => x.IsArchived === false);

          if (jobs.length === 0) {
            this.notifierService.notify('default', 'Already archived!');
            return;
          }

          this.isDisabled = true;
          this.jobDataStorageService.archiveJobs(jobs)
            .subscribe((response: any) => {
                this.isDisabled = false;

                if (!this.archivedSelected) {
                  for (let i = 0; i < this.jobs.length; i++) {
                    for (let j = 0; j < jobs.length; j++) {
                      if (this.jobs[i].Id === jobs[j].Id) {
                        this.jobs.splice(j, 1);
                      }
                    }
                  }
                }

                this.jobService.archiveJobs(jobs);
                this.selection.clear();
                this.notifierService.notify('default', 'Archived successfully.');
              });
        }
      });
  }

  restoreJobs() {
    this.dialogService.confirmationDialog(
      'Restore Jobs',
      'far fa-window-restore',
      '400px',
      'warn',
      'Are you sure?',
      'Restore',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          let jobs: Job[] = this.selection.selected;
          jobs = jobs.filter(x => x.IsArchived === true);

          if (jobs.length === 0) {
            this.notifierService.notify('default', 'Already restored!');
            return;
          }

          this.isDisabled = true;
          this.jobDataStorageService.restoreJobs(jobs)
            .subscribe(
              (response: any) => {
                this.isDisabled = false;

                for (let i = 0; i < this.jobs.length; i++) {
                  for (let j = 0; j < jobs.length; j++) {
                    if (this.jobs[i].Id === jobs[j].Id)  {
                      this.jobs[i].IsArchived = false;
                    }
                  }
                }

                this.jobService.restoreJobs(jobs);
                this.selection.clear();
                this.notifierService.notify('default', 'Restored successfully.')
              });
        }
      });
  }

  resetAllFilter() {
    this.isFilterTouched = false;
    this.archivedSelected = false;
    this.favouriteSelected = false;
    this.publishedSelected = 'all';
    this.jobs = this.jobService.getAllJob()
      .filter(x => x.IsArchived === false);
  }

  filterByPublished(value: string) {
    this.isFilterTouched = true;
    this.publishedSelected = value;
    this.jobs = this.jobService.filterByArchived(
      value, this.archivedSelected, this.favouriteSelected);
  }

  filterByArchived(event: any) {
    this.isFilterTouched = true;
    this.archivedSelected = event.checked;
    this.jobs = this.jobService.filterByArchived(
      this.publishedSelected, this.archivedSelected, this.favouriteSelected);
  }

  filterByFavourite(event: any) {
    this.isFilterTouched = true;
    this.favouriteSelected = event.checked;
    this.jobs = this.jobService.filterByArchived(
      this.publishedSelected, this.archivedSelected, this.favouriteSelected);
  }

  getClosingDays(jobClosingDate: string) {
    // const today = moment(new Date());
    // const closingDate = moment(new Date(jobClosingDate));
    // return closingDate.diff(today, 'days');

    const today = new Date();
    const closingDate = moment(new Date(jobClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.jobs.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : 
      this.jobs.forEach(row => this.selection.select(row));
  }
}
