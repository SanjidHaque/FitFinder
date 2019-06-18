import { Injectable } from '@angular/core';
import {Interview} from '../../models/interview.model';
import {Subject} from 'rxjs/index';
import {Candidate} from '../../models/candidate.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewDataStorageService {
  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }


  getAllInterview() {
    return this.httpClient.get<Interview[]>(this.rootUrl + '/api/GetAllInterview');
  }

  addNewInterview(interview: Interview) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewInterview', interview);
  }
  archiveInterviews(interviews: Interview[]) {
    return this.httpClient.put(this.rootUrl + '/api/ArchiveInterviews', interviews);
  }

  restoreInterviews(interviews: Interview[]) {
    return this.httpClient.put(this.rootUrl + '/api/RestoreInterviews', interviews);
  }
}
