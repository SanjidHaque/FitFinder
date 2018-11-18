import { Injectable } from '@angular/core';
import {Job} from '../models/job.model';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobs: Job[] = [];
  jobsChanged = new Subject<Job[]>();

  getAllJob() {
    return this.jobs.slice();
  }

  addNewJob(job: Job) {
    this.jobs.push(job);
    this.jobsChanged.next(this.jobs.slice());
  }
}
