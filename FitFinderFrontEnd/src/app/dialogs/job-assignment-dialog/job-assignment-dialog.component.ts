import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {Job} from '../../models/job/job.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Department} from '../../models/settings/department.model';
import {JobDataStorageService} from '../../services/data-storage-services/job-data-storage.service';
import {SettingsDataStorageService} from '../../services/data-storage-services/settings-data-storage.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectionList} from '@angular/material';
import {JobService} from '../../services/shared-services/job.service';

@Component({
  selector: 'app-job-assignment-dialog',
  templateUrl: './job-assignment-dialog.component.html',
  styleUrls: ['./job-assignment-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class JobAssignmentDialogComponent implements OnInit {

  archivedChecked = false;
  favouriteChecked = false;

  term: string;

  selectedValue = 'all';
  jobs: Job[] = [];
  selection = new SelectionModel<Job>(false, []);
  departments: Department[] = [];

  constructor(public dialogRef: MatDialogRef<JobAssignmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private jobDataStorageService: JobDataStorageService,
              private jobService: JobService,
              private settingsDataStorageService: SettingsDataStorageService) { }

  ngOnInit() {
     this.jobs = this.data.jobs.filter(x => x.IsArchived === false);
     this.departments = this.data.departments;
  }

  archiveStatus(event: any) {
    this.archivedChecked = event.checked;
    this.jobs = this.jobService.
    filterArchivedJob(this.jobs, this.selectedValue, this.archivedChecked, this.favouriteChecked);
  }

  favouriteStatus(event: any) {
    this.favouriteChecked = event.checked;
    this.jobs = this.jobService.
    filterArchivedJob(this.jobs, this.selectedValue, this.archivedChecked, this.favouriteChecked);
  }

  getDepartmentName(departmentId: number) {
    if (this.departments === undefined) {
      return '';
    }

    const departmentName = this.departments.find(x => x.Id === departmentId ).Name;
    if (departmentName === '' || departmentName === undefined) {
      return '';
    }
    return departmentName;
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

  onValueChange(value: string) {
    this.selectedValue = value;
   // this.jobs = this.jobService.filterArchivedJob(value, this.archivedChecked, this.favouriteChecked);
  }
}
