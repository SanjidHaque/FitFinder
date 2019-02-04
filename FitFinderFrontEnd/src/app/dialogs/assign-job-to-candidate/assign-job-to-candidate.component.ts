import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {Job} from '../../models/job.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Department} from '../../models/department.model';
import {JobService} from '../../services/job.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-assign-job-to-candidate',
  templateUrl: './assign-job-to-candidate.component.html',
  styleUrls: ['./assign-job-to-candidate.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AssignJobToCandidateComponent implements OnInit {

  archivedChecked = false;
  favouriteChecked = false;

  selectedValue = 'all';
  jobs: Job[] = [];
  selection = new SelectionModel<Job>(true, []);
  departments: Department[] = [];

  constructor(private jobService: JobService,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob().filter(x => x.IsArchived === false);
    this.departments = this.settingsService.getAllDepartment();
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
    this.jobs = this.jobService.filterArchivedJob(value, this.archivedChecked, this.favouriteChecked);
  }
}