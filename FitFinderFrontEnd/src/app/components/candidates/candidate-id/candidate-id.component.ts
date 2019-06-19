import {Component, DoCheck, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate.model';
import {CandidateDataStorageService} from '../../../services/data-storage/candidate-data-storage.service';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../models/canidate-attachment.model';
import {CandidateEducation} from '../../../models/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate-experience.model';
import {Source} from '../../../models/source.model';
import {SettingsDataStorageService} from '../../../services/data-storage/settings-data-storage.service';
import {MatDialog} from '@angular/material';
import {AssignJobToCandidateDialogComponent} from '../../../dialogs/assign-job-to-candidate-dialog/assign-job-to-candidate-dialog.component';
import {JobAssigned} from '../../../models/job-assigned.model';
import {Job} from '../../../models/job.model';
import {JobDataStorageService} from '../../../services/data-storage/job-data-storage.service';
import {Pipeline} from '../../../models/pipeline.model';
import {ChangeStatusDialogComponent} from '../../../dialogs/change-status-dialog/change-status-dialog.component';
import {PipelineStage} from '../../../models/pipeline-stage.model';
import {StageScore} from '../../../models/stage-score.model';
import {CriteriaScore} from '../../../models/criteria-score.model';
import {StageComment} from '../../../models/stage-comment.model';
import {NotifierService} from 'angular-notifier';
import {ConfirmationDialogComponent} from '../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {DeleteDialogComponent} from '../../../dialogs/delete-dialog/delete-dialog.component';
import {CandidateService} from '../../../services/shared/candidate.service';
import {Department} from '../../../models/department.model';



@Component({
  selector: 'app-candidate-id',
  templateUrl: './candidate-id.component.html',
  styleUrls: ['./candidate-id.component.css']
})
export class CandidateIdComponent implements OnInit, DoCheck {

  candidateId: number;
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

  sources: Source[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private candidateService: CandidateService,
              private jobDataStorageService: JobDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private settingsDataStorageService: SettingsDataStorageService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.candidateId = +params['candidate-id'];
        }
      );

  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobs = data['jobs'];
          this.sources = data['sources'];
          this.pipelines = data['pipelines'];
          this.candidates = data['candidates'];
          this.departments = data['departments'];
        }
      );

    this.candidate = this.candidates.find(x => x.Id === this.candidateId);
    this.candidateService.candidate = this.candidate;
    this.getCurrentStageNameAndColor();
  }

  ngDoCheck() {
    this.candidate = this.candidateService.candidate;
    this.getCurrentStageNameAndColor();
  }


  getCurrentStageNameAndColor() {
    if (this.candidate.JobAssigned.length !== 0) {
      this.currentStageId =
        this.candidate.JobAssigned.find( x => x.IsActive === true).CurrentStageId;
      this.name = this.detectStageChange(this.currentStageId).stageName;
      this.color = this.detectStageChange(this.currentStageId).stageColor;
    }
  }

  pipelineStageChanged(pipelineStageId: number) {
    this.changeStatus(pipelineStageId);
  }

  detectStageChange(pipelineStageId: number) {
    for (let i = 0; i < this.pipelines.length; i++) {
      for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {
        if (this.pipelines[i].PipelineStage[j].Id === pipelineStageId) {
          return ({
            stageId: this.pipelines[i].PipelineStage[j].Id,
            stageName: this.pipelines[i].PipelineStage[j].Name,
            stageColor: this.pipelines[i].PipelineStage[j].Color
          });
        }
      }
    }
  }

  changeAssignedJob() {
  }

  removeAssignedJob() {
    const jobAssigned = this.candidate.JobAssigned
      .find(x => x.Id === this.getActiveJobAssignedId());
    const jobName = this.jobs.find(x => x.Id === jobAssigned.JobId).JobTitle;

    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Remove Job',
          iconClass: 'far fa-trash-alt',
          confirmationText: 'Are you sure you want to remove ' + jobName + ' from Candidate?',
          buttonText: 'Remove',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmationStatus) {
        this.jobDataStorageService.removeAssignedJob(jobAssigned)
          .subscribe(
            (data: any) => {
              const index = this.candidate.JobAssigned
                .findIndex(x => x.Id === this.getActiveJobAssignedId());
              this.candidate.JobAssigned.splice(index, 1);
              this.notifierService.notify('default', 'Job removed.')
            }
          );
      }
    }
    );
  }

  changeStatus(pipelineStageId: number) {
   const pipelineStages: PipelineStage[] = [];

    for (let i = 0; i < this.pipelines.length; i++) {
      for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {
        pipelineStages.push(this.pipelines[i].PipelineStage[j]);
      }
    }

    const stageScores = this.candidate.JobAssigned
      .find(x => x.Id === this.getActiveJobAssignedId()).StageScore;
    const criteriaScores = this.candidate.JobAssigned
      .find(x => x.Id === this.getActiveJobAssignedId()).CriteriaScore;

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
          pipelines: this.pipelines,
          selectTab: this.selectTabIndex,
          candidate: this.candidate,
          pipelineStageId: pipelineStageId,
          stageScore:
          this.candidate.JobAssigned
            .find(x => x.Id === this.getActiveJobAssignedId())
            .StageScore,
          criteriaScore:
          this.candidate.JobAssigned
            .find(x => x.Id === this.getActiveJobAssignedId())
            .CriteriaScore,
          comment: '',
          status: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
     if (result !== null) {

       let currentStageId = 1;
       const allPipelineStages: PipelineStage[] = [];
       for (let i = 0; i < this.pipelines.length; i++) {
         for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {
           allPipelineStages.push(this.pipelines[i].PipelineStage[j]);
         }
       }

       currentStageId = allPipelineStages[result.selectTab].Id;
       const stageComments: StageComment[] = [];
       if (result.comment !== '') {
          const stageComment = new StageComment(
           null,
           this.getActiveJobAssignedId(),
           currentStageId,
           this.candidateId,
           this.candidate.JobAssigned
             .find(x => x.Id === this.getActiveJobAssignedId())
             .JobId,
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

       const jobAssigned = new JobAssigned(
         this.getActiveJobAssignedId(),
         this.candidateId,
         this.candidate.JobAssigned
           .find(x => x.Id === this.getActiveJobAssignedId())
           .JobId,
         result.stageScore,
         result.criteriaScore,
         stageComments,
         currentStageId,
         true
       );

       this.jobDataStorageService.jobStatusChanged(jobAssigned)
         .subscribe(
           (data: any) => {
             const activeJobAssignedIndex
               = this.candidate.JobAssigned.findIndex( x => x.Id === this.getActiveJobAssignedId());
             this.candidate.JobAssigned[activeJobAssignedIndex] = data;
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

  assignJobDialog(candidate: Candidate) {
    const dialogRef = this.dialog.open(AssignJobToCandidateDialogComponent,
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
        const stageScores: StageScore[] = [];
        const criteriaScores: CriteriaScore[] = [];
        const stageComments: StageComment[] = [];
        const stageComment = new StageComment(
          null,
          null,
          1,
          this.candidateId,
          jobId,
          'Created from '
        );

        stageComments.push(stageComment);

        for (let i = 0; i < this.pipelines.length; i++) {
          for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {

            const stageScore = new StageScore(
              null,
              null,
              0,
              this.pipelines[i].PipelineStage[j].Id,
              this.candidateId,
              jobId
            );
            stageScores.push(stageScore);

            for (let l = 0;
                 l < this.pipelines[i].PipelineStage[j].PipelineStageCriteria.length;
                 l++) {

              const criteriaScore = new CriteriaScore(
                null,
                null,
                0,
                this.pipelines[i].PipelineStage[j].PipelineStageCriteria[l].Id,
                this.candidateId,
                jobId
              );
              criteriaScores.push(criteriaScore);

            }

          }
        }
        const jobAssigned = new JobAssigned(
          null,
          this.candidateId,
          result[0].Id,
          stageScores,
          criteriaScores,
          stageComments,
          1,
          true
        );

        this.jobDataStorageService.jobAssigned(jobAssigned)
          .subscribe(
            (getJobAssigned: any) => {
              this.candidate.JobAssigned.push(getJobAssigned);
              this.changeStatus(1);
            }
          );
      }
    });
  }


  getActiveJobAssignedId() {
    return this.candidate.JobAssigned
      .find(
        x => x.IsActive === true
    ).Id;
  }

  getLastAssignedJobName() {
   const lastIndex = this.candidate.JobAssigned.length - 1;
   return this.jobs.find(
     x => x.Id ===
       this.candidate.JobAssigned[lastIndex].JobId).JobTitle;
  }

  goToJobDetail() {
    const lastIndex = this.candidate.JobAssigned.length - 1;
    const jobId = this.candidate.JobAssigned[lastIndex].JobId;
    this.router.navigate(['jobs/',  jobId ]);
  }

  moveToRejected() {
    this.changeStatus(8);
  }

  moveToNextStage() {
    const pipelineStages: PipelineStage[] = [];
    let currentStageId;
    if (this.candidate.JobAssigned.length !== 0) {
       currentStageId = this
        .candidate.JobAssigned
        .find( x => x.IsActive === true).CurrentStageId;
    }

    for (let i = 0; i < this.pipelines.length; i++) {
      for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {
        pipelineStages.push(this.pipelines[i].PipelineStage[j]);
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

  previousCandidate() {
    const currentIndex = this.candidates.findIndex(x => x.Id === this.candidateId);
    let nextIndex = currentIndex - 1;
    if ( nextIndex === -1 ) {
       nextIndex = this.candidates.length - 1;
    } else {
       nextIndex = currentIndex - 1;
    }
    this.candidate = this.candidates[nextIndex];
    this.candidateService.candidate = this.candidates[nextIndex];
    this.candidateId = this.candidates[nextIndex].Id;
    this.router.navigate(['/candidates/' + this.candidateId]);
  }

  nextCandidate() {
    const currentIndex = this.candidates.findIndex(x => x.Id === this.candidateId);
    let nextIndex = currentIndex + 1;
    if ( nextIndex === this.candidates.length ) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    this.candidate = this.candidates[nextIndex];
    this.candidateService.candidate = this.candidates[nextIndex];
    this.candidateId = this.candidates[nextIndex].Id;
    this.router.navigate(['/candidates/' + this.candidateId]);
  }

  getApplicationDate() {
    return moment(new Date(this.candidate.ApplicationDate)).format('Do MMM YYYY');
  }
  getCandidateSource() {
    return this.sources.find(x => x.Id === this.candidate.SourceId).Name;
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
