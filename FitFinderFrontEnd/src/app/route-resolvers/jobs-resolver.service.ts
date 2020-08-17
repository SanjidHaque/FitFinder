import { Injectable } from '@angular/core';
import {Job} from '../models/job/job.model';
import {Resolve} from '@angular/router';
import {JobDataStorageService} from '../services/data-storage-services/job-data-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsResolverService implements Resolve<Job[]> {
  constructor(private jobDataStorageService: JobDataStorageService) {}

  resolve(): Observable<Job[]> | Promise<Job[]> | Job[] {
    return this.jobDataStorageService.getAllJob();
  }
}
