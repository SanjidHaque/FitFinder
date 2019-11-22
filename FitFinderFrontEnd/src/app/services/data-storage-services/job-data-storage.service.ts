import { Injectable } from '@angular/core';
import {Job} from '../../models/job/job.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {JobAssignment} from '../../models/candidate/job-assignment.model';


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


  getJob(jobId: number) {
    return this.httpClient.get<Job>(`${this.rootUrl + '/api/GetJob'}/${jobId}`);
  }

  addNewJob(job: Job) {
    return this.httpClient.post<Job>(this.rootUrl + '/api/AddNewJob', job);
  }




  archiveJobs(jobs: Job[]) {
    return this.httpClient.put<Job[]>(this.rootUrl  + '/api/ArchiveJobs', jobs);
  }


  restoreJobs(jobs: Job[]) {
    return this.httpClient.put<Job[]>(this.rootUrl + '/api/RestoreJobs', jobs);
  }

  favouriteJobs(jobs: Job[]) {
    return this.httpClient.put<Job[]>(this.rootUrl + '/api/FavouriteJobs', jobs);
  }

  unfavouriteJobs(jobs: Job[]) {
    return this.httpClient.put<Job[]>(this.rootUrl + '/api/UnfavouriteJobs', jobs);
  }


  editJob(job: Job) {
    return this.httpClient.put<Job>(this.rootUrl + '/api/EditJob', job);
  }

  deleteJob(jobId: number) {
    return this.httpClient.delete(`${this.rootUrl + 'api/DeleteJob'}/${jobId}`);
  }

}
