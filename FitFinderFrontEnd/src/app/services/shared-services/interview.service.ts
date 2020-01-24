import { Injectable } from '@angular/core';

import {Candidate} from '../../models/candidate/candidate.model';
import {CandidatesForInterview} from '../../models/interview/candidates-for-interview.model';
import {InterviewersForInterview} from '../../models/interview/interviewers-for-interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  interviewTypes = [
    {Name: 'Face to Face'},
    {Name: 'Telephonic'},
    {Name: 'Video Conference'},
    {Name: 'Group'},
    {Name: 'Panel'}
  ];
  interviewStatuses = [
    {Name: 'Pending'},
    {Name: 'Invited'},
    {Name: 'Confirmed'},
    {Name: 'Declined'}
  ];

  getInterviewTypes() {
    return this.interviewTypes.slice();
  }
  getInterviewStatuses() {
    return this.interviewStatuses.slice();
  }

  getTimeWithAmOrPm(time: string) {
    const minutes = time.slice(3, 5);
    let newTime;

    if (Number.parseInt(time.slice(0, 2), 10) > 12) {
      const hours = Number.parseInt(time.slice(0, 2), 10) - 12;
      newTime = hours.toString() + ':' + minutes + ' PM';
    } else if (Number.parseInt(time.slice(0, 2), 10) === 0) {
      newTime = '12' + ':' + minutes + ' AM';
    } else if (Number.parseInt(time.slice(0, 2), 10) === 12) {
      newTime = '12' + ':' + minutes + ' PM';
    } else {
      newTime = time + ' AM';
    }

    return newTime;
  }

  getCandidatesForInterview(selectedCandidatesForInterview: Candidate[]) {
    const candidatesForInterview: CandidatesForInterview[] = [];

    for (let i = 0; i < selectedCandidatesForInterview.length; i++) {
      const candidateForInterview =
        new CandidatesForInterview(
          null,
          null,
          null,
          null,
          selectedCandidatesForInterview[i].Id
        );
      candidatesForInterview.push(candidateForInterview);
    }
    return candidatesForInterview;
  }

  getInterviewersForInterview(interviewers: any[]) {
    const interviewersForInterview: InterviewersForInterview[] = [];

    for (let i = 0; i < interviewers.length; i++) {
      const interviewerForInterview =
        new InterviewersForInterview(
          null,
          null,
          null,
          null,
          interviewers[i].Id
        );
      interviewersForInterview.push(interviewerForInterview);
    }
    return interviewersForInterview;
  }


}
