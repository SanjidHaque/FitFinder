import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../models/candidate/canidate-attachment.model';
import {CandidateEducation} from '../../../models/candidate/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate/candidate-experience.model';
import {MatDialog} from '@angular/material';
import {DisplayJobDialogComponent} from '../../../dialogs/display-job-dialog/display-job-dialog.component';
import {JobAssignment} from '../../../models/candidate/job-assignment.model';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {Pipeline} from '../../../models/settings/pipeline.model';
import {ChangeStatusDialogComponent} from '../../../dialogs/change-status-dialog/change-status-dialog.component';
import {PipelineStage} from '../../../models/settings/pipeline-stage.model';
import {StageComment} from '../../../models/settings/stage-comment.model';
import {NotifierService} from 'angular-notifier';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {CandidateService} from '../../../services/shared-services/candidate.service';
import {Department} from '../../../models/settings/department.model';
import {JobAssignmentDataStorageService} from '../../../services/data-storage-services/job-assignment-data-storage.service';
import {SettingsService} from '../../../services/shared-services/settings.service';
import {DialogService} from '../../../services/dialog-services/dialog.service';



@Component({
  selector: 'app-candidate-id',
  templateUrl: './candidate-id.component.html',
  styleUrls: ['./candidate-id.component.css']
})
export class CandidateIdComponent implements OnInit, DoCheck {
  isDisabled = false;

  selectTabIndex = 0;
  candidateDefaultImage = 'assets/images/defaultImage.png';
  rating: 0;
  currentPipelineStageId = 0;
  pipelineStageName = '';
  pipelineStageColor = '';

  pipelines: Pipeline[] = [];
  candidates: Candidate[] = [];
  departments: Department[] = [];
  candidate: Candidate;
  jobs: Job[] = [];
  job: Job;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private candidateService: CandidateService,
              private settingsService: SettingsService,
              private dialogService: DialogService,
              private jobDataStorageService: JobDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private jobAssignmentDataStorageService: JobAssignmentDataStorageService) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: Data) => {
          this.jobs = data['jobs'].jobs;
          this.candidate = data['candidate'].candidate;
          this.departments = data['departments'].departments;
        });

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
      this.currentPipelineStageId =
        this.candidate.JobAssignments
          .find( x => x.IsActive === true).CurrentStageId;
      this.pipelineStageName = this.detectStageChange(this.currentPipelineStageId).stageName;
      this.pipelineStageColor = this.detectStageChange(this.currentPipelineStageId).stageColor;
    }
  }

  pipelineStageChanged(pipelineStageId: number) {
    this.changeStatus(pipelineStageId);
  }

  openCurrentPipelineStage() {
    this.changeStatus(this.currentPipelineStageId);
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
    const jobAssignment = this.candidate.JobAssignments
      .find(x => x.Id === this.getActiveJobAssignment().Id);


    this.settingsService.deleteResource('Remove Job Assignment')
      .then(result => {

          if (result.confirmationStatus) {
      this.jobAssignmentDataStorageService.removeJobAssignment(jobAssignment)
        .subscribe(
          (data: any) => {
            const index = this.candidate.JobAssignments
              .findIndex(x => x.Id === this.getActiveJobAssignment().Id);

            this.candidate.JobAssignments.splice(index, 1);

            if (this.candidate.JobAssignments.length === 0) {
              this.candidate.JobAssignments = null;
            }

            this.notifierService.notify('default', 'Job removed.');
          }
        );
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

    const stageScores = this.candidate.JobAssignments
      .find(x => x.Id === this.getActiveJobAssignment().Id).StageScores;
    const criteriaScores = this.candidate.JobAssignments
      .find(x => x.Id === this.getActiveJobAssignment().Id).CriteriaScores;

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
            .find(x => x.Id === this.getActiveJobAssignment().Id)
            .StageScores,
          criteriaScore:
          this.candidate.JobAssignments
            .find(x => x.Id === this.getActiveJobAssignment().Id)
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
         for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStages.length; j++) {
           allPipelineStage.push(this.job.Workflow.Pipelines[i].PipelineStages[j]);
         }
       }

       currentStageId = allPipelineStage[result.selectTab].Id;
       const stageComments: StageComment[] = [];

       if (result.comment !== '') {
          const stageComment = new StageComment(
           null,
           null,
           this.getActiveJobAssignment().Id,
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
         this.getActiveJobAssignment().Id,
         null,
         this.candidate.Id,
         null,
         this.candidate.JobAssignments
           .find(x => x.Id === this.getActiveJobAssignment().Id)
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
               = this.candidate.JobAssignments.findIndex( x => x.Id === this.getActiveJobAssignment().Id);
             this.candidate.JobAssignments[activeJobAssignmentIndex] = data;
             this.notifierService.notify('default', 'Status changed!');
             this.currentPipelineStageId = this.detectStageChange(currentStageId).stageId;
             this.pipelineStageName = this.detectStageChange(currentStageId).stageName;
             this.pipelineStageColor = this.detectStageChange(currentStageId).stageColor;
           }
         );
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

  addJobAssignment() {
    const dialogRef = this.dialog.open(DisplayJobDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px',
        data: { jobs: this.jobs }
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


  getActiveJobAssignment() {
    return this.candidate.JobAssignments.find(x => x.IsActive === true);
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
    this.changeStatus(pipeline.PipelineStages[0].Id);
  }

  moveToNextStage() {
    const pipelineStages: PipelineStage[] = [];
    let currentStageId;

    if (this.candidate.JobAssignments !== null) {
       currentStageId = this.candidate.JobAssignments
         .find( x => x.IsActive === true).CurrentStageId;
    }

    for (let i = 0; i < this.job.Workflow.Pipelines.length; i++) {
      for (let j = 0; j < this.job.Workflow.Pipelines[i].PipelineStages.length; j++) {
        pipelineStages.push(this.job.Workflow.Pipelines[i].PipelineStages[j]);
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
