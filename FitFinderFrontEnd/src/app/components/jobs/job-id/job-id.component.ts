import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {JobService} from '../../../services/job.service';
import {CandidateService} from '../../../services/candidate.service';
import {InterviewService} from '../../../services/interview.service';
import {Job} from '../../../models/job.model';
import * as moment from 'moment';
import {Department} from '../../../models/department.model';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-job-id',
  templateUrl: './job-id.component.html',
  styleUrls: ['./job-id.component.css']
})
export class JobIdComponent implements OnInit {

  jobId: number;
  job: Job;
  jobs: Job[] = [];
  departments: Department[] = [];

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private jobService: JobService,
              private router: Router,
              private settingsService: SettingsService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.jobId = +params['job-id'];
        }
      );
  }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob();
    this.job = this.jobs.find( x => x.Id === this.jobId);
    this.jobService.job = this.job;
    this.departments = this.settingsService.getAllDepartment();
  }

  getDepartmentName(departmentId: number) {
    return this.departments.find(x => x.Id === departmentId ).Name;
  }

  getClosingDays() {
    const today = new Date();
    const closingDate = moment(new Date(this.job.JobClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));
  }

  previousJob() {
    const currentIndex = this.jobs.findIndex(x => x.Id === this.jobId);
    let nextIndex = currentIndex - 1;
    if ( nextIndex === -1 ) {
      nextIndex = this.jobs.length - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
    this.job = this.jobs[nextIndex];
    this.jobService.job = this.job;
    this.jobId = this.jobs[nextIndex].Id;
    this.router.navigate(['/jobs/' + this.jobId]);
  }

  nextJob() {
    const currentIndex = this.jobs.findIndex(x => x.Id === this.jobId);
    let nextIndex = currentIndex + 1;
    if ( nextIndex === this.jobs.length ) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    this.job = this.jobs[nextIndex];
    this.jobService.job = this.job;
    this.jobId = this.jobs[nextIndex].Id;
    this.router.navigate(['/jobs/' + this.jobId]);
  }

}
