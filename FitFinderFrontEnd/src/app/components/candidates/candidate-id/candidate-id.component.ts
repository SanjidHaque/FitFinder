import {Component, DoCheck, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../models/candidate/canidate-attachment.model';
import {CandidateEducation} from '../../../models/candidate/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate/candidate-experience.model';
import {Source} from '../../../models/settings/source.model';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {MatDialog} from '@angular/material';
import {JobAssignmentDialogComponent} from '../../../dialogs/job-assignment-dialog/job-assignment-dialog.component';
import {JobAssignment} from '../../../models/candidate/job-assignment.model';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {Pipeline} from '../../../models/settings/pipeline.model';
import {ChangeStatusDialogComponent} from '../../../dialogs/change-status-dialog/change-status-dialog.component';
import {PipelineStage} from '../../../models/settings/pipeline-stage.model';
import {StageScore} from '../../../models/settings/stage-score.model';
import {CriteriaScore} from '../../../models/settings/criteria-score.model';
import {StageComment} from '../../../models/settings/stage-comment.model';
import {NotifierService} from 'angular-notifier';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {DeleteDialogComponent} from '../../../dialogs/delete-dialog/delete-dialog.component';
import {CandidateService} from '../../../services/shared-services/candidate.service';
import {Department} from '../../../models/settings/department.model';
import {JobAssignmentDataStorageService} from '../../../services/data-storage-services/job-assignment-data-storage.service';



@Component({
  selector: 'app-candidate-id',
  templateUrl: './candidate-id.component.html',
  styleUrls: ['./candidate-id.component.css']
})
export class CandidateIdComponent implements OnInit, DoCheck {

  selectTabIndex = 0;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  rating: 0;
  currentStageId = 0;
  name = '';
  color = '';
  pipelines: Pipeline[] = [];

  candidates: Candidate[] = [];
  departments: Department[] = [];
  candidate: Candidate;
  jobs: Job[] = [];
  job: Job;

  sources: Source[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private candidateService: CandidateService,
              private jobDataStorageService: JobDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private jobAssignmentDataStorageService: JobAssignmentDataStorageService) {

  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobs = data['jobs'];
          this.sources = data['sources'];
          this.candidate = data['candidate'];
          this.departments = data['departments'];
        }
      );

    if (this.candidate.JobAssignments !== null) {
      this.job = this.candidate.JobAssignments[0].Job;
    //  this.changeStatus(this.candidate.JobAssignment[0].CurrentStageId);
    }

    this.candidateService.candidate = this.candidate;
    this.getCurrentStageNameAndColor();
  }

  ngDoCheck() {
    this.candidate = this.candidateService.candidate;
    this.getCurrentStageNameAndColor();
  }


  getCurrentStageNameAndColor() {
    if (this.candidate.JobAssignments !== null) {
      this.currentStageId =
        this.candidate.JobAssignments
          .find( x => x.IsActive === true).CurrentStageId;
      this.name = this.detectStageChange(this.currentStageId).stageName;
      this.color = this.detectStageChange(this.currentStageId).stageColor;
    }
  }

  pipelineStageChanged(pipelineStageId: number) {
    this.changeStatus(pipelineStageId);
  }

  openCurrentPipelineStage() {
    this.changeStatus(this.currentStageId);
  }


  detectStageChange(pipelineStageId: number) {

    for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
      for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStage.length; j++) {
        if (this.job.Workflow.Pipelines[i].PipelineStage[j].Id === pipelineStageId) {
          return ({
            stageId: this.job.Workflow.Pipelines[i].PipelineStage[j].Id,
            stageName: this.job.Workflow.Pipelines[i].PipelineStage[j].Name,
            stageColor: this.job.Workflow.Pipelines[i].PipelineStage[j].Color
          });
        }
      }
    }
  }


  changeJobAssignment() {
  }



  removeJobAssignment() {
    const jobAssignment = this.candidate.JobAssignments
      .find(x => x.Id === this.getActiveJobAssignmentId());
    const title = this.jobs.find(x => x.Id === jobAssignment.JobId).Title;

    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Remove Job',
          iconClass: 'far fa-trash-alt',
          confirmationText: 'Are you sure you want to remove ' + title + ' from Candidate?',
          buttonText: 'Remove',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmationStatus) {
        this.jobAssignmentDataStorageService.removeJobAssignment(jobAssignment)
          .subscribe(
            (data: any) => {
              const index = this.candidate.JobAssignments
                .findIndex(x => x.Id === this.getActiveJobAssignmentId());

              this.candidate.JobAssignments.splice(index, 1);

              if (this.candidate.JobAssignments.length === 0) {
                this.candidate.JobAssignments = null;
              }

              this.notifierService.notify('default', 'Job removed.')
            }
          );
      }
    }
    );
  }



  changeStatus(pipelineStageId: number) {
   const pipelineStages: PipelineStage[] = [];

    for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
      for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStage.length; j++) {
        pipelineStages.push(this.job.Workflow.Pipelines[i].PipelineStage[j]);
      }
    }

    const stageScores = this.candidate.JobAssignments
      .find(x => x.Id === this.getActiveJobAssignmentId()).StageScores;
    const criteriaScores = this.candidate.JobAssignments
      .find(x => x.Id === this.getActiveJobAssignmentId()).CriteriaScores;

    for (let k = 0; k < pipelineStages.length; k++) {
      if (pipelineStages[k].Id === pipelineStageId) {
        this.selectTabIndex = k;
      }
    }



    const dialogRef = this.dialog.open(ChangeStatusDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '700px',
        data: {
          pipelines: this.job.Workflow.Pipelines,
          selectTab: this.selectTabIndex,
          candidate: this.candidate,
          pipelineStageId: pipelineStageId,
          stageScore:
          this.candidate.JobAssignments
            .find(x => x.Id === this.getActiveJobAssignmentId())
            .StageScores,
          criteriaScore:
          this.candidate.JobAssignments
            .find(x => x.Id === this.getActiveJobAssignmentId())
            .CriteriaScores,
          comment: '',
          status: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
     if (result !== null) {

       let currentStageId = 1;

       const allPipelineStage: PipelineStage[] = [];
       for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
         for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStage.length; j++) {
           allPipelineStage.push(this.job.Workflow.Pipelines[i].PipelineStage[j]);
         }
       }

       currentStageId = allPipelineStage[result.selectTab].Id;
       const stageComments: StageComment[] = [];

       if (result.comment !== '') {
          const stageComment = new StageComment(
           null,
           null,
           this.getActiveJobAssignmentId(),
           null,
           currentStageId,
           null,
           this.candidate.Id,
           result.comment
         );
          stageComments.push(stageComment);
       }


       for (let i = 0; i < result.stageScore.length; i++) {
         result.stageScore[i].Id = null;
       }


       for (let i = 0; i < result.criteriaScore.length; i++) {
         result.criteriaScore[i].Id = null;
       }

       const jobAssigned = new JobAssignment(
         this.getActiveJobAssignmentId(),
         null,
         this.candidate.Id,
         null,
         this.candidate.JobAssignments
           .find(x => x.Id === this.getActiveJobAssignmentId())
           .JobId,
         result.stageScore,
         result.criteriaScore,
         stageComments,
         currentStageId,
         true
       );

       this.jobAssignmentDataStorageService.updateJobAssignment(jobAssigned)
         .subscribe(
           (data: any) => {
             const activeJobAssignmentIndex
               = this.candidate.JobAssignments.findIndex( x => x.Id === this.getActiveJobAssignmentId());
             this.candidate.JobAssignments[activeJobAssignmentIndex] = data;
             this.notifierService.notify('default', 'Status changed!');
             this.currentStageId = this.detectStageChange(currentStageId).stageId;
             this.name = this.detectStageChange(currentStageId).stageName;
             this.color = this.detectStageChange(currentStageId).stageColor;
           }
         );
     }
    });
  }

  favouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);
    this.candidateDataStorageService.favouriteCandidates(candidates)
      .subscribe(
        (response: any) => {
          this.candidate.IsFavourite = true;
          this.notifierService.notify('default', 'Added to favourites!')
        }
      );
  }

  unfavouriteCandidates(candidate: Candidate) {
    const candidates: Candidate[] = [];
    candidates.push(candidate);

    this.candidateDataStorageService.unfavouriteCandidates(candidates)
      .subscribe(
        (response: any) => {
          this.candidate.IsFavourite = false;
          this.notifierService.notify('default', 'Removed from favourites!')
        }
      );
  }

  archiveCandidates(candidate: Candidate) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Archive Candidate',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmationStatus) {
         const candidates: Candidate[] = [];
         candidates.push(candidate);
         this.candidateDataStorageService.archiveCandidates(candidates)
             .subscribe(
                (response: any) => {
                  this.candidate.IsArchived = true;
                  this.notifierService.notify('default', 'Archived successfully!')
                }
           );
      }
      }
    );
  }


  restoreCandidates(candidate: Candidate) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Restore Candidate',
          iconClass: 'far fa-window-restore',
          confirmationText: 'Are you sure?',
          buttonText: 'Restore',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          const candidates: Candidate[] = [];
          candidates.push(candidate);
          this.candidateDataStorageService.restoreCandidates(candidates)
            .subscribe(
              (response: any) => {
                this.candidate.IsArchived = false;
                this.notifierService.notify('default', 'Restored successfully!')
              }
            );
        }
      }
    );
  }

  jobAssignmentDialog(candidate: Candidate) {
    const dialogRef = this.dialog.open(JobAssignmentDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        data:
          {
            jobs: this.jobs,
            departments: this.departments
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' ) {
        const jobId = result[0].Id;

        const jobAssignment = new JobAssignment(
          null,
          null,
          this.candidate.Id,
          null,
          jobId,
          [],
          [],
          [],
          null,
          true
        );

        this.jobAssignmentDataStorageService.addJobAssignment(jobAssignment)
          .subscribe(
            (data: any) => {

              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {

                if (this.candidate.JobAssignments === null) {
                  this.candidate.JobAssignments = [];
                }

                this.candidate.JobAssignments.push(data.jobAssignment);
                this.changeStatus(data.jobAssignment.CurrentStageId);
                this.notifierService.notify('default', 'Status changed.');
              }


            });
      }
    });
  }


  getActiveJobAssignmentId() {
    return this.candidate.JobAssignments.find(x => x.IsActive === true).Id;
  }

  getLastAssignedJobName() {
   const lastIndex = this.candidate.JobAssignments.length - 1;
   return this.jobs.find(
     x => x.Id ===
       this.candidate.JobAssignments[lastIndex].JobId).Title;
  }

  goToJobDetail() {
    const lastIndex = this.candidate.JobAssignments.length - 1;
    const jobId = this.candidate.JobAssignments[lastIndex].JobId;
    this.router.navigate(['jobs/',  jobId ]);
  }

  moveToRejected() {
    const pipeline = this.job.Workflow.Pipelines.find(x => x.Name === 'REJECTED');
    this.changeStatus(pipeline.PipelineStage[0].Id);
  }

  moveToNextStage() {
    const pipelineStages: PipelineStage[] = [];
    let currentStageId;

    if (this.candidate.JobAssignments !== null) {
       currentStageId = this.candidate.JobAssignments
         .find( x => x.IsActive === true).CurrentStageId;
    }

    for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
      for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStage.length; j++) {
        pipelineStages.push(this.job.Workflow.Pipelines[i].PipelineStage[j]);
      }
    }

    for (let i = 0; i < pipelineStages.length; i++) {
      if (pipelineStages[i].Id === currentStageId) {
        const nextStageIndex = i + 1;
        if (nextStageIndex !== pipelineStages.length) {
          const nextStageId = pipelineStages[nextStageIndex].Id;
          this.changeStatus(nextStageId);
        }
      }
    }
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

  downloadFile(candidateAttachment: CandidateAttachment) {
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

}
