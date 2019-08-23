import { Injectable } from '@angular/core';
import {Candidate} from '../../models/candidate.model';
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
    return this.httpClient.get(`${this.rootUrl + '/api/GetCandidate'}/${candidateId}` );
  }


  addNewCandidate(candidate: Candidate) {
    return this.httpClient.post(this.rootUrl + '/api/AddNewCandidate', candidate);
  }

  uploadAttachments(attachments: Array<File>) {
    const formData = new FormData();
    for (let i = 0; i < attachments.length; i++) {
      formData.append('Attachments', attachments[i], attachments[i].name);
    }
    return this.httpClient.post(this.rootUrl + '/api/UploadAttachments', formData);
  }


  archiveCandidates(candidates: Candidate[]) {
    return this.httpClient.put(this.rootUrl + '/api/ArchiveCandidates', candidates);
  }



  restoreCandidates(candidates: Candidate[]) {
    return this.httpClient.put(this.rootUrl + '/api/RestoreCandidates', candidates);
  }

  favouriteCandidates(candidates: Candidate[]) {
    return this.httpClient.put(this.rootUrl + '/api/FavouriteCandidates', candidates);
  }

  unfavouriteCandidates(candidates: Candidate[]) {
    return this.httpClient.put(this.rootUrl + '/api/UnfavouriteCandidates', candidates);
  }

}
