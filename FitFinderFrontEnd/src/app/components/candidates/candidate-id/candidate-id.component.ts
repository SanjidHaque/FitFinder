import {Component, DoCheck, OnDestroy ,ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../models/candidate/canidate-attachment.model';
import {CandidateEducation} from '../../../models/candidate/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate/candidate-experience.model';
import {MatDialog} from '@angular/material';
import {JobAssignment} from '../../../models/candidate/job-assignment.model';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {ChangeStatusDialogComponent} from '../../../dialogs/change-status-dialog/change-status-dialog.component';
import {PipelineStage} from '../../../models/settings/pipeline-stage.model';
import {NotifierService} from 'angular-notifier';
import {CandidateService} from '../../../services/shared-services/candidate.service';
import {JobAssignmentDataStorageService} from '../../../services/data-storage-services/job-assignment-data-storage.service';
import {SettingsService} from '../../../services/shared-services/settings.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';
import {AttachmentDataStorageService} from '../../../services/data-storage-services/attachment-data-storage.service';
import {UserAccountDataStorageService} from '../../../services/data-storage-services/user-account-data-storage.service';
import {CandidateForInterview} from '../../../models/interview/candidate-for-interview.model';
import {GeneralComment} from '../../../models/candidate/general-comment.model';
import {WithdrawnReason} from '../../../models/settings/withdrawn-reason.model';
import {RejectedReason} from '../../../models/settings/rejected-reason.model';
import {Interview} from '../../../models/interview/interview.model';
import {InterviewService} from '../../../services/shared-services/interview.service';

@Component({
  selector: 'app-candidate-id',
  templateUrl: './candidate-id.component.html',
  styleUrls: ['./candidate-id.component.css']
})
export class CandidateIdComponent implements OnInit, DoCheck, OnDestroy  {
  isDisabled = false;

  selectTabIndex = 0;
  defaultImage = 'defaultImage.png';
  rating: 0;
  pipelineStageName = '';
  pipelineStageColor = '';
  currentPipelineStageId: number;
  currentUserName = '';

  candidates: Candidate[] = [];
  candidate: Candidate;
  jobs: Job[] = [];
  withdrawnReasons: WithdrawnReason[] = [];
  rejectedReasons: RejectedReason[] = [];
  upcomingInterviews: CandidateForInterview[] = [];

  job: Job;
  jobAssignment: JobAssignment;
  jobAssignmentId: number;

  candidateAttachmentsToUpload: Array<File> = [];
  candidateImageToUpload: File = null;
  @ViewChild('image', { static: false }) imageElementRef: ElementRef;

  imageFolderPath = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private candidateService: CandidateService,
              private interviewService: InterviewService,
              private settingsService: SettingsService,
              private dialogService: DialogService,
              private jobDataStorageService: JobDataStorageService,
              private attachmentDataStorageService: AttachmentDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private jobAssignmentDataStorageService: JobAssignmentDataStorageService) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.jobs = data['jobs'].jobs;
      this.candidate = data['candidate'].candidate;
      this.rejectedReasons = data['rejectedReasons'].rejectedReasons;
      this.withdrawnReasons = data['withdrawnReasons'].withdrawnReasons;

      this.route.paramMap.subscribe(params => {
      //  this.jobAssignmentId = +params.get('job-assignment-id');
        this.jobAssignmentId = 4;

        this.candidateService.jobAssignment = this.candidate.JobAssignments
          .find(x => x.Id === this.jobAssignmentId);
        this.jobAssignment =  this.candidateService.jobAssignment;
        this.job = this.jobAssignment.Job;

        this.currentPipelineStageId = this.jobAssignment.CurrentPipelineStageId;
      });


      this.candidateService.candidate = this.candidate;

      this.candidateService
        .candidateSpecificInterviews = data['candidateSpecificInterviews']
        .candidatesForInterview;
      this.getUpcomingInterviews(this.candidateService.getAllCandidateSpecificInterviews());

      this.imageFolderPath = this.userAccountDataStorageService.imageFolderPath;
      this.currentUserName = localStorage.getItem('userName');
      this.getCurrentStageNameAndColor();
    });
  }

  ngDoCheck() {
    this.getCurrentStageNameAndColor();
    this.jobAssignment =  this.candidateService.jobAssignment
  }

  getCurrentStageNameAndColor() {
    this.pipelineStageName = this
      .detectStageChange(this.jobAssignment.CurrentPipelineStageId)
      .stageName;
    this.pipelineStageColor = this
      .detectStageChange(this.jobAssignment.CurrentPipelineStageId)
      .stageColor;
  }

  pipelineStageChanged(pipelineStageId: number) {
    this.changeStatus(pipelineStageId);
  }

  openCurrentPipelineStage() {
    this.changeStatus(this.jobAssignment.CurrentPipelineStageId);
  }

  detectStageChange(pipelineStageId: number) {
    for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
      for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStages.length; j++) {
        if (this.job.Workflow.Pipelines[i].PipelineStages[j].Id === pipelineStageId) {
          return ({
            stageId: this.job.Workflow.Pipelines[i].PipelineStages[j].Id,
            stageName: this.job.Workflow.Pipelines[i].PipelineStages[j].Name,
            stageColor: this.job.Workflow.Pipelines[i].PipelineStages[j].Color
          });
        }
      }
    }
  }


  changeJobAssignment() {}


  removeJobAssignment() {
    this.settingsService.deleteResource('Remove Job Assignment')
      .then(result => {

        if (result.confirmationStatus) {
          this.jobAssignmentDataStorageService.removeJobAssignment(this.jobAssignment)
            .subscribe((data: any) => {
                this.notifierService.notify('default', 'Job removed.');
                this.router.navigate(['/jobs/', this.jobAssignment.JobId]);
              });
        }
      });
  }


  changeStatus(pipelineStageId: number) {
   const pipelineStages: PipelineStage[] = [];

    for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
      for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStages.length; j++) {
        pipelineStages.push(this.job.Workflow.Pipelines[i].PipelineStages[j]);
      }
    }

    const pipelineStageScores = this.jobAssignment.PipelineStageScores;
    let pipelineStageCriterionScores = this.jobAssignment.PipelineStageCriterionScores;

    if (pipelineStageCriterionScores === null) {
      pipelineStageCriterionScores = [];
    }

    for (let k = 0; k < pipelineStages.length; k++) {
      if (pipelineStages[k].Id === pipelineStageId) {
        this.selectTabIndex = k;
      }
    }

    const generalComments: GeneralComment[] = [];

    const dialogRef = this.dialog.open(ChangeStatusDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '700px',
        data: {
          pipelines: this.job.Workflow.Pipelines,
          selectTab: this.selectTabIndex,
          jobAssignmentId: this.jobAssignmentId,
          candidateId: this.candidate.Id,
          currentPipelineStageId: pipelineStageId,
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

          const oldPipelineStage = pipelineStages
            .find(x => x.Id === this.jobAssignment.CurrentPipelineStageId);

          const newPipelineStage = pipelineStages
            .find(x => x.Id === result.currentPipelineStageId);


          const comment = this.currentUserName
            + ' changed pipeline stage from '
            + oldPipelineStage.Name
            + ' to '
            + newPipelineStage.Name
            + '.'

          const generalComment = new GeneralComment(
            null,
            comment,
            null,
            this.jobAssignmentId
          );

          result.generalComments.push(generalComment);

          const jobAssignment = new JobAssignment(
            this.jobAssignmentId,
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
                this.currentPipelineStageId = result.currentPipelineStageId;
                this.pipelineStageName = this
                  .detectStageChange(this.jobAssignment.CurrentPipelineStageId).stageName;
                this.pipelineStageColor = this
                  .detectStageChange(this.jobAssignment.CurrentPipelineStageId).stageColor;
                this.mergeNewGeneralComments(result.generalComments);
              }
            });
        } else {

          if (result.generalComments.length !== 0) {
            this.jobAssignmentDataStorageService.addGeneralComment(result.generalComments)
              .subscribe((res: any) => {

                if (res.statusText !== 'Success') {
                  this.notifierService.notify('default', res.statusText);
                } else {

                  this.mergeNewGeneralComments(result.generalComments);

                }
              });

          }
        }

      }
    });
  }

  mergeNewGeneralComments(newGeneralComments: GeneralComment[]) {
    newGeneralComments.forEach(newGeneralComment => {
      this.jobAssignment.GeneralComments.unshift(newGeneralComment);
    });
  }


  updateCandidateImage(file: FileList) {
    const fileExtension = file.item(0).name.split('.').pop();
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {

      const fileName = file.item(0).name
        .substr(0, file.item(0).name.lastIndexOf('.'));
      const newFileName = fileName + Date.now() + '.' + fileExtension;
      const newFile = new File([file.item(0)], newFileName, {type: file.item(0).type});

      this.isDisabled = true;
      this.attachmentDataStorageService
        .uploadImage(this.candidate.Id.toString(), newFile, 'Candidate')
        .subscribe((data: any) => {

          this.isDisabled = false;
          if (data.statusText !== 'Success') {
            this.isDisabled = false;
            this.notifierService.notify('default', data.statusText);

          } else {

            this.candidateImageToUpload = newFile;
            const reader = new FileReader();
            reader.onload = (event: any) => {
              this.candidate.ImageName = newFile.name;
            };
            reader.readAsDataURL(this.candidateImageToUpload);
            this.imageElementRef.nativeElement.value = '';
            this.notifierService.notify('default', 'Candidate photo updated.');
          }

        });

    } else {
      this.notifierService.notify('default', 'Unsupported file format!');
    }
  }

  deleteCandidateImage() {

    this.settingsService.deleteResource('Delete Attachment')
      .then(result => {
        if (result.confirmationStatus) {

          if (this.candidate.ImageName === this.defaultImage) {
            this.notifierService.notify('default', 'No photo found!');
            return;
          }

          this.isDisabled = true;
          this.candidateDataStorageService.deleteCandidateImage(this.candidate)
            .subscribe((data: any) => {
              this.isDisabled = false;
              if (data.statusText !== 'Success') {

                this.notifierService.notify('default', data.statusText);

              } else {

                this.candidate.ImageName = this.defaultImage;
                this.candidateImageToUpload = null;
                this.imageElementRef.nativeElement.value = '';
                this.notifierService.notify('default', 'Photo deleted successfully. ');
              }

            });

        }
      });
  }

  getCandidateImage() {
    document.getElementById('candidateImage').click();
  }

  getCandidateAttachment() {
    document.getElementById('candidateAttachment').click();
  }

  addNewCandidateAttachment(file: any) {

    const fileName = file.target.files[0].name
      .substr(0, file.target.files[0].name.lastIndexOf('.'));

    const fileExtension = file.target.files[0].name.split('.').pop();

    if (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'docx') {

      const newFileName = fileName + Date.now() + '.' + fileExtension;
      const newFile = new File([file.target.files[0]], newFileName, {type: file.target.files[0].type});
      this.candidateAttachmentsToUpload.push(newFile);

      const candidateAttachment = new CandidateAttachment(
        null,
        null,
        this.candidate.Id,
        file.target.files[0].name,
        newFile.name,
        false
      );

      if (this.candidate.CandidateAttachments === null) {
        this.candidate.CandidateAttachments = [];
      }

      this.attachmentDataStorageService.uploadAttachments(this.candidateAttachmentsToUpload)
        .subscribe((data: any) => {

          if (data.statusText !== 'Success') {
            this.isDisabled = false;
            this.notifierService.notify('default', data.statusText);

          } else {

            this.candidateDataStorageService.addNewCandidateAttachment(candidateAttachment)
              .subscribe((res: any) => {
                this.isDisabled = false;
                if (data.statusText !== 'Success') {
                  this.notifierService.notify('default', data.statusText);
                } else {
                  candidateAttachment.Id = res.Id;

                  this.candidate.CandidateAttachments.push(candidateAttachment);
                  this.notifierService.notify('default',
                    'File uploaded successfully');
                }
              });
          }
        });


    } else {
      this.notifierService.notify('default', 'Unsupported file format!');
    }

    this.candidateAttachmentsToUpload = [];
  }

  changeCandidateResume(candidateAttachment: CandidateAttachment, index: number) {
    this.isDisabled = true;

    this.candidateDataStorageService.changeCandidateResume(candidateAttachment)
      .subscribe((data: any) => {
        this.isDisabled = false;

        if (data.statusText !== 'Success') {
          this.notifierService.notify('default', data.statusText);
        } else {
          this.candidate.CandidateAttachments[index].IsResume = !this.candidate.CandidateAttachments[index].IsResume;
          for (let i = 0; i < this.candidate.CandidateAttachments.length; i++) {
            if (i !== index) {
              this.candidate.CandidateAttachments[i].IsResume = false;
            }
          }
          this.notifierService.notify('default', 'Candidate resume changed.');
        }

      });
  }

  deleteCandidateAttachment(candidateAttachment: CandidateAttachment, index: number) {
    this.settingsService.deleteResource('Delete Attachment')
      .then(result => {
        if (result.confirmationStatus) {

          const candidateAttachments = [];
          candidateAttachments.push(candidateAttachment.ModifiedFileName);

          this.isDisabled = true;
          this.candidateDataStorageService.deleteCandidateAttachment(candidateAttachment.Id)
            .subscribe((data: any) => {
              this.isDisabled = false;

              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.candidate.CandidateAttachments.splice(index, 1);

                if (this.candidate.CandidateAttachments.length === 0) {
                  this.candidate.CandidateAttachments = null;
                }
                this.notifierService.notify('default', 'Attachment deleted successfully.');
              }

            });
        }
      });
  }

  favouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);
    this.candidateDataStorageService.favouriteCandidates(candidates)
      .subscribe((response: any) => {
          this.candidate.IsFavourite = true;
          this.notifierService.notify('default', 'Added to favourites!')
        }
      );
  }

  unfavouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);

    this.candidateDataStorageService.unfavouriteCandidates(candidates)
      .subscribe((response: any) => {
          this.candidate.IsFavourite = false;
          this.notifierService.notify('default', 'Removed from favourites!')
        }
      );
  }

  archiveCandidates(candidate: Candidate) {
    this.dialogService.confirmationDialog(
      'Restore Candidates',
      'fas fa-archive',
      '400px',
      'warn',
      'Are you sure?',
      'Archive',
      false
    ).afterClosed().subscribe(result => {
      if (result.confirmationStatus) {

         const candidates: Candidate[] = [];
         candidates.push(candidate);

         this.isDisabled = true;
         this.candidateDataStorageService.archiveCandidates(candidates)
             .subscribe((response: any) => {
               this.isDisabled = false;

               this.candidate.IsArchived = true;
               this.notifierService.notify('default', 'Archived successfully!')
             });
      }
    });
  }


  restoreCandidates(candidate: Candidate) {
    this.dialogService.confirmationDialog(
      'Restore Candidates',
      'far fa-window-restore',
      '400px',
      'warn',
      'Are you sure?',
      'Restore',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          const candidates: Candidate[] = [];
          candidates.push(candidate);

          this.isDisabled = true;
          this.candidateDataStorageService.restoreCandidates(candidates)
            .subscribe((response: any) => {
              this.isDisabled = false;

              this.candidate.IsArchived = false;
              this.notifierService.notify('default', 'Restored successfully!')
            });
        }
      });
  }


  goToJobDetail() {
    this.router.navigate(['jobs/',  this.jobAssignment.JobId ]);
  }

  moveToRejected() {
    const pipeline = this.job.Workflow.Pipelines.find(x => x.Name === 'REJECTED');
    this.changeStatus(pipeline.PipelineStages[0].Id);
  }

  moveToNextPipelineStage() {
    const pipelineStages: PipelineStage[] = [];

    for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
      for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStages.length; j++) {
        pipelineStages.push(this.job.Workflow.Pipelines[i].PipelineStages[j]);
      }
    }

    for (let i = 0; i < pipelineStages.length; i++) {
      if (pipelineStages[i].Id === this.jobAssignment.CurrentPipelineStageId) {
        const nextStageIndex = i + 1;
        if (nextStageIndex !== pipelineStages.length) {
          const nextStageId = pipelineStages[nextStageIndex].Id;
          this.changeStatus(nextStageId);
        }
      }
    }
  }

  deleteCandidate() {
    this.settingsService.deleteResource('Delete Candidate')
      .then(result => {

        if (result.confirmationStatus) {
          this.isDisabled = true;

          this.candidateDataStorageService.deleteCandidate(this.candidate.Id)
            .subscribe((data: any) => {

              if (data.statusText !== 'Success') {

                this.isDisabled = false;
                this.notifierService.notify('default', data.statusText);

              } else {

                this.notifierService.notify('default', 'Candidate deleted successfully');
                this.router.navigate(['candidates']);

              }
            });

        }
      }).catch();

  }
  getInterviewDay(interview: Interview) {
    return moment(new Date(interview.Date)).format('D');
  }

  getInterviewMonth(interview: Interview) {
    return moment(new Date(interview.Date)).format('MMM');
  }

  getInterviewYear(interview: Interview) {
    return moment(new Date(interview.Date)).format('YYYY');
  }

  getBackgroundColor(interviewStatus: string) {
    if (interviewStatus === 'Confirmed') {
      return '#37a6b4';
    } else if (interviewStatus === 'Pending') {
      return '#2574ab';
    } else if (interviewStatus === 'Declined') {
      return '#d35d5b';
    } else {
      return '#e7b36a';
    }
  }

  getUpcomingInterviews(candidateForInterviews: CandidateForInterview[]) {

    candidateForInterviews.forEach(candidateForInterview => {
      const startTimeIn24HourFormat  = this.interviewService
        .getTimeIn24HourFormat(candidateForInterview.Interview.StartTime);

      const interviewStartTimeWithDate =
        new Date(new Date(candidateForInterview.Interview.Date)
          .toDateString() + ' ' + startTimeIn24HourFormat);

      if (moment(new Date()).isBefore(interviewStartTimeWithDate)
        && candidateForInterview.InterviewStatus === 'Confirmed') {
        this.upcomingInterviews.push(candidateForInterview);
      }
    });

  }
  getApplicationDate() {
    return moment(new Date(this.candidate.ApplicationDate)).format('Do MMM YYYY');
  }

  goToFacebookProfile() {
    window.open('http://' + this.candidate.FacebookUrl);
  }

  goToLinkedInProfile() {
    window.open('http://' + this.candidate.LinkedInUrl);
  }

  goToGithubProfile() {
    window.open('http://' + this.candidate.GitHubUrl);
  }

  downloadCandidateAttachment(candidateAttachment: CandidateAttachment) {
    window.open('http://localhost:55586/Content/Attachments/' +
      candidateAttachment.ModifiedFileName);
  }

  getStartMonthOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.StartDate).format('MMM');
  }

  getStartYearOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.StartDate).format('YYYY');
  }

  getEndMonthOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.EndDate).format('MMM');
  }

  getEndYearOfEducation(candidateEducation: CandidateEducation) {
    return moment(candidateEducation.EndDate).format('YYYY');
  }

  getStartMonthOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.StartDate).format('MMM');
  }

  getStartYearOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.StartDate).format('YYYY');
  }

  getEndMonthOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.EndDate).format('MMM');
  }

  getEndYearOfExperience(candidateExperience: CandidateExperience) {
    return moment(candidateExperience.EndDate).format('YYYY');
  }

  ngOnDestroy() {
    if (this.dialog.openDialogs.length > 0) {
      this.dialog.closeAll();
    }
  }
}
