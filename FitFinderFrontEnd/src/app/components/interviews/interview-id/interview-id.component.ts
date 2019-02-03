import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CandidateService} from '../../../services/candidate.service';
import {InterviewService} from '../../../services/interview.service';
import {Interview} from '../../../models/interview.model';
import * as moment from 'moment';
import {NotifierService} from 'angular-notifier';
import {Candidate} from '../../../models/candidate.model';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import {SelectCandidatesForInterviewDialogComponent} from '../add-new-interview/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {MatDialog} from '@angular/material';
import {UUID} from 'angular2-uuid';
import {CandidatesForInterview} from '../../../models/candidates-for-interview.model';
import {Source} from '../../../models/source.model';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-interview-id',
  templateUrl: './interview-id.component.html',
  styleUrls: ['./interview-id.component.css']
})
export class InterviewIdComponent implements OnInit {
  interviewId: number;
  pending = 1;
  interviews: Interview[] = [];
  interview: Interview;
  candidates: Candidate[] = [];
  jobs: Job[] = [];
  jobNotAssigned: boolean;
  sources: Source[] = [];
  disableEmailInvites = false;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';

  users = [
    {id: 1, userName: 'Yaha Juan', role: 'Super user'},
    {id: 2, userName: 'Cholo Han', role: 'HR'},
    {id: 3, userName: 'Kaytui Hyan', role: 'Team member'},
    {id: 4, userName: 'Kunisu Honda', role: 'Team member'},
    {id: 5, userName: 'Yahan Kawai', role: 'HR'},
    {id: 6, userName: 'Tatua Nokia', role: 'Team member'},
    {id: 7, userName: 'Vusimuji Momak', role: 'Team member'},
    {id: 8, userName: 'Wyengyu Duija', role: 'Team member'}
  ];

  interviewTypes = [
    {id: 1, type: 'Face to Face'},
    {id: 2, type: 'Telephonic'},
    {id: 3, type: 'Video Conference'},
    {id: 4, type: 'Group'},
    {id: 5, type: 'Panel'}
  ];

