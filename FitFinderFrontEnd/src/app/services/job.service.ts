import { Injectable } from '@angular/core';
import {Job} from '../models/job.model';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobs: Job[] = [];
  job: Job;
  jobsChanged = new Subject<Job[]>();


  getAllJob() {
    return this.jobs.slice();
  }

  addNewJob(job: Job) {
    this.jobs.push(job);
    this.jobsChanged.next(this.jobs.slice());
  }


  jobPublishStatus(value: string, archivedChecked: boolean,  favouriteChecked: boolean) {
    if (value === 'all') {
      if (!archivedChecked && !favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === false);
      } else if (archivedChecked && favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === true && x.IsFavourite === true);
      } else if (archivedChecked && !favouriteChecked) {
        return this.jobs;
      } else if (!archivedChecked && favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === false && x.IsFavourite === true);
      }
    } else if (value === 'published') {
      if (!archivedChecked && !favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === false && x.IsPublished === true);
      } else if (archivedChecked && favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === true && x.IsFavourite === true && x.IsPublished === true);
      } else if (archivedChecked && !favouriteChecked) {
        return this.jobs.filter(x => x.IsPublished === true);
      } else if (!archivedChecked && favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === false && x.IsFavourite === true && x.IsPublished === true);
      }
    } else {
      if (!archivedChecked && !favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === false && x.IsPublished === false);
      } else if (archivedChecked && favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === true && x.IsFavourite === true && x.IsPublished === false);
      } else if (archivedChecked && !favouriteChecked) {
        return this.jobs.filter(x => x.IsPublished === false);
      } else if (!archivedChecked && favouriteChecked) {
        return this.jobs.filter(x => x.IsArchived === false && x.IsFavourite === true && x.IsPublished === false);
      }
    }
  }
}
