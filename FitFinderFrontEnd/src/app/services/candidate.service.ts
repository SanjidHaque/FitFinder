import { Injectable } from '@angular/core';
import {Candidate} from '../models/candidate.model';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidate: Candidate;
  candidates: Candidate[] = [];

  getAllCandidate() {
    return this.candidates.slice();
  }
}
