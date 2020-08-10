import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {InterviewDataStorageService} from '../../../services/data-storage-services/interview-data-storage.service';
import {Interview} from '../../../models/interview/interview.model';
import * as moment from 'moment';
import {NotifierService} from 'angular-notifier';
import {Candidate} from '../../../models/candidate/candidate.model';
import {SelectCandidatesDialogComponent} from '../../../dialogs/select-candidates-for-interview-dialog/select-candidates-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CandidateForInterview} from '../../../models/interview/candidate-for-interview.model';
import {Source} from '../../../models/settings/source.model';
import {InterviewService} from '../../../services/shared-services/interview.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';
import {SettingsService} from '../../../services/shared-services/settings.service';
import {UserAccount} from '../../../models/settings/user-account.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InterviewerForInterview} from '../../../models/interview/interviewer-for-interview.model';
import {UserAccountDataStorageService} from '../../../services/data-storage-services/user-account-data-storage.service';
import {PipelineStage} from '../../../models/settings/pipeline-stage.model';
import {GeneralComment} from '../../../models/candidate/general-comment.model';
import {ChangeStatusDialogComponent} from '../../../dialogs/change-status-dialog/change-status-dialog.component';
import {JobAssignment} from '../../../models/candidate/job-assignment.model';
import {WithdrawnReason} from '../../../models/settings/withdrawn-reason.model';
import {RejectedReason} from '../../../models/settings/rejected-reason.model';
import {JobAssignmentDataStorageService} from '../../../services/data-storage-services/job-assignment-data-storage.service';
import {AddNewCommentDialogComponent} from '../../../dialogs/add-new-comment-dialog/add-new-comment-dialog.component';


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
  currentUserName = '';

  interview: Interview;
  jobAssignment: JobAssignment;

  interviews: Interview[] = [];
  candidates: Candidate[] = [];
  sources: Source[] = [];
  userAccounts: UserAccount[] = [];
  pipelineStages: PipelineStage[] = [];
  withdrawnReasons: WithdrawnReason[] = [];
  rejectedReasons: RejectedReason[] = [];

  interviewStatuses : any = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private settingsService: SettingsService,
              private interviewService: InterviewService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private jobAssignmentDataStorageService: JobAssignmentDataStorageService,
              private interviewDataStorageService: InterviewDataStorageService) {}

  ngOnInit() {
    this.route.data.subscribe(
        (data: Data) => {
          this.interview = data['interview'].interview;
          this.rejectedReasons = data['rejectedReasons'].rejectedReasons;
          this.withdrawnReasons = data['withdrawnReasons'].withdrawnReasons;

          if (this.interview === null) {
            this.router.navigate(['/interviews']);
            this.notifierService.notify('default', 'Resource not found!');
          }

          this.candidates = data['candidates'].candidates;
          this.userAccounts = data['userAccounts'].userAccounts;
          this.interviewStatuses = this.interviewService.getInterviewStatuses();
          this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
          this.currentUserName = localStorage.getItem('userName');

          this.createAssignInterviewersForm();
          this.extractPipelineStages();
        });
  }


  goToCandidateDetail(candidate: Candidate) {
    const jobAssignmentId = candidate.JobAssignments
      .find(x => x.JobId === this.interview.JobId)
      .Id;

    this.router.navigate(['/candidates/', candidate.Id, jobAssignmentId]);
  }


  addNewComment(candidate: Candidate) {
    const jobAssignment = candidate.JobAssignments
      .find(x => x.JobId === this.interview.JobId);

    this.dialog.open(AddNewCommentDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '500px',
    })
      .afterClosed()
      .subscribe(result => {
        if (result !== '') {

          const comment = this.currentUserName
            + '  added a comment, "'
            + result
            + '"';

          const generalComments: GeneralComment[] = [];
          const generalComment = new GeneralComment(
            null,
            comment,
            null,
            jobAssignment.Id
          );
          generalComments.push(generalComment);

          this.jobAssignmentDataStorageService.addGeneralComment(generalComments)
            .subscribe((data: any) => {
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.notifierService.notify('default', 'New comment added.');
              }
            });
        }
      });
  }

  createAssignInterviewersForm() {
    this.assignInterviewerForm = new FormGroup({
      'userAccounts': new FormControl(null, Validators.required)
    });
  }


  extractPipelineStages() {
    this.interview.Job.Workflow.Pipelines.forEach( pipeline => {
      pipeline.PipelineStages.forEach(pipelineStage => {
        this.pipelineStages.push(pipelineStage);
      });
    });
  }

  updatePipelineScores(candidate: Candidate) {
    this.jobAssignment = candidate.JobAssignments
      .find(x => x.JobId === this.interview.JobId);

    const pipelineStageScores = this.jobAssignment.PipelineStageScores;
    let pipelineStageCriterionScores = this.jobAssignment.PipelineStageCriterionScores;

    if (pipelineStageCriterionScores === null) {
      pipelineStageCriterionScores = [];
    }

    let selectTabIndex = 0;
    for (let k = 0; k < this.pipelineStages.length; k++) {
      if (this.pipelineStages[k].Id === this.jobAssignment.CurrentPipelineStageId) {
        selectTabIndex = k;
      }
    }

    const generalComments: GeneralComment[] = [];

    const dialogRef = this.dialog.open(ChangeStatusDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '700px',
        data: {
          pipelines: this.interview.Job.Workflow.Pipelines,
          selectTab: selectTabIndex,
          jobAssignmentId: this.jobAssignment.Id,
          candidateId: candidate.Id,
          currentPipelineStageId: this.jobAssignment.CurrentPipelineStageId,
          pipelineStageScores: pipelineStageScores,
          pipelineStageCriterionScores: pipelineStageCriterionScores,
          generalComments: generalComments,
          rejectedReasons: this.rejectedReasons,
          withdrawnReasons: this.withdrawnReasons,
          status: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (result.currentPipelineStageId !== this.jobAssignment.CurrentPipelineStageId) {

          const oldPipelineStage = this.pipelineStages
            .find(x => x.Id === this.jobAssignment.CurrentPipelineStageId);

          const newPipelineStage = this.pipelineStages
            .find(x => x.Id === result.currentPipelineStageId);


          const comment = this.currentUserName
            + ' changed pipeline stage from '
            + oldPipelineStage.Name
            + ' to '
            + newPipelineStage.Name
            + '.';

          const generalComment = new GeneralComment(
            null,
            comment,
            null,
            this.jobAssignment.Id
          );

          result.generalComments.push(generalComment);

          const jobAssignment = new JobAssignment(
            this.jobAssignment.Id,
            null,
            null,
            null,
            null,
            [],
            [],
            result.generalComments,
            result.currentPipelineStageId
          );

          this.jobAssignmentDataStorageService.changePipelineStage(jobAssignment)
            .subscribe((data: any) => {

              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.notifierService.notify('default', 'Pipeline stage changed.');
                this.jobAssignment.CurrentPipelineStageId = result.currentPipelineStageId;
              }

            });
        } else {

          if (result.generalComments.length !== 0) {
            this.jobAssignmentDataStorageService.addGeneralComment(result.generalComments)
              .subscribe((res: any) => {

                if (res.statusText !== 'Success') {
                  this.notifierService.notify('default', res.statusText);
                }
              });

          }
        }

      }
    });
  }

  getPipelineStageProperty(candidate: Candidate, propertyName: string) {
    const jobAssignment = candidate.JobAssignments
      .find(x => x.JobId === this.interview.JobId);

    if (jobAssignment === undefined) {

      if (propertyName === 'Name') {
        return 'Undefined';
      } else {
        return '#eee';
      }

    }

    const pipelineStage = this.pipelineStages
      .find(x => x.Id === jobAssignment.CurrentPipelineStageId);

    if (pipelineStage === undefined) {

      if (propertyName === 'Name') {
        return 'Undefined';
      } else {
        return '#eee';
      }

    }

    if (propertyName === 'Name') {
      return pipelineStage.Name;
    } else {
      return pipelineStage.Color;
    }
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

  getUniqueCandidates() {
    const uniqueCandidates: Candidate[] = [];
    const jobCandidates: Candidate[] = [];

    this.candidates.forEach(candidate => {
      candidate.JobAssignments.forEach(jobAssignment => {
        if (jobAssignment.JobId === this.interview.JobId) {
          jobCandidates.push(candidate);
        }
      });
    });

    jobCandidates.forEach(candidate => {

      const getInterviewCandidate = this.interview.CandidatesForInterview
        .find(x => x.CandidateId === candidate.Id);

      const getUniqueCandidate = uniqueCandidates
        .find(x => x.Id === candidate.Id);

      if ((getUniqueCandidate === undefined) && (getInterviewCandidate === undefined)) {
        uniqueCandidates.push(candidate);
      }

    });

    return uniqueCandidates;
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
            candidates: this.getUniqueCandidates(),
            job: this.interview.Job,
            showPipelineStage: true,
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
