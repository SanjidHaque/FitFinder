import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {CandidateDataStorageService} from '../services/data-storage-services/candidate-data-storage.service';
import {Candidate} from '../models/candidate/candidate.model';
import {Observable} from 'rxjs';
import {UserAccount} from '../models/settings/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateResolverService implements Resolve<any> {
  constructor(private candidateDataStorageService: CandidateDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.candidateDataStorageService.getCandidate(+route.paramMap.get('candidate-id'));
  }
}

