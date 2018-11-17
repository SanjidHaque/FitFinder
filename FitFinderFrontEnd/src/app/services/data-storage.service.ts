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

  private candidateJson = 'assets/mock-data/candidates.json';
  private candidateApi = 'http://localhost:8080/api/GetAllCandidate';

  private interviewJson = 'assets/mock-data/interviews.json';
  private interviewApi = 'http://localhost:8080/api/GetAllInterview';

  private jobJson = 'assets/mock-data/jobs.json';
  private jobApi = 'http://localhost:8080/api/GetAllJob';

  getAllCandidate() {
    return this.httpClient.get<Candidate[]>(this.candidateJson);
  }

  getAllInterview() {
    return this.httpClient.get<Interview[]>(this.interviewJson);
  }

  getAllJob() {
    return this.httpClient.get<Job[]>(this.jobJson);
  }


}
