import { Injectable } from '@angular/core';
import {Job} from '../models/job.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {JobDataStorageService} from '../services/data-storage/job-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobResolverService implements Resolve<Job[]> {
  constructor(private jobDataStorageService: JobDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Job[]> | Promise<Job[]> | Job[] {
    return this.jobDataStorageService.getAllJob();
  }
}
