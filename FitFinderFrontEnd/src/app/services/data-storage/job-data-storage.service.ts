import { Injectable } from '@angular/core';
import {Job} from '../../models/job.model';
import {Subject} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {JobAssigned} from '../../models/job-assigned.model';

@Injectable({
  providedIn: 'root'
})
export class JobDataStorageService {
  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }

  getAllJob() {
    return this.httpClient.get<Job[]>(this.rootUrl + '/api/GetAllJob');
  }

  addNewJob(job: Job) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewJob', job);
  }


  jobAssigned(jobAssigned: JobAssigned) {
    return this.httpClient.post(this.rootUrl + '/api/JobAssigned', jobAssigned);
  }

  jobStatusChanged(jobAssigned: JobAssigned) {
    return this.httpClient.post(this.rootUrl + '/api/JobStatusChanged', jobAssigned);
  }

  archiveJobs(jobs: Job[]) {
    return this.httpClient.put(this.rootUrl  + '/api/ArchiveJobs', jobs);
  }

  restoreJobs(jobs: Job[]) {
    return this.httpClient.put(this.rootUrl + '/api/RestoreJobs', jobs);
  }


  favouriteJobs(jobs: Job[]) {
    return this.httpClient.put(this.rootUrl + '/api/FavouriteJobs', jobs);
  }

  unfavouriteJobs(jobs: Job[]) {
    return this.httpClient.put(this.rootUrl + '/api/UnfavouriteJobs', jobs);
  }

  removeAssignedJob (jobAssigned: JobAssigned) {
    return this.httpClient.post( this.rootUrl + '/api/RemoveAssignedJob', jobAssigned);
  }








}
