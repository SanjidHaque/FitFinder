import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {Job} from '../../models/job/job.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Department} from '../../models/settings/department.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JobService} from '../../services/shared-services/job.service';

@Component({
  selector: 'app-display-job-dialog',
  templateUrl: './display-job-dialog.component.html',
  styleUrls: ['./display-job-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DisplayJobDialogComponent implements OnInit {
  isDisabled = false;
  isFilterTouched = false;

  archivedSelected = false;
  favouriteSelected = false;
  publishedSelected = 'all';

  jobs: Job[] = [];
  departments: Department[] = [];

  term: string;
  selection = new SelectionModel<Job>(false, []);

  constructor(public dialogRef: MatDialogRef<DisplayJobDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private jobService: JobService) {}

  ngOnInit() {
    this.jobService.jobs = this.data.jobs;
    this.jobs = this.jobService.getAllJob()
      .filter(x => x.IsArchived === false);
  }

  filterByArchived(event: any) {
    this.isFilterTouched = false;
    this.archivedSelected = event.checked;
    this.jobs = this.jobService
      .filterByArchived(this.publishedSelected, this.archivedSelected, this.favouriteSelected);
  }

  filterByFavourite(event: any) {
    this.isFilterTouched = false;
    this.favouriteSelected = event.checked;
    this.jobs = this.jobService
      .filterByArchived(this.publishedSelected, this.archivedSelected, this.favouriteSelected);
  }

  filterByPublished(value: string) {
    this.isFilterTouched = false;
    this.publishedSelected = value;
    this.jobs = this.jobService
      .filterByArchived(value, this.archivedSelected, this.favouriteSelected);
  }

  resetAllFilter() {
    this.isFilterTouched = false;
    this.archivedSelected = false;
    this.favouriteSelected = false;
    this.publishedSelected = 'all';
    this.jobs = this.jobService.getAllJob()
      .filter(x => x.IsArchived === false);
  }

  getClosingDays(jobClosingDate: string) {
    const today = new Date();
    const closingDate = moment(new Date(jobClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));
  }
}
