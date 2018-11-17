import { Injectable } from '@angular/core';
import {Job} from '../models/job.model';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobs: Job[] = [];
  jobsChanged = new Subject<Job[]>();

  getAllInterview() {
    return this.jobs.slice();
  }

  addNewInterview(job: Job) {
    this.jobs.push(job);
    this.jobsChanged.next(this.jobs.slice());
  }
}
