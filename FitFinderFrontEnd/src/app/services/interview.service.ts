import { Injectable } from '@angular/core';
import {Interview} from '../models/interview.model';
import {Subject} from 'rxjs/index';
import {Candidate} from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  interviews: Interview[] = [];
  interviewsChanged = new Subject<Interview[]>();
  candidates: Candidate[] = [];

  getAllInterview() {
    return this.interviews.slice();
  }

  getAllCandidate() {
    return this.candidates.slice();
  }

  addNewInterview(interview: Interview) {
    this.interviews.push(interview);
    this.interviewsChanged.next(this.interviews.slice());
  }


}
