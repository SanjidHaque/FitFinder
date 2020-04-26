import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {Interview} from '../../../models/interview/interview.model';
import * as moment from 'moment';
import {NotifierService} from 'angular-notifier';
import {Candidate} from '../../../models/candidate/candidate.model';
import {Job} from '../../../models/job/job.model';
import {SelectCandidatesDialogComponent} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-dialog.component';
import {MatDialog} from '@angular/material';
import {CandidateForInterview} from '../../../models/interview/candidate-for-interview.model';
import {Source} from '../../../models/settings/source.model';
import {InterviewService} from '../../../services/shared-services/interview.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';
import {SettingsService} from '../../../services/shared-services/settings.service';
import {UserAccount} from '../../../models/settings/user-account.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InterviewerForInterview} from '../../../models/interview/interviewer-for-interview.model';
import {UserAccountDataStorageService} from '../../../services/data-storage-services/user-account-data-storage.service';


@Component({
  selector: 'app-interview-id',
  templateUrl: './interview-id.component.html',
  styleUrls: ['./interview-id.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewIdComponent implements OnInit {
  isDisabled = false;

  imageFolderPath = '';
  assignInterviewerForm: FormGroup;

  interview: Interview;
  interviews: Interview[] = [];
  candidates: Candidate[] = [];
  jobs: Job[] = [];
  sources: Source[] = [];
  userAccounts: UserAccount[] = [];
  interviewStatuses : any = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private settingsService: SettingsService,
              private interviewService: InterviewService,
              private userAccountDataStorageService: UserAccountDataStorageService,
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
          this.userAccounts = data['userAccounts'].userAccounts;
          this.interviewStatuses = this.interviewService.getInterviewStatuses();
          this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
          this.createAssignInterviewersForm();
        });
  }


  createAssignInterviewersForm() {
    this.assignInterviewerForm = new FormGroup({
      'userAccounts': new FormControl(null, Validators.required)
    });
  }

  assignInterviewerToInterview() {
    const userAccount = this.assignInterviewerForm.controls['userAccounts'].value;
    const ifExist = this.interview.InterviewersForInterview
      .find(x => x.UserAccount.UserName === userAccount.UserName);

    if (ifExist !== undefined) {
      this.notifierService.notify('default', 'Interviewer already assigned!');
      return;
    }

    const interviewerForInterview = new InterviewerForInterview(
      null,
      null,
      this.interview.Id,
      null,
      userAccount.Id,
    );

    this.interviewDataStorageService.assignInterviewerToInterview(interviewerForInterview)
      .subscribe((data: any) => {

        interviewerForInterview.Id = data.id;
        interviewerForInterview.UserAccount = userAccount;

        this.interview.InterviewersForInterview.push(interviewerForInterview);
        this.notifierService.notify('default', 'Interviewer assigned.');
      });
  }


  removeInterviewerFromInterview(index: number, interviewerForInterviewId: number) {
    this.settingsService.deleteResource('Remove Interviewer')
      .then(result => {

        if (result.confirmationStatus) {
          this.isDisabled = true;

          this.interviewDataStorageService
            .removeInterviewerFromInterview(interviewerForInterviewId)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {
                this.notifierService.notify('default', response.statusText);
              } else {

                this.interview.InterviewersForInterview.splice(index, 1);
                this.notifierService.notify('default', 'Interviewer removed successfully.');

              }
            });
        }
      }).catch();
  }

  archiveInterview() {
    const interviews: Interview[] = [];
    interviews.push(this.interview);

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

        this.isDisabled = true;
        this.interviewDataStorageService.archiveInterviews(interviews)
          .subscribe((response: any) => {

              this.isDisabled = false;
              interviews.forEach((interview) => {
                interview.IsArchived = true;
              });

              this.notifierService.notify('default', 'Archived successfully!');
          });
      }
    });
  }

  restoreInterview() {
    const interviews: Interview[] = [];
    interviews.push(this.interview);

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

        this.isDisabled = true;
        this.interviewDataStorageService.restoreInterviews(interviews)
          .subscribe((response: any) => {

            this.isDisabled = false;
            interviews.forEach((interview) => {
              interview.IsArchived = false;
            });

            this.notifierService.notify('default', 'Restored successfully!');

          });
      }
    });
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
    const dialogRef = this.dialog.open(SelectCandidatesDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        height: '100%',
        data:
          {
            candidates: this.candidates,
            jobs: this.jobs
          }
      });

    dialogRef.afterClosed().subscribe(selectedCandidates => {
      if (selectedCandidates !== '') {

        let candidatesForInterview: CandidateForInterview[] =
          this.interviewService
          .getCandidatesForInterview(selectedCandidates, this.interview.Id);

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

        this.interviewDataStorageService
          .assignCandidatesToInterview(candidatesForInterview)
          .subscribe((data: any) => {

            if (this.interview.CandidatesForInterview === null) {
              this.interview.CandidatesForInterview =
                data.candidatesForInterviews;
            } else {
              this.interview.CandidatesForInterview =
                this.interview.CandidatesForInterview
                  .concat(data.candidatesForInterviews);
            }

            this.notifierService
              .notify('default', 'Candidates added in interview.');
            candidatesForInterview = [];
          });
      }
    });
  }


  getJobTitle(candidateId: number) {
    // const jobAssigned = this.candidates.find(x => x.Id === candidateId).JobAssignments;
    // if (jobAssigned === null ) {
    //   return '';
    // }
    //
    // const activeJob = jobAssigned.find(x => x.IsActive === true);
    // if (activeJob === undefined) {
    //   return '';
    // }
    //
    // const job = this.jobs.find(x => x.Id === activeJob.JobId);
    // if (job === undefined) {
    //   return '';
    // }

    return 'Porsche Carrera GT';
  }



  changeInterviewStatus(statusName: string, candidateForInterview: CandidateForInterview) {

    this.interviewDataStorageService.changeInterviewStatus(candidateForInterview)
      .subscribe((data: any) => {
        if (data.statusText === 'Success') {
          candidateForInterview.InterviewStatus = statusName;

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
    return moment(new Date(interview.Date)).format('D');
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

  goToGithubProfile(candidate: Candidate) {
    window.open('http://' + candidate.GitHubUrl);
  }

}
