import {Component, OnInit, ViewChild} from '@angular/core';
import {JobDataStorageService} from '../../../../services/data-storage-services/job-data-storage.service';
import {Job} from '../../../../models/job/job.model';
import * as moment from 'moment';
import {JobAttachment} from '../../../../models/job/job-attachment.model';
import {NotifierService} from 'angular-notifier';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {JobService} from '../../../../services/shared-services/job.service';
import {DialogService} from '../../../../services/dialog-services/dialog.service';
import {SettingsService} from '../../../../services/shared-services/settings.service';
import {PipelineStageCriterion} from '../../../../models/settings/pipeline-stage-criterion.model';
import {PipelineStage} from '../../../../models/settings/pipeline-stage.model';
import {AttachmentDataStorageService} from '../../../../services/data-storage-services/attachment-data-storage.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit {
  isDisabled = false;

  candidateDefaultImage = 'assets/images/defaultImage.png';
  job: Job;
  filesToUpload: Array<File> = [];

  constructor(private jobDataStorageService: JobDataStorageService,
              private settingsDataStorageService: SettingsDataStorageService,
              private attachmentDataStorageService: AttachmentDataStorageService,
              private settingsService: SettingsService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService,
              private jobService: JobService,
              private notifierService: NotifierService) {}

  ngOnInit() {
    this.job = this.jobService.job;
  }


  favouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);

    this.jobDataStorageService.favouriteJobs(jobs)
      .subscribe(
        (response: any) => {
          this.job.IsFavourite = true;
          this.notifierService.notify('default', 'Added to favourites.')
        }
      );
  }

  unfavouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);
    this.jobDataStorageService.unfavouriteJobs(jobs)
      .subscribe((response: any) => {
          this.job.IsFavourite = false;
          this.notifierService.notify('default', 'Removed from favourites.')
        });
  }

  archiveJobs(job: Job) {
    this.dialogService.confirmationDialog(
      'Archive Job',
      'fas fa-archive',
      '400px',
      'warn',
      'Are you sure?',
      'Archive',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          const jobs: Job[] = [];
          jobs.push(job);

          this.isDisabled = true;
          this.jobDataStorageService.archiveJobs(jobs)
            .subscribe(
              (response: any) => {
                this.isDisabled = false;

                this.job.IsArchived = true;
                this.notifierService.notify('default', 'Archived successfully.');
              });
        }
      }
    );
  }

  restoreJobs(job: Job) {
    this.dialogService.confirmationDialog(
      'Restore Job',
      'far fa-window-restore',
      '400px',
      'warn',
      'Are you sure?',
      'Restore',
      false
    ).afterClosed().subscribe(result => {
        if (result.confirmationStatus) {

          const jobs: Job[] = [];
          jobs.push(job);

          this.isDisabled = true;
          this.jobDataStorageService.restoreJobs(jobs)
            .subscribe((response: any) => {
                this.isDisabled = false;

                this.job.IsArchived = false;
                this.notifierService.notify('default', 'Restored successfully.')
              });
        }
      });
  }


  deleteJob() {
    this.settingsService.deleteResource('Delete Job')
      .then(result => {

        if (result.confirmationStatus) {
          this.isDisabled = true;

          this.jobDataStorageService.deleteJob(this.job.Id)
            .subscribe((data: any) => {

              if (data.statusText !== 'Success') {

                this.isDisabled = false;
                this.notifierService.notify('default', data.statusText);

              } else {

                this.notifierService.notify('default', 'Job deleted successfully');
                this.router.navigate(['jobs']);

              }
            });

        }
      }).catch();
  }


  addNewPipelineStageCriterion(pipelineStage: PipelineStage) {
    this.settingsService.addNewPipelineStageCriterion().then(result => {

      if (result !== '') {
        const pipelineStageCriterion = new PipelineStageCriterion(
          null,
          result,
          null,
          pipelineStage.Id,
          null,
          this.job.Id
        );

        this.settingsDataStorageService
          .addNewPipelineStageCriterion(pipelineStageCriterion)
          .subscribe(
            (data: any) => {

              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {

                if (pipelineStage.PipelineStageCriteria === null) {
                  pipelineStage.PipelineStageCriteria = [];
                }

                pipelineStage.PipelineStageCriteria.push(data.pipelineStageCriterion);
                console.log(data.pipelineStageCriterion);
                this.notifierService
                  .notify('default', 'New pipeline stage criterion added.');

              }
            });
      }
    });
  }


  editPipelineStageCriterion(pipelineStageCriterion: PipelineStageCriterion) {
    this.settingsService.editPipelineStageCriterion(pipelineStageCriterion.Name)
      .then(result => {

        this.isDisabled = true;

        if (result !== '' && result !== pipelineStageCriterion.Name) {

          const editPipelineStageCriterion = new PipelineStageCriterion(
            pipelineStageCriterion.Id,
            result,
            null,
            pipelineStageCriterion.PipelineStageId,
            null,
            null
          );

          this.settingsDataStorageService
            .editPipelineStageCriterion(editPipelineStageCriterion)
            .subscribe((data: any) => {

              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                pipelineStageCriterion.Name = result;
                this.notifierService
                  .notify('default', 'Pipeline stage criterion updated successfully.');
              }
            });
        }
      });
  }


  deletePipelineStageCriterion(pipelineStage: PipelineStage,
                               pipelineStageCriterionId: number,
                               index: number) {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Pipeline Stage Criterion')
      .then(result => {

        if (result.confirmationStatus) {

          this.settingsDataStorageService
            .deletePipelineStageCriterion(pipelineStageCriterionId)
            .subscribe((data: any) => {

                this.isDisabled = false;

                if (data.statusText !== 'Success') {
                  this.notifierService.notify('default', data.statusText);
                } else {
                  pipelineStage.PipelineStageCriteria.splice(index, 1);
                  this.notifierService
                    .notify('default', 'Pipeline stage criterion deleted successfully.');
                }
              });
        }
      }).catch();
  }

  getJobDescription() {
    document.getElementById('job-description').innerHTML = this.job.Description;
  }

  getImmediateSkill() {
    document.getElementById('job-immediate').innerHTML = this.job.ImmediateSkills;
  }

  getIntermediateSkill() {
    document.getElementById('job-intermediate').innerHTML = this.job.IntermediateSkills;
  }

  getGoodToHaveSkill() {
    document.getElementById('job-good-to-have').innerHTML = this.job.GoodToHaveSkills;
  }


  getFile() {
    document.getElementById('choseFile').click();
  }

  addNewJobAttachment(fileInput: any) {

      const fileName = fileInput.target.files[0].name
        .substr(0, fileInput.target.files[0].name.lastIndexOf('.'));

      const fileExtension = fileInput.target.files[0].name.split('.').pop();

      if (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'docx') {

        const newFileName = fileName + Date.now() + '.' + fileExtension;
        const newFile = new File([fileInput.target.files[0]], newFileName, {type: fileInput.target.files[0].type});
        this.filesToUpload.push(newFile);

        const jobAttachment = new JobAttachment(
          null,
          fileInput.target.files[0].name,
          newFile.name,
          null,
          this.job.Id
        );

        if (this.job.JobAttachments === null) {
          this.job.JobAttachments = [];
        }

        this.attachmentDataStorageService.uploadAttachments(this.filesToUpload)
          .subscribe((data: any) => {

            if (data.statusText !== 'Success') {
              this.isDisabled = false;
              this.notifierService.notify('default', data.statusText);

            } else {

              this.jobDataStorageService.addNewJobAttachment(jobAttachment)
                .subscribe((res: any) => {
                  this.isDisabled = false;
                  if (data.statusText !== 'Success') {
                    this.notifierService.notify('default', data.statusText);
                  } else {
                    jobAttachment.Id = res.Id;

                    this.job.JobAttachments.push(jobAttachment);
                    this.notifierService.notify('default', 'File uploaded successfully');
                  }
                });
              }
          });


      } else {
        this.notifierService.notify('default', 'Unsupported file format!');
      }

    this.filesToUpload = [];
  }


  downloadJobAttachment(jobAttachment: JobAttachment) {
    window.open('http://localhost:55586/Content/Attachments/' +
      jobAttachment.ModifiedFileName);
  }

  deleteJobAttachment(jobAttachment: JobAttachment, index: number) {
    this.settingsService.deleteResource('Delete Attachment')
      .then(result => {
        if (result.confirmationStatus) {

          const jobAttachments = [];
          jobAttachments.push(jobAttachment.ModifiedFileName);

          this.isDisabled = true;
          this.jobDataStorageService.deleteJobAttachment(jobAttachment.Id)
            .subscribe((data: any) => {
              this.isDisabled = false;

              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.job.JobAttachments.splice(index, 1);

                if (this.job.JobAttachments.length === 0) {
                  this.job.JobAttachments = null;
                }
                this.notifierService.notify('default', 'Attachment deleted successfully.');
              }

            });
        }
      });
  }


  getClosingDays() {
    const today = new Date();
    const closingDate = moment(new Date(this.job.ClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));
  }

  getCreatedDate() {
    return moment(new Date(this.job.PostingDate)).format('Do MMM YYYY');
  }

  getClosingDate() {
    return moment(new Date(this.job.ClosingDate)).format('Do MMM YYYY');
  }
}
