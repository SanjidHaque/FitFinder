import { Injectable } from '@angular/core';

import {Candidate} from '../../models/candidate/candidate.model';
import {CandidatesForInterview} from '../../models/interview/candidates-for-interview.model';
import {InterviewersForInterview} from '../../models/interview/interviewers-for-interview.model';
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


  mergeCandidateList(selectedCandidates: any[], interview: Interview) {

    let candidatesForInterview: CandidatesForInterview[] = [];
    for (let i = 0; i < selectedCandidates.length; i++) {
      const candidateForInterview = new CandidatesForInterview(
        null,
        null,
        interview.Id,
        null,
        selectedCandidates[i].Id
      );
      candidatesForInterview.push(candidateForInterview);
    }


    if (interview.CandidatesForInterview !== null ) {
      for (let j = 0; j < interview.CandidatesForInterview.length; j++) {
        for (let k = 0; k < candidatesForInterview.length; k++) {
          if (candidatesForInterview[k].CandidateId ===
            interview.CandidatesForInterview[j].CandidateId ) {
            candidatesForInterview.splice(k, 1);
          }
        }
      }

      console.log(candidatesForInterview);

       interview.CandidatesForInterview =
        Array.from(new Set(interview.CandidatesForInterview.
        concat(candidatesForInterview)));
    } else {
      interview.CandidatesForInterview = candidatesForInterview;
    }
    candidatesForInterview = [];
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
