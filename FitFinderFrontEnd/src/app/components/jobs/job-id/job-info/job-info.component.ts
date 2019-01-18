import {Component, DoCheck, OnInit} from '@angular/core';
import {JobService} from '../../../../services/job.service';
import {Job} from '../../../../models/job.model';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit, DoCheck {

  job: Job;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.job = this.jobService.job;
  }

  ngDoCheck() {
    this.job = this.jobService.job;
  }

}
