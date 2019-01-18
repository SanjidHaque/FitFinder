import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {JobService} from '../../../services/job.service';
import {CandidateService} from '../../../services/candidate.service';
import {InterviewService} from '../../../services/interview.service';
import {Job} from '../../../models/job.model';
import * as moment from 'moment';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  jobId: string;
  job: Job;
  jobs: Job[] = [];
  departments = [
    {id: '1', name: 'Accounts'},
    {id: '2', name: 'Finance'},
    {id: '3', name: 'Development'},
    {id: '4', name: 'Engineering'}
  ];
  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private jobService: JobService,
              private router: Router,
              private candidateService: CandidateService,
              private interviewService: InterviewService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.jobId = params['job-id'];
        }
      );
  }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob();
    this.job = this.jobs.find( x => x.Id === this.jobId);
  }

  getDepartmentName(departmentId: string) {
    return this.departments.find(x => x.id === departmentId ).name;
  }

  getClosingDays() {
    const today = moment(new Date());
    const closingDate = moment(this.job.JobClosingDate);
    if ( closingDate.diff(today, 'days') > 0) {
      return  closingDate.diff(today, 'days');
    }
    return '';
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
    this.jobId = this.jobs[nextIndex].Id;
    this.router.navigate(['/jobs/' + this.jobId]);
  }

}
