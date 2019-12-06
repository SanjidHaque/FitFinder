import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Candidate} from '../models/candidate/candidate.model';
import {CandidateDataStorageService} from '../services/data-storage-services/candidate-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatesResolverService implements Resolve<Candidate[]> {
  constructor(private candidateDataStorageService: CandidateDataStorageService) {}

  resolve(): Observable<Candidate[]> | Promise<Candidate[]> | Candidate[] {
    return this.candidateDataStorageService.getAllCandidate();
  }
}

