import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Candidate} from '../../../models/candidate.model';
import {CandidateService} from '../../../services/candidate.service';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../models/canidate-attachment.model';
import {CandidateEducation} from '../../../models/candidate-education.model';
import {CandidateExperience} from '../../../models/candidate-experience.model';
import {Source} from '../../../models/source.model';
import {SettingsService} from '../../../services/settings.service';
import {MatDialog} from '@angular/material';
import {AssignJobToCandidateComponent} from '../../../dialogs/assign-job-to-candidate/assign-job-to-candidate.component';
import {JobAssigned} from '../../../models/job-assigned.model';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import {Pipeline} from '../../../models/pipeline.model';
import {ChangeStatusComponent} from '../../../dialogs/change-status/change-status.component';
import {PipelineStage} from '../../../models/pipeline-stage.model';
import {StageScore} from '../../../models/stage-score.model';
import {CriteriaScore} from '../../../models/criteria-score.model';
import {DataStorageService} from '../../../services/data-storage.service';
import {StageComment} from '../../../models/stage-comment.model';
import {NotifierService} from 'angular-notifier';



@Component({
  selector: 'app-candidate-id',
  templateUrl: './candidate-id.component.html',
  styleUrls: ['./candidate-id.component.css']
})
export class CandidateIdComponent implements OnInit {

  candidateId: number;
  selectTabIndex = 0;
  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  rating: 0;
  new = 1;
  name = 'New';
  color = 'blue';
  pipelines: Pipeline[] = [];
  pipelineStageStarRating: StageScore[] = [];

  candidates: Candidate[] = [];
  candidate: Candidate;
  jobs: Job[] = [];

  sources: Source[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private notifierService: NotifierService,
              private jobService: JobService,
              private dataStorageService: DataStorageService,
              private candidateService: CandidateService,
              private settingsService: SettingsService) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.candidateId = +params['candidate-id'];
        }
      );

  }

  ngOnInit() {
    this.jobs = this.jobService.getAllJob();
    this.pipelines = this.settingsService.getAllPipeline();
    this.candidates = this.candidateService.getAllCandidate();
    this.candidate = this.candidates.find(x => x.Id === this.candidateId);
    this.sources = this.settingsService.getAllSource();
  }



  selectValueChanged(pipelineStageId: number) {
    for (let i = 0; i < this.pipelines.length; i++) {

      for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {
        if (this.pipelines[i].PipelineStage[j].Id === pipelineStageId) {
          this.name = this.pipelines[i].PipelineStage[j].Name;
          this.color = this.pipelines[i].PipelineStage[j].Color;
        }
      }
    }
    this.changeStatus(pipelineStageId);
  }

  changeStatus(pipelineStageId: number) {
   const pipelineStages: PipelineStage[] = [];

    for (let i = 0; i < this.pipelines.length; i++) {
      for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {
        pipelineStages.push(this.pipelines[i].PipelineStage[j]);
      }
    }

     for (let k = 0; k < pipelineStages.length; k++) {
      if (pipelineStages[k].Id === pipelineStageId) {
        this.selectTabIndex = k;
      }
    }




    const dialogRef = this.dialog.open(ChangeStatusComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '700px',
        data: {
          pipelines: this.pipelines,
          selectTab: this.selectTabIndex,
          candidate: this.candidate,
          pipelineStageId: pipelineStageId,
          stageScore: this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1].StageScore,
          criteriaScore: this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1].CriteriaScore,
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
           this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1].Id,
           currentStageId,
           this.candidateId,
           this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1].JobId,
           result.comment
         );
         stageComments.push(stageComment);
         this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1].StageComment.push(stageComment);
       }


       for (let i = 0; i < result.stageScore.length; i++) {
         result.stageScore[i].Id = null;
       }

       for (let i = 0; i < result.criteriaScore.length; i++) {
         result.criteriaScore[i].Id = null;
       }

       const jobAssigned = new JobAssigned(
         this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1].Id,
         this.candidateId,
         this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1].JobId,
         result.stageScore,
         result.criteriaScore,
         stageComments,
         currentStageId
       );



       this.dataStorageService.jobStatusChanged(jobAssigned)
         .subscribe(
           (data: any) => {
             console.log(data);
             this.candidate.JobAssigned[this.candidate.JobAssigned.length - 1] = data;
             /*this.dataStorageService.removeOldScores(jobAssigned)
               .subscribe(
                 (oldScores : any) => {


                   this.dataStorageService.addNewScores(jobAssigned)
                     .subscribe(
                       (newScores : any) => {

                       }
                     );


                 }
               );*/


             /*this.candidate.JobAssigned[ this.candidate.JobAssigned.length - 1].StageScore = data.StageScore;
             this.candidate.JobAssigned[ this.candidate.JobAssigned.length - 1].CriteriaScore = data.CriteriaScore;
             this.candidate.JobAssigned[ this.candidate.JobAssigned.length - 1].CurrentStageId = currentStageId;*/
             this.notifierService.notify('default', 'Status changed!');
           }
         );
     }


    });
  }




  assignJobDialog(candidate: Candidate) {
    const dialogRef = this.dialog.open(AssignJobToCandidateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '1000px'
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' ) {


        const stageScores: StageScore[] = [];
        const criteriaScores: CriteriaScore[] = [];
        const stageComments: StageComment[] = [];

        for (let i = 0; i < this.pipelines.length; i++) {
          for (let j = 0; j < this.pipelines[i].PipelineStage.length; j++) {

            const stageScore = new StageScore(
              null,
              null,
              0,
              this.pipelines[i].PipelineStage[j].Id,
              this.candidateId,
              result[0].Id
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
                result[0].Id
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
          [],
          1
        );




        this.dataStorageService.jobAssigned(jobAssigned)
          .subscribe(
            (getJobAssigned: any) => {
              this.candidate.JobAssigned.push(getJobAssigned);
            }
          );
      }
    });
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
