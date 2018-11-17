import { Injectable } from '@angular/core';
import {Interview} from '../models/interview.model';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  interviews: Interview[] = [];
  interviewsChanged = new Subject<Interview[]>();

  getAllInterview() {
    return this.interviews.slice();
  }

  addNewInterview(interview: Interview) {
    this.interviews.push(interview);
    this.interviewsChanged.next(this.interviews.slice());
  }


}
