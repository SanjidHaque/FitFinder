import { Injectable } from '@angular/core';

import {Candidate} from '../../models/candidate/candidate.model';
import {CandidateForInterview} from '../../models/interview/candidate-for-interview.model';
import {InterviewerForInterview} from '../../models/interview/interviewer-for-interview.model';
import {Interview} from '../../models/interview/interview.model';
import {DialogService} from '../dialog-services/dialog.service';
import {InterviewDataStorageService} from '../data-storage-services/interview-data-storage.service';
import {NotifierService} from 'angular-notifier';

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

  constructor(private dialogService: DialogService,
              private notifierService: NotifierService,
              private interviewDataStorageService: InterviewDataStorageService) {}

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



  archiveInterviews(interviews: Interview[]) {

    this.dialogService.confirmationDialog(
      'Archive Interview',
      'fas fa-archive',
      '400px',
      'warn',
      'Are you sure?',
      'Archive',
      false
    ).afterClosed().subscribe(result => {

      if (result.confirmationStatus) {

        this.interviewDataStorageService.archiveInterviews(interviews)
          .subscribe(
            (response: any) => {
              if (response.statusText === 'Success') {

                interviews.forEach((interview) => {
                  interview.IsArchived = true;
                });
                this.notifierService.notify('default', 'Archived successfully!');

              } else {
                this.notifierService.notify('default', response.statusText);
              }
            });
      }
    });
  }

  restoreInterviews(interviews: Interview[]) {

    this.dialogService.confirmationDialog(
      'Restore Interview',
      'far fa-window-restore',
      '400px',
      'warn',
      'Are you sure?',
      'Restore',
      false
    ).afterClosed().subscribe(result => {

      if (result.confirmationStatus) {

        this.interviewDataStorageService.restoreInterviews(interviews)
          .subscribe(
            (response: any) => {
              if (response.statusText === 'Success') {

                interviews.forEach((interview) => {
                  interview.IsArchived = false;
                });
                this.notifierService.notify('default', 'Restored successfully!');

              } else {
                this.notifierService.notify('default', response.statusText);
              }
            });
      }
    });
  }
}
