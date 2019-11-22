import { Injectable } from '@angular/core';
import {JobAssignment} from '../../models/candidate/job-assignment.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobAssignmentDataStorageService {
  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }


  addJobAssignment(jobAssignment: JobAssignment) {
    return this.httpClient.post<JobAssignment>(this.rootUrl + '/api/AddJobAssignment',
      jobAssignment);
  }

  updateJobAssignment(jobAssignment: JobAssignment) {
    return this.httpClient.post<JobAssignment>(this.rootUrl + '/api/UpdateJobAssignment',
      jobAssignment);
  }

  removeJobAssignment (jobAssignment: JobAssignment) {
    return this.httpClient.post<JobAssignment>(this.rootUrl + '/api/RemoveJobAssignment',
      jobAssignment);
  }
}
