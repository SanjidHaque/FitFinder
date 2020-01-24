import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {Interview} from '../../../models/interview/interview.model';
import * as moment from 'moment';
import {NotifierService} from 'angular-notifier';
import {Candidate} from '../../../models/candidate/candidate.model';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {SelectCandidatesForInterviewDialogComponent} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {MatDialog} from '@angular/material';
import {CandidatesForInterview} from '../../../models/interview/candidates-for-interview.model';
import {Source} from '../../../models/settings/source.model';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {InterviewService} from '../../../services/shared-services/interview.service';


@Component({
  selector: 'app-interview-id',
  templateUrl: './interview-id.component.html',
  styleUrls: ['./interview-id.component.css']
})
export class InterviewIdComponent implements OnInit {
  interview: Interview;
  interviews: Interview[] = [];
  candidates: Candidate[] = [];
  jobs: Job[] = [];
  sources: Source[] = [];

  disableEmailInvites = false;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  interviewStatuses : any = [];

  constructor(private route: ActivatedRoute,
              private jobService: JobDataStorageService,
              private settingsDataStorageService: SettingsDataStorageService,
              private router: Router,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private interviewService: InterviewService,
              private candidateDataStorageService: CandidateDataStorageService,
              private interviewDataStorageService: InterviewDataStorageService) {}

  ngOnInit() {
    this.route.data.subscribe(
        (data: Data) => {
          this.jobs = data['jobs'].jobs;
          this.sources = data['sources'].sources;
          this.interview = data['interview'].interview;
          this.candidates = data['candidates'].candidates;
          this.interviewStatuses = this.interviewService.getInterviewStatuses();
        });
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
            null,
            this.interview.Id,
            null,
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
      .find(x => x.Id === candidateId).CandidateAttachments;
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
    const jobAssigned = this.candidates.find(x => x.Id === candidateId).JobAssignments;

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
    return job.Title;
  }



  getInterviewDay(interview: Interview) {
    return moment(new Date(interview.Date)).format('Do');
  }

  getInterviewMonth(interview: Interview) {
    return moment(new Date(interview.Date)).format('MMMM');
  }

  getInterviewYear(interview: Interview) {
    return moment(new Date(interview.Date)).format('YYYY');
  }


}
