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




  filterArchivedJob(selectedValue: string, archivedChecked: boolean,  favouriteChecked: boolean) {
    if (archivedChecked) {
      if (!favouriteChecked && selectedValue === 'all') {
        return this.jobs;
      } else if (favouriteChecked && selectedValue === 'all') {
        return this.jobs.filter(x => x.IsFavourite === true);
      } else if (!favouriteChecked && selectedValue === 'published') {
        return this.jobs.filter(x => x.IsPublished === true);
      } else if (favouriteChecked && selectedValue === 'published') {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === true );
      } else if (!favouriteChecked && selectedValue === 'internal') {
        return this.jobs.filter(x => x.IsPublished === false);
      } else {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === false);
      }
    } else {
      if (!favouriteChecked && selectedValue === 'all') {
        return this.jobs.filter( x => x.IsArchived === false);
      } else if (favouriteChecked && selectedValue === 'all') {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsArchived === false);
      } else if (!favouriteChecked && selectedValue === 'published') {
        return this.jobs.filter(x => x.IsPublished === true && x.IsArchived === false);
      } else if (favouriteChecked && selectedValue === 'published') {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === true && x.IsArchived === false);
      } else if (!favouriteChecked && selectedValue === 'internal') {
        return this.jobs.filter(x => x.IsPublished === false && x.IsArchived === false);
      } else {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === false && x.IsArchived === false);
      }
    }
  }


}