  interviewStatuses = [
    { Id: 1, Name: 'Pending' },
    { Id: 2, Name: 'Invited' },
    { Id: 3, Name: 'Confirmed' },
    { Id: 4, Name: 'Declined' }
  ];

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private jobService: JobService,
              private settingsService: SettingsService,
              private router: Router,
              private candidateService: CandidateService,
              private interviewService: InterviewService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.interviewId = +params['interview-id'];
        }
      );
  }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob();
    this.candidates = this.candidateService.getAllCandidate();
    this.interviews = this.interviewService.getAllInterview();
    this.interview = this.interviews.find(x => x.Id === this.interviewId);
    this.sources = this.settingsService.getAllSource();
  }

  removeCandidate(index: number) {
    this.interview.CandidatesForInterview.splice(index, 1);
  }

  openSelectCandidatesDialog() {
    const dialogRef = this.dialog.open(SelectCandidatesForInterviewDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        minHeight: '650px',
        maxHeight: '650px'
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '' ) {
        let candidatesForInterview: CandidatesForInterview[] = [];

        for (let i = 0; i < result.length; i++) {
          const candidateForInterview = new CandidatesForInterview(
            null,
            this.interviewId,
            result[i].Id
          );
          candidatesForInterview.push(candidateForInterview);
        }

        if (this.interview.CandidatesForInterview.length !== 0 ) {
          for (let k = 0; k < candidatesForInterview.length; k++) {
            for (let j = 0; j < this.interview.CandidatesForInterview.length; j++) {
              if (candidatesForInterview[k].CandidateId === this.interview.CandidatesForInterview[j].CandidateId ) {
                this.interview.CandidatesForInterview.splice(j, 1);
              }
            }
          }

          this.interview.CandidatesForInterview =
            Array.from(new Set(this.interview.CandidatesForInterview.
            concat(candidatesForInterview)));
        } else {
          this.interview.CandidatesForInterview = candidatesForInterview;
        }
        candidatesForInterview = [];
      }
    })
  }


  getCandidateAttachment(candidateId: number) {
    const attachments = this.candidates.find(x => x.Id === candidateId).CandidateAttachment;
    if (attachments === []) {
      return [];
    } else {
      return attachments;
    }

  }

  downloadFile(modifiedFileName: number) {
    /*window.open('http://localhost:55586/Content/Attachments/' + modifiedFileName);*/
    /*The above line will be comment out when working with back end.*/
    window.open('assets/cseregular3rd.pdf');
  }

  getApplicationDate(candidateId: number) {
    const date = this.candidates.find(x => x.Id === candidateId).ApplicationDate;
    return moment(new Date(date)).format('Do MMM YYYY');
  }

  getCandidateSource(candidateId: number) {
    const sourceId = this.candidates.find( x => x.Id === candidateId).SourceId;
    return this.sources.find(x => x.Id === sourceId).Name;
  }


  getCandidateFullName(candidateId: number) {
    const candidate = this.candidates.find(x => x.Id === candidateId);
    return candidate.FirstName + ' ' + candidate.LastName;
  }
  getCandidateEmail(candidateId: number) {
    return this.candidates.find(x => x.Id === candidateId).Email;
  }

  getCandidatePhone(candidateId: number) {
    return this.candidates.find(x => x.Id === candidateId).Mobile;
  }

  getCandidateFullAddress(candidateId: number) {
    const candidate = this.candidates.find(x => x.Id === candidateId);
    if (candidate.Address === '') {
      return candidate.City + ', ' + candidate.State + ', ' + candidate.Country;
    } else if (candidate.State === '') {
      return candidate.Address + ', ' + candidate.City + ', ' + candidate.Country;
    } else if (candidate.State === '' || candidate.Address === '') {
      return candidate.City + ', ' + candidate.Country;
    } else {
      return candidate.Address + ', ' + candidate.State + ', '
        + candidate.City + ', ' + candidate.Country;
    }
  }

  goToFacebookProfile(candidateId: number) {
    const candidateFb = this.candidates.find(x => x.Id === candidateId).FacebookUrl;
    if (candidateFb !== '') {
      window.open('http://' + candidateFb);
    }
  }

  facebookUrlExist(candidateId: number) {
    const candidateFb = this.candidates.find(x => x.Id === candidateId).FacebookUrl;
    if (candidateFb === '') {
      return false;
    }
    return true;
  }

  linkedInUrlExist(candidateId: number) {
    const candidateLn = this.candidates.find(x => x.Id === candidateId).LinkedInUrl;
    if (candidateLn === '') {
      return false;
    }
    return true;
  }

  goToLinkedInProfile(candidateId: number) {
    const candidateLn = this.candidates.find(x => x.Id === candidateId).LinkedInUrl;
    if (candidateLn !== '') {
      window.open('http://' + candidateLn);
    }
  }

  getJobTitle(candidateId: number) {
    const jobId = this.candidates.find(x => x.Id === candidateId).AssignedJobToCandidate;
    if (jobId.length === 0 ) {
      return '';
    } /*else {
      return this.jobs.find(x => x.Id === jobId).JobTitle;
    }*/

  }


  getInterviewTypeName(interview: Interview) {
    return this.interviewTypes.find(x => x.id === interview.InterviewTypeId).type;
  }

  getInterviewerName(interviewerId: number) {
    return this.users.find(x => x.id === interviewerId).userName;
  }

  getInterviewerRole(interviewerId: number) {
    return this.users.find(x => x.id === interviewerId).role;
  }

  selectValueChanged(value: any) {
    if (value === 3 || value === 4 ) {
      this.disableEmailInvites = true;
    } else {
      this.disableEmailInvites = false;
    }
    this.notifierService.notify('default', 'Interview status changed');
  }

  previousInterview() {
    const currentIndex = this.interviews.findIndex(x => x.Id === this.interviewId);
    let nextIndex = currentIndex - 1;
    if ( nextIndex === -1 ) {
      nextIndex = this.interviews.length - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
    this.interview = this.interviews[nextIndex];
    this.interviewId = this.interviews[nextIndex].Id;
    this.router.navigate(['/interviews/' + this.interviewId]);
  }

  nextInterview() {
    const currentIndex = this.interviews.findIndex(x => x.Id === this.interviewId);
    let nextIndex = currentIndex + 1;
    if ( nextIndex === this.interviews.length ) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    this.interview = this.interviews[nextIndex];
    this.interviewId = this.interviews[nextIndex].Id;
    this.router.navigate(['/interviews/' + this.interviewId]);
  }

  getInterviewDay(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('Do');
  }

  getInterviewMonth(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('MMMM');
  }

  getInterviewYear(interview: Interview) {
    return moment(new Date(interview.InterviewDate)).format('YYYY');
  }


}
