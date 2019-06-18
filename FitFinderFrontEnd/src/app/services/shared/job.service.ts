import { Injectable } from '@angular/core';
import {Job} from '../../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  filterArchivedJob(jobs: Job[], selectedValue: string, archivedChecked: boolean, favouriteChecked: boolean) {
    if (archivedChecked) {
      if (!favouriteChecked && selectedValue === 'all') {
        return jobs;
      } else if (favouriteChecked && selectedValue === 'all') {
        return jobs.filter(x => x.IsFavourite === true);
      } else if (!favouriteChecked && selectedValue === 'published') {
        return jobs.filter(x => x.IsPublished === true);
      } else if (favouriteChecked && selectedValue === 'published') {
        return jobs.filter(x => x.IsFavourite === true && x.IsPublished === true );
      } else if (!favouriteChecked && selectedValue === 'internal') {
        return jobs.filter(x => x.IsPublished === false);
      } else {
        return jobs.filter(x => x.IsFavourite === true && x.IsPublished === false);
      }
    } else {
      if (!favouriteChecked && selectedValue === 'all') {
        return jobs.filter( x => x.IsArchived === false);
      } else if (favouriteChecked && selectedValue === 'all') {
        return jobs.filter(x => x.IsFavourite === true && x.IsArchived === false);
      } else if (!favouriteChecked && selectedValue === 'published') {
        return jobs.filter(x => x.IsPublished === true && x.IsArchived === false);
      } else if (favouriteChecked && selectedValue === 'published') {
        return jobs.filter(x => x.IsFavourite === true && x.IsPublished === true && x.IsArchived === false);
      } else if (!favouriteChecked && selectedValue === 'internal') {
        return jobs.filter(x => x.IsPublished === false && x.IsArchived === false);
      } else {
        return jobs.filter(x => x.IsFavourite === true && x.IsPublished === false && x.IsArchived === false);
      }
    }
  }
}
