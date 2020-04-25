import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {JobDataStorageService} from '../services/data-storage-services/job-data-storage.service';
import {JobAssignment} from '../models/candidate/job-assignment.model';

@Injectable({
  providedIn: 'root'
})
export class JobSpecificCandidatesResolverService {

  constructor(private jobDataStorageService: JobDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot):
    Observable<JobAssignment[]> |
    Promise<JobAssignment[]> |
    JobAssignment[] {
    return this.jobDataStorageService
      .getAllJobSpecificCandidate(+route.paramMap.get('job-id'));
  }
}
