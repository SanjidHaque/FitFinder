import { Injectable } from '@angular/core';
import {Candidate} from '../../models/candidate/candidate.model';
import {Subject} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {UserAccountDataStorageService} from './user-account-data-storage.service';

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

  //
  // addNewCandidate(candidate: Candidate) {
  //   return this.httpClient.post<Candidate>(this.rootUrl + '/api/AddNewCandidate', candidate);
  // }

  addNewCandidate(candidate: Candidate) {
    const formData = new FormData();

    const c : Candidate[] = [];
    c.push(candidate);
    const i = 0;

    for (let i = 0; i < c.length; i++) {
      formData.append('Candidate', c[i]);
    }

   // formData.append('Candidate', c[i]);
    return this.httpClient.post(this.rootUrl + '/api/UploadAttachments', formData);
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

  deleteCandidate(candidateId: number) {
    return this.httpClient.delete(`${this.rootUrl + 'api/DeleteCandidate'}/${candidateId}`);
  }
}
