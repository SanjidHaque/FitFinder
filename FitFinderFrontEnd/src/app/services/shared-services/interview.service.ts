import { Injectable } from '@angular/core';

import {Candidate} from '../../models/candidate/candidate.model';
import {CandidateForInterview} from '../../models/interview/candidate-for-interview.model';
import {InterviewerForInterview} from '../../models/interview/interviewer-for-interview.model';
import {Interview} from '../../models/interview/interview.model';
import {DialogService} from '../dialog-services/dialog.service';
import {InterviewDataStorageService} from '../data-storage-services/interview-data-storage.service';
import {NotifierService} from 'angular-notifier';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class InterviewService {
  interviews: Interview[] = [];

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

  getAllInterview() {
    return this.interviews.slice();
  }

  getInterviewTypes() {
    return this.interviewTypes.slice();
  }

  getInterviewStatuses() {
    return this.interviewStatuses.slice();
  }

  getTimeIn12HourFormat(time: string) {
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

  getTimeIn24HourFormat(time: string) {
    let hours = Number.parseInt(time.slice(0, 2), 10);
    const minutes = time.slice(3, 5);
    const format = time.slice(6, 8);
    let newTime;

    if (format === 'AM') {
      newTime = hours.toString() + ':' + minutes;
    } else {
      hours += 12;
      newTime = hours.toString() + ':' + minutes;
    }

    return newTime;
  }



  getCandidatesForInterview(selectedCandidatesForInterview: Candidate[], interviewId: number) {
    const candidatesForInterview: CandidateForInterview[] = [];

    for (let i = 0; i < selectedCandidatesForInterview.length; i++) {
      const candidateForInterview =
        new CandidateForInterview(
          null,
          null,
          interviewId,
          null,
          selectedCandidatesForInterview[i].Id,
          'Pending'
        );
      candidatesForInterview.push(candidateForInterview);
    }
    return candidatesForInterview;
  }

  getInterviewersForInterview(interviewers: any[]) {
    const interviewersForInterview: InterviewerForInterview[] = [];

    for (let i = 0; i < interviewers.length; i++) {
      const interviewerForInterview =
        new InterviewerForInterview(
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
  

  matchInterviewsByDate(interviews: Interview[], selectedDate: string) {
    const filteredInterviews: Interview[] = [];

    interviews.forEach(interview => {
      const formattedDate = moment(new Date(interview.Date))
        .format('ddd, Do MMMM, YYYY');

      if (formattedDate === selectedDate ) {
        filteredInterviews.push(interview);
      }
    });

    return filteredInterviews;
  }

  filterByDate(selectedDate: string,
               archivedSelected: boolean,
               selectedInterviewType: string) {
    let interviews = this.interviews;

    if (!archivedSelected) {
     interviews = interviews.filter(x => x.IsArchived === false);
    }

    if (selectedDate === '' && selectedInterviewType === 'All') {
      return interviews;
    } else if (selectedDate === '' && selectedInterviewType !== 'All') {
      return interviews.filter(x => x.InterviewType === selectedInterviewType);
    } else if (selectedDate !== '' && selectedInterviewType === 'All') {
      return this.matchInterviewsByDate(interviews, selectedDate);
    } else {
      return this.matchInterviewsByDate(interviews, selectedDate)
        .filter(x => x.InterviewType === selectedInterviewType);
    }
  }

}
