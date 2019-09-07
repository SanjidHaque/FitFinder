import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {CandidateDataStorageService} from '../services/data-storage/candidate-data-storage.service';
import {Candidate} from '../models/candidate.model';
import {Observable} from 'rxjs';
import {UserAccount} from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateResolverService implements Resolve<Candidate> {
  constructor(private candidateDataStorageService: CandidateDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot):
    Observable<Candidate> | Promise<Candidate> | Candidate {
    return this.candidateDataStorageService.getCandidate(+route.paramMap.get('candidate-id'));
  }
}

