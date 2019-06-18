import { Component, OnInit } from '@angular/core';
import {Job} from '../../../../models/job.model';
import {JobDataStorageService} from '../../../../services/data-storage/job-data-storage.service';

@Component({
  selector: 'app-job-candidates',
  templateUrl: './job-candidates.component.html',
  styleUrls: ['./job-candidates.component.css']
})
export class JobCandidatesComponent implements OnInit {

  job: Job;

  constructor(private jobService: JobDataStorageService) { }

  ngOnInit() {
    this.job = this.jobService.job;
  }


}
