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
  selectedCandidatesForInterview: Candidate[] = [];


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
    let hours = Number.parseInt(time.slice(0, 2), 10)
    const minutes = time.slice(3, 5);
    let newTime;

    if (hours > 12) {
      hours = hours - 12;
      if (hours < 10) {
        newTime = '0' + hours.toString() + ':' + minutes + ' PM';
      } else {
        newTime = hours.toString() + ':' + minutes + ' PM';
      }

    } else if (hours === 0) {
      newTime = '12' + ':' + minutes + ' AM';
    } else if (hours === 12) {
      newTime = '12' + ':' + minutes + ' PM';
    } else {
      newTime = time + ' AM';
    }

    return newTime;
  }

  getTimeIn24HourFormat(time: string) {

    let hours = Number.parseInt(time.substr(0, time.indexOf(':')), 10);
    const timeWithoutFormat = time.split(' ')[0];
    const minutes = timeWithoutFormat.substr((timeWithoutFormat.indexOf(':') + 1), timeWithoutFormat.length);
    const format = time.split(' ')[1];

    let newTime;
    if (format === 'AM') {

      if (hours < 10) {
        newTime = '0' + hours.toString() + ':' + minutes;
      } else {
        newTime = hours.toString() + ':' + minutes;
      }

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

  filterByDate(selectedDate: any,
               archivedSelected: boolean,
               selectedInterviewType: string,
               selectedInterviewPeriod: string) {

    if (selectedInterviewPeriod === 'Past' || selectedInterviewPeriod === 'Upcoming') {
      return this.filterByInterviewPeriod(selectedInterviewPeriod, archivedSelected);
    } else {
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


  filterByInterviewPeriod(selectedInterviewPeriod: string, archivedSelected: boolean) {

    let interviews = this.interviews;
    if (!archivedSelected) {
      interviews = interviews.filter(x => x.IsArchived === false);
    }

    const pastInterviews: Interview[] = [];
    const upcomingInterviews: Interview[] = [];

    interviews.forEach(interview => {

      const startTimeIn24HourFormat  = this
        .getTimeIn24HourFormat(interview.StartTime);

      const interviewStartTimeWithDate = new Date(new Date(interview.Date)
        .toDateString() + ' ' + startTimeIn24HourFormat);

      if (moment(new Date()).isBefore(interviewStartTimeWithDate)) {
        upcomingInterviews.push(interview);
      } else {
        pastInterviews.push(interview);
      }

    });

    if (selectedInterviewPeriod === 'Upcoming') {
      return upcomingInterviews;
    } else if (selectedInterviewPeriod === 'Past') {
      return pastInterviews;
    } else {
      return interviews;
    }
  }

  archiveInterviews(interviews: Interview[]) {
    this.interviews.forEach(interview => {
      const getInterview = interviews.find(x => x.Id === interview.Id);
      if (getInterview !== undefined) {
        getInterview.IsArchived = true;
      }
    });
  }

  restoreInterviews(interviews: Interview[]) {
    this.interviews.forEach(interview => {
      const getInterview = interviews.find(x => x.Id === interview.Id);
      if (getInterview !== undefined) {
        getInterview.IsArchived = false;
      }
    });
  }
}
