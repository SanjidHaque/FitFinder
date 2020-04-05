import { Injectable } from '@angular/core';
import {Candidate} from '../../models/candidate/candidate.model';
import {Subject} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';
import {JobAttachment} from '../../models/job/job-attachment.model';
import {CandidateAttachment} from '../../models/candidate/canidate-attachment.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateDataStorageService {

  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }

  getAllCandidate() {
    return this.httpClient.get<Candidate[]>(this.rootUrl + '/api/GetAllCandidate');
  }

  getCandidate(candidateId: number) {
    return this.httpClient.get<Candidate>(`${this.rootUrl + '/api/GetCandidate'}/${candidateId}`);
  }


  addNewCandidate(candidate: Candidate) {
    return this.httpClient.post<Candidate>(this.rootUrl + '/api/AddNewCandidate', candidate);
  }

  addNewCandidateAttachment(candidateAttachment: CandidateAttachment) {
    return this.httpClient
      .post<CandidateAttachment>(this.rootUrl + '/api/AddNewCandidateAttachment'
        , candidateAttachment);
  }

  changeCandidateResume(candidateAttachment: CandidateAttachment) {
    return this.httpClient
      .post<CandidateAttachment>(this.rootUrl + '/api/ChangeCandidateResume'
        , candidateAttachment);
  }

  archiveCandidates(candidates: Candidate[]) {
    return this.httpClient.put<Candidate[]>(this.rootUrl + '/api/ArchiveCandidates',
      candidates);
  }

  restoreCandidates(candidates: Candidate[]) {
    return this.httpClient.put<Candidate[]>(this.rootUrl + '/api/RestoreCandidates',
      candidates);
  }

  favouriteCandidates(candidates: Candidate[]) {
    return this.httpClient.put<Candidate[]>(this.rootUrl + '/api/FavouriteCandidates',
      candidates);
  }

  unfavouriteCandidates(candidates: Candidate[]) {
    return this.httpClient.put<Candidate[]>(this.rootUrl + '/api/UnfavouriteCandidates',
      candidates);
  }

  editCandidate(candidate: Candidate) {
    return this.httpClient.put<Candidate>(this.rootUrl + '/api/EditCandidate',
      candidate);
  }

  deleteCandidateImage(candidate: Candidate) {
    return this.httpClient.post<Candidate>(this.rootUrl + '/api/DeleteCandidateImage',
      candidate);
  }

  deleteCandidateAttachment(candidateAttachmentId: number) {
    return this.httpClient
      .delete(`${this.rootUrl + '/api/DeleteCandidateAttachment'}/${candidateAttachmentId}`);
  }

  deleteCandidate(candidateId: number) {
    return this.httpClient.delete(`${this.rootUrl + '/api/DeleteCandidate'}/${candidateId}`);
  }
}
