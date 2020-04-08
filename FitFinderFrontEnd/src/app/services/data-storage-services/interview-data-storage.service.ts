import { Injectable } from '@angular/core';
import {Interview} from '../../models/interview/interview.model';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {InterviewerForInterview} from '../../models/interview/interviewer-for-interview.model';
import {CandidateForInterview} from '../../models/interview/candidate-for-interview.model';

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

  getAllCandidateSpecificInterview(candidateId: number) {
    return this.httpClient.get<CandidateForInterview[]>(`${this.rootUrl +
    '/api/GetAllCandidateSpecificInterview'}/${candidateId}`);
  }

  getInterview(interviewId: number) {
    return this.httpClient.get<Interview>(`${this.rootUrl +
    '/api/GetInterview'}/${interviewId}` );
  }


  addNewInterview(interview: Interview) {
    return this.httpClient.post<Interview>(this.rootUrl + '/api/AddNewInterview',
      interview);
  }

  archiveInterviews(interviews: Interview[]) {
    return this.httpClient.put<Interview[]>(this.rootUrl + '/api/ArchiveInterviews',
      interviews);
  }

  restoreInterviews(interviews: Interview[]) {
    return this.httpClient.put<Interview>(this.rootUrl + '/api/RestoreInterviews',
      interviews);
  }

  changeInterviewStatus(candidateForInterview: CandidateForInterview) {
    return this.httpClient.put<Interview>(this.rootUrl + '/api/ChangeInterviewStatus',
      candidateForInterview);
  }

  assignCandidatesToInterview(candidatesForInterview: CandidateForInterview[]) {
    return this.httpClient.post<CandidateForInterview[]>
    (this.rootUrl + '/api/AssignCandidatesToInterview', candidatesForInterview);
  }

  removeCandidatesFromInterview(id: number) {
    return this.httpClient
      .delete(`${this.rootUrl + '/api/RemoveCandidatesFromInterview'}/${id}`);
  }

  assignInterviewerToInterview(interviewersForInterview: InterviewerForInterview) {
    return this.httpClient.post<InterviewerForInterview>
    (this.rootUrl + '/api/AssignInterviewerToInterview', interviewersForInterview);
  }

  removeInterviewerFromInterview(id: number) {
    return this.httpClient
      .delete(`${this.rootUrl + '/api/RemoveInterviewerFromInterview'}/${id}`);
  }

  editInterview(interview: Interview) {
    return this.httpClient.put<Interview>(this.rootUrl + '/api/EditInterview', interview);
  }

  deleteInterview(interviewId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteInterview'}/${interviewId}`);
  }

}
