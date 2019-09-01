import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {CandidateDataStorageService} from '../../../services/data-storage/candidate-data-storage.service';
import {InterviewDataStorageService} from '../../../services/data-storage/interview-data-storage.service';
import {Interview} from '../../../models/interview.model';
import * as moment from 'moment';
import {NotifierService} from 'angular-notifier';
import {Candidate} from '../../../models/candidate.model';
import {Job} from '../../../models/job.model';
import {JobDataStorageService} from '../../../services/data-storage/job-data-storage.service';
import {SelectCandidatesForInterviewDialogComponent} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {MatDialog} from '@angular/material';
import {CandidatesForInterview} from '../../../models/candidates-for-interview.model';
import {Source} from '../../../models/source.model';
import {SettingsDataStorageService} from '../../../services/data-storage/settings-data-storage.service';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {InterviewService} from '../../../services/shared/interview.service';


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
              private jobService: JobDataStorageService,
              private settingsDataStorageService: SettingsDataStorageService,
              private router: Router,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private interviewService: InterviewService,
              private candidateDataStorageService: CandidateDataStorageService,
              private interviewDataStorageService: InterviewDataStorageService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.interviewId = +params['interview-id'];
        }
      );
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobs = data['jobs'];
          this.sources = data['sources'];
          this.interview = data['interview'];
          this.candidates = data['candidates'];
        }
      );

   // this.interview = this.interviews.find(x => x.Id === this.interviewId);

  }


  archiveInterviews(interview: Interview) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Archive Interview',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          const interviews: Interview[] = [];
          interviews.push(interview);
          this.interviewDataStorageService.restoreInterviews(interviews)
            .subscribe(
              (response: any) => {
                this.interview.IsArchived = true;
                this.notifierService.notify('default', 'Archived successfully!')
              }
            );
        }
      }
    );
  }

  restoreInterviews(interview: Interview) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Restore Interview',
          iconClass: 'far fa-window-restore',
          confirmationText: 'Are you sure?',
          buttonText: 'Restore',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          const interviews: Interview[] = [];
          interviews.push(interview);
          this.interviewDataStorageService.restoreInterviews(interviews)
            .subscribe(
              (response: any) => {
                this.interview.IsArchived = false;
                this.notifierService.notify('default', 'Restored successfully!')
              }
            );
        }
      }
    );
  }

  removeCandidate(index: number) {
    this.interview.CandidatesForInterview.splice(index, 1);

    if (this.interview.CandidatesForInterview.length === 0) {
      this.interview.CandidatesForInterview = null;
    }

  }

  openSelectCandidatesDialog() {
    const dialogRef = this.dialog.open(SelectCandidatesForInterviewDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        data:
          {
            candidates: this.candidates,
            sources: this.sources,
            jobs: this.jobs
          }
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

        if (this.interview.CandidatesForInterview !== null ) {
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
    return this.candidates
      .find(x => x.Id === candidateId).CandidateAttachment;
  }

  downloadFile(modifiedFileName: string) {
    window.open('http://localhost:55586/Content/Attachments/' + modifiedFileName);
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
    if (candidate.Address === '' && candidate.State !== '') {
      return candidate.City + ', ' + candidate.State + ', ' + candidate.Country;

    } else if (candidate.Address !== '' && candidate.State === '') {
      return candidate.Address + ', ' + candidate.City + ', ' + candidate.Country;

    } else if (candidate.State === '' && candidate.Address === '') {
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
    const jobAssigned = this.candidates.find(x => x.Id === candidateId).JobAssigned;

    if (jobAssigned === null ) {
      return '';
    }

    const activeJob = jobAssigned.find(x => x.IsActive === true);

    if (activeJob === undefined) {
      return '';
    }

    const job = this.jobs.find(x => x.Id === activeJob.JobId);

    if (job === undefined) {
      return '';
    }

    return job.JobTitle;
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
