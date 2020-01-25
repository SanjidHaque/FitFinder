import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {Interview} from '../../../models/interview/interview.model';
import * as moment from 'moment';
import {NotifierService} from 'angular-notifier';
import {Candidate} from '../../../models/candidate/candidate.model';
import {Job} from '../../../models/job/job.model';
import {SelectCandidatesForInterviewDialogComponent} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-for-interview-dialog.component';
import {MatDialog} from '@angular/material';
import {CandidatesForInterview} from '../../../models/interview/candidates-for-interview.model';
import {Source} from '../../../models/settings/source.model';
import {InterviewService} from '../../../services/shared-services/interview.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';
import {SettingsService} from '../../../services/shared-services/settings.service';


@Component({
  selector: 'app-interview-id',
  templateUrl: './interview-id.component.html',
  styleUrls: ['./interview-id.component.css']
})
export class InterviewIdComponent implements OnInit {
  isDisabled = false;

  selectedInterviewStatus = '';
  disableEmailInvites = false;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';

  interview: Interview;
  interviews: Interview[] = [];
  candidates: Candidate[] = [];
  jobs: Job[] = [];
  sources: Source[] = [];
  interviewStatuses : any = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private settingsService: SettingsService,
              private interviewService: InterviewService,
              private interviewDataStorageService: InterviewDataStorageService) {}

  ngOnInit() {
    this.route.data.subscribe(
        (data: Data) => {
          this.interview = data['interview'].interview;

          if (this.interview === null) {
            this.router.navigate(['/interviews']);
            this.notifierService.notify('default', 'Resource not found!');
          }

          this.jobs = data['jobs'].jobs;
          this.sources = data['sources'].sources;
          this.candidates = data['candidates'].candidates;
          this.interviewStatuses = this.interviewService.getInterviewStatuses();
          this.selectedInterviewStatus = this.interview.InterviewStatus;

        });
  }


  archiveInterview() {
    const interviews: Interview[] = [];
    interviews.push(this.interview);
    this.interviewService.archiveInterviews(interviews);
  }

  restoreInterview() {
    const interviews: Interview[] = [];
    interviews.push(this.interview);
    this.interviewService.restoreInterviews(interviews);
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
        this.interviewService.mergeCandidateList(result, this.interview);
      }
    });
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



  changeInterviewStatus(statusName: string) {
    this.interview.InterviewStatus = statusName;
    this.interviewDataStorageService.changeInterviewStatus(this.interview)
      .subscribe((data: any) => {
        if (data.statusText === 'Success') {

          this.disableEmailInvites = statusName === 'Confirmed' || statusName === 'Declined';
          this.notifierService.notify('default', 'Interview status changed.');
        } else {
          this.notifierService.notify('default', data.statusText);
        }
      });
  }


  deleteInterview() {
    this.settingsService.deleteResource('Delete Interview')
      .then(result => {

        if (result.confirmationStatus) {
          this.isDisabled = true;

          this.interviewDataStorageService.deleteInterview(this.interview.Id)
            .subscribe((response: any) => {
              if (response.statusText !== 'Success') {
                this.isDisabled = false;
                this.notifierService.notify('default', response.statusText);
              } else {
                this.router.navigate(['/interviews']);
                this.notifierService.notify('default', 'Interview deleted successfully.');
              }

            });
        }
      }).catch();
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
