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
}
