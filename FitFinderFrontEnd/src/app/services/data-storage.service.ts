import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Candidate} from '../models/candidate.model';
import {Interview} from '../models/interview.model';
import {Job} from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private httpClient: HttpClient) { }

  private apiRootUrl = 'http://localhost:55586/api/';

  private getCandidateJson = 'assets/mock-data/candidates.json';
  private getCandidateApi = 'http://localhost:55586/api/GetAllCandidate';

  private getInterviewJson = 'assets/mock-data/interviews.json';
  private getInterviewApi = 'http://localhost:55586/api/GetAllInterview';

  private getJobJson = 'assets/mock-data/jobs.json';
  private getJobApi = 'http://localhost:55586/api/GetAllJob';

  getAllCandidate() {
    return this.httpClient.get<Candidate[]>(this.getCandidateJson);
  }

  getAllInterview() {
    return this.httpClient.get<Interview[]>(this.getInterviewJson);
  }

  getAllJob() {
    return this.httpClient.get<Job[]>(this.getJobJson);
  }


  addNewCandidate(candidate: Candidate) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewCandidate', candidate);
  }



  uploadCandidateAttachment(candidateAttachments: Array<File>, candidateId: string) {
    const formData = new FormData();
    for (let i = 0; i < candidateAttachments.length; i++) {
      formData.append('Candidate Attachments', candidateAttachments[i], candidateAttachments[i].name);
    }
   formData.append('Candidate Id', candidateId);
    return this.httpClient.post(this.apiRootUrl + 'UploadCandidateAttachment', formData);
  }



}
