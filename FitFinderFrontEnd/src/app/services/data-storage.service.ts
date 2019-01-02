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

  private getAllCandidateJson = 'assets/mock-data/candidates.json';
  private getAllCandidateApi = 'http://localhost:55586/api/GetAllCandidate';

  private getAllInterviewJson = 'assets/mock-data/interviews.json';
  private getAllInterviewApi = 'http://localhost:55586/api/GetAllInterview';

  private getAllJobJson = 'assets/mock-data/jobs.json';
  private getAllJobApi = 'http://localhost:55586/api/GetAllJob';

  getAllCandidate() {
    return this.httpClient.get<Candidate[]>(this.getAllCandidateJson);
  }

  getAllInterview() {
    return this.httpClient.get<Interview[]>(this.getAllInterviewJson);
  }

  getAllJob() {
    return this.httpClient.get<Job[]>(this.getAllJobJson);
  }


  addNewCandidate(candidate: Candidate) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewCandidate', candidate);
  }

  uploadCandidateAttachments(attachments: Array<File>) {
    const formData = new FormData();
    for (let i = 0; i < attachments.length; i++) {
      formData.append('Attachments', attachments[i], attachments[i].name);
    }
    return this.httpClient.post(this.apiRootUrl + 'UploadCandidateAttachments', formData);
  }

  addNewInterview(interview: Interview) {
    return this.httpClient.post(this.apiRootUrl + 'AddNewInterview', interview);
  }
}
