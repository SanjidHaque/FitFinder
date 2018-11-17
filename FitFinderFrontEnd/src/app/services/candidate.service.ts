import { Injectable } from '@angular/core';
import {Candidate} from '../models/candidate.model';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidates: Candidate[] = [];
  candidatesChanged = new Subject<Candidate[]>();


  getAllCandidate() {
    return this.candidates.slice();
  }

  addNewCandidate(candidate: Candidate) {
    this.candidates.push(candidate);
    this.candidatesChanged.next(this.candidates.slice());
  }

}
