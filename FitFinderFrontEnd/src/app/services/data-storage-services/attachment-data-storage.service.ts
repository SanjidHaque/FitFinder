import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserAccountDataStorageService} from './user-account-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentDataStorageService {
  private rootUrl = '';

  constructor(private httpClient: HttpClient,
              private userAccountDataStorageService: UserAccountDataStorageService) {
    this.rootUrl = userAccountDataStorageService.rootUrl;
  }

  uploadAttachments(attachments: Array<File>) {
    const formData = new FormData();
    for (let i = 0; i < attachments.length; i++) {
      formData.append('Attachments', attachments[i]);
    }
    return this.httpClient.post(this.rootUrl + '/api/UploadAttachments', formData);
  }

  uploadImage(id: string, candidateImage: File, objectType: string) {
    const formData = new FormData();
    formData.append('CandidateImage', candidateImage);
    formData.append('Id', id);
    formData.append('ObjectType', objectType);
    return this.httpClient.post(this.rootUrl + '/api/UploadImage', formData);
  }
}
