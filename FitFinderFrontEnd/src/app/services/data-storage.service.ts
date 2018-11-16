import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Candidate} from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private httpClient: HttpClient) { }

  private candidateJson = 'assets/mock-data/candidate.json';
  private candidateApi = 'http://localhost:8080/api/GetAllCandidate';

  getAllCandidate() {
    return this.httpClient.get<Candidate[]>(this.candidateJson);
  }


}
