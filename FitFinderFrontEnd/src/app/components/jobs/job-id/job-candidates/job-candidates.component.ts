import { Component, OnInit } from '@angular/core';
import {Job} from '../../../../models/job.model';
import {JobService} from '../../../../services/job.service';

@Component({
  selector: 'app-job-candidates',
  templateUrl: './job-candidates.component.html',
  styleUrls: ['./job-candidates.component.css']
})
export class JobCandidatesComponent implements OnInit {

  job: Job;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.job = this.jobService.job;
  }


}
