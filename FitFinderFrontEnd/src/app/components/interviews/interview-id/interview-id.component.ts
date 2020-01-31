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

  removeCandidatesFromInterview(index: number, candidatesForInterviewId: number) {
    this.settingsService.deleteResource('Remove Candidate')
      .then(result => {

        if (result.confirmationStatus) {
          this.isDisabled = true;

          this.interviewDataStorageService
            .removeCandidatesFromInterview(candidatesForInterviewId)
            .subscribe((response: any) => {
              this.isDisabled = false;
              
              if (response.statusText !== 'Success') {
                this.notifierService.notify('default', response.statusText);
              } else {

                this.interview.CandidatesForInterview.splice(index, 1);
                if (this.interview.CandidatesForInterview.length === 0) {
                  this.interview.CandidatesForInterview = null;
                }
                this.notifierService.notify('default', 'Candidate removed successfully.');

              }
            });
        }
      }).catch();
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

    dialogRef.afterClosed().subscribe(selectedCandidates => {
      if (selectedCandidates !== '') {

        let candidatesForInterview: CandidatesForInterview[] = [];
        for (let i = 0; i < selectedCandidates.length; i++) {
          const candidateForInterview = new CandidatesForInterview(
            null,
            null,
            this.interview.Id,
            null,
            selectedCandidates[i].Id
          );
          candidatesForInterview.push(candidateForInterview);
        }


        if (this.interview.CandidatesForInterview !== null) {
          for (let j = 0; j < this.interview.CandidatesForInterview.length; j++) {
            for (let k = 0; k < candidatesForInterview.length; k++) {
              if (candidatesForInterview[k].CandidateId ===
                this.interview.CandidatesForInterview[j].CandidateId) {
                candidatesForInterview.splice(k, 1);
              }
            }
          }

          if (candidatesForInterview.length === 0) {
            return;
          }

        }

        this.interviewDataStorageService.assignCandidatesToInterview(candidatesForInterview)
          .subscribe((data: any) => {

            if (this.interview.CandidatesForInterview === null) {
              this.interview.CandidatesForInterview =
                data.candidatesForInterviews;
            } else {
              this.interview.CandidatesForInterview =
                this.interview.CandidatesForInterview
                  .concat(data.candidatesForInterviews);
            }

            this.notifierService.notify('default', 'Candidates added in interview.');
            candidatesForInterview = [];
          });
      }
    });
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

  downloadFile(modifiedFileName: string) {
    window.open('http://localhost:55586/Content/Attachments/' + modifiedFileName);
  }

  getApplicationDate(candidate: Candidate) {
    return moment(new Date(candidate.ApplicationDate)).format('Do MMM YYYY');
  }

  goToFacebookProfile(candidate: Candidate) {
    window.open('http://' + candidate.FacebookUrl);
  }

  goToLinkedInProfile(candidate: Candidate) {
    window.open('http://' + candidate.LinkedInUrl);
  }

}
