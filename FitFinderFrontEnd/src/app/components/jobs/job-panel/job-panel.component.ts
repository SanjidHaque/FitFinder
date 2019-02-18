import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from '../../../models/job.model';
import {Subscription} from 'rxjs/index';
import {JobService} from '../../../services/job.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatTreeFlatDataSource} from '@angular/material';
import * as moment from 'moment';
import {Department} from '../../../models/department.model';
import {SettingsService} from '../../../services/settings.service';
import {Candidate} from '../../../models/candidate.model';
import {ConfirmationComponent} from '../../../dialogs/confirmation/confirmation.component';
import {NotifierService} from 'angular-notifier';
import {DataStorageService} from '../../../services/data-storage.service';

@Component({
  selector: 'app-job-panel',
  templateUrl: './job-panel.component.html',
  styleUrls: ['./job-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JobPanelComponent implements OnInit {

  archivedChecked = false;
  favouriteChecked = false;

  selectedValue = 'all';
  jobs: Job[] = [];
  selection = new SelectionModel<Job>(true, []);
  departments: Department[] = [];

  constructor(private jobService: JobService,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private dataStorageService: DataStorageService,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob().filter(x => x.IsArchived === false);
    this.departments = this.settingsService.getAllDepartment();
  }


  favouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);
    this.dataStorageService.favouriteJobs(jobs)
      .subscribe(
        (response: any) => {
          for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].Id === job.Id) {
              this.jobs[i].IsFavourite = true;
            }
          }
          this.notifierService.notify('default', 'Added to favourites!')
        }
      );
  }

  unfavouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);
    this.dataStorageService.unfavouriteJobs(jobs)
      .subscribe(
        (response: any) => {
          for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].Id === job.Id) {
              this.jobs[i].IsFavourite = false;
            }
          }
          this.notifierService.notify('default', 'Removed from favourites!')
        }
      );
  }

  archiveJobs() {
    const dialogRef = this.dialog.open(ConfirmationComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Archive Jobs',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          let jobs: Job[] = [];
          jobs = this.selection.selected;
          this.dataStorageService.archiveJobs(jobs)
            .subscribe(
              (response: any) => {
                for (let i = 0; i < this.jobs.length; i++) {
                  for (let j = 0; j < jobs.length; j++) {
                    if (this.jobs[i].Id === jobs[j].Id)  {
                      this.jobs[i].IsArchived = true;
                    }
                  }
                }
                this.selection.clear();
                this.notifierService.notify('default', 'Archived successfully!')
              }
            );
        }
      }
    );
  }

  restoreJobs() {
    const dialogRef = this.dialog.open(ConfirmationComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Restore Jobs',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          let jobs: Job[] = [];
          jobs = this.selection.selected;
          this.dataStorageService.restoreJobs(jobs)
            .subscribe(
              (response: any) => {
                for (let i = 0; i < this.jobs.length; i++) {
                  for (let j = 0; j < jobs.length; j++) {
                    if (this.jobs[i].Id === jobs[j].Id)  {
                      this.jobs[i].IsArchived = false;
                    }
                  }
                }
                this.selection.clear();
                this.notifierService.notify('default', 'Restored successfully!')
              }
            );
        }
      }
    );
  }

  onValueChange(value: string) {
    this.selectedValue = value;
    this.jobs = this.jobService.filterArchivedJob(value, this.archivedChecked, this.favouriteChecked);
  }

  archiveStatus(event: any) {
    this.archivedChecked = event.checked;
    this.jobs = this.jobService.filterArchivedJob(this.selectedValue, this.archivedChecked, this.favouriteChecked);
  }

  favouriteStatus(event: any) {
    this.favouriteChecked = event.checked;
    this.jobs = this.jobService.filterArchivedJob(this.selectedValue, this.archivedChecked, this.favouriteChecked);
  }

  getDepartmentName(departmentId: number) {
    return this.departments.find(x => x.Id === departmentId ).Name;
  }

  getClosingDays(jobClosingDate: string) {
    const today = moment(new Date());
    const closingDate = moment(new Date(jobClosingDate));
    return closingDate.diff(today, 'days');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.jobs.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.jobs.forEach(row => this.selection.select(row));
  }
}
