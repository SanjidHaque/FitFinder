import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';
import {JobDataStorageService} from '../services/data-storage-services/job-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobResolverService implements Resolve<any> {
  constructor(private jobDataStorageService: JobDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.jobDataStorageService.getJob(+route.paramMap.get('job-id'));
  }
}

