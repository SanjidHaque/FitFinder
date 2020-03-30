import { Injectable } from '@angular/core';

import {Job} from '../../models/job/job.model';
import {Interview} from '../../models/interview/interview.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  job: Job;
  jobs: Job[] = [];

  getAllJob() {
    return this.jobs.slice();
  }

  filterArchivedJob(publishedSelected: string,
                    archivedSelected: boolean,
                    favouriteSelected: boolean) {

    let jobs = this.jobs;
    if (!archivedSelected) {
      jobs = jobs.filter(x => x.IsArchived === false);
    }
    if (favouriteSelected) {
      jobs = jobs.filter(x => x.IsFavourite === true);
    }

    if (publishedSelected === 'published') {
      return jobs.filter(x => x.IsPublished === true);
    } else if (publishedSelected === 'internal') {
      return jobs.filter(x => x.IsPublished === false);
    } else {
      return jobs;
    }

  }

  archiveJobs(jobs: Job[]) {
    this.jobs.forEach(job => {
      const getJob = jobs.find(x => x.Id === job.Id);
      if (getJob !== undefined) {
        getJob.IsArchived = true;
      }
    });
  }

  restoreJobs(jobs: Job[]) {
    this.jobs.forEach(job => {
      const getJob = jobs.find(x => x.Id === job.Id);
      if (getJob !== undefined) {
        getJob.IsArchived = false;
      }
    });
  }


}
