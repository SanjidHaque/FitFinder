import { Injectable } from '@angular/core';

import {Job} from '../../models/job/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  job: Job;
  jobs: Job[] = [];

  getAllJob() {
    return this.jobs.slice();
  }

  filterArchivedJob(publishedSelected: string, archivedSelected: boolean,
                    favouriteSelected: boolean) {

    if (archivedSelected) {
      if (!favouriteSelected && publishedSelected === 'all') {
        return this.jobs;
      } else if (favouriteSelected && publishedSelected === 'all') {
        return this.jobs.filter(x => x.IsFavourite === true);
      } else if (!favouriteSelected && publishedSelected === 'published') {
        return this.jobs.filter(x => x.IsPublished === true);
      } else if (favouriteSelected && publishedSelected === 'published') {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === true );
      } else if (!favouriteSelected && publishedSelected === 'internal') {
        return this.jobs.filter(x => x.IsPublished === false);
      } else {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === false);
      }
    } else {
      if (!favouriteSelected && publishedSelected === 'all') {
        return this.jobs.filter( x => x.IsArchived === false);
      } else if (favouriteSelected && publishedSelected === 'all') {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsArchived === false);
      } else if (!favouriteSelected && publishedSelected === 'published') {
        return this.jobs.filter(x => x.IsPublished === true && x.IsArchived === false);
      } else if (favouriteSelected && publishedSelected === 'published') {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === true && x.IsArchived === false);
      } else if (!favouriteSelected && publishedSelected === 'internal') {
        return this.jobs.filter(x => x.IsPublished === false && x.IsArchived === false);
      } else {
        return this.jobs.filter(x => x.IsFavourite === true && x.IsPublished === false && x.IsArchived === false);
      }
    }
  }
}
