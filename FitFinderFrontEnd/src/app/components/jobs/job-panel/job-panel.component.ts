import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Job} from '../../../models/job.model';
import {Subscription} from 'rxjs/index';
import {JobService} from '../../../services/job.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTreeFlatDataSource} from '@angular/material';
import * as moment from 'moment';

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
  departments = [
    {id: '1', name: 'Accounts'},
    {id: '2', name: 'Finance'},
    {id: '3', name: 'Development'},
    {id: '4', name: 'Engineering'}
  ];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob().filter(x => x.IsArchived === false);
  }


  archiveStatus(event: any) {
    if (event.checked) {


      this.jobs = this.jobService.getAllJob();
      this.archivedChecked = true;
    } else {
      this.jobs = this.jobService.getAllJob().filter(x => x.IsArchived === false);
      this.archivedChecked = false;
    }
  }

  favouriteStatus(event: any) {
    if (event.checked) {
      if (!this.archivedChecked) {
        this.jobs = this.jobService.getAllJob().filter(x => x.IsFavourite === true && x.IsArchived === false);
      } else {
        this.jobs = this.jobService.getAllJob().filter(x => x.IsFavourite === true);
      }
      this.favouriteChecked = true;

    } else {
      if (!this.archivedChecked) {
        this.jobs = this.jobService.getAllJob().filter(x => x.IsArchived === false);
      } else {
        this.jobs = this.jobService.getAllJob();
      }
      this.favouriteChecked = false;

    }
  }

  getDepartmentName(departmentId: string) {
    return this.departments.find(x => x.id === departmentId ).name;
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
  }
}
