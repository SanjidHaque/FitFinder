import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {JobDataStorageService} from '../../../../services/data-storage-services/job-data-storage.service';
import {Job} from '../../../../models/job/job.model';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../../models/candidate/canidate-attachment.model';
import {JobAttachment} from '../../../../models/job/job-attachment.model';
import {NotifierService} from 'angular-notifier';
import {Department} from '../../../../models/settings/department.model';
import {JobFunction} from '../../../../models/settings/job-function.model';
import {JobType} from '../../../../models/settings/job-type.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {ConfirmationDialogComponent} from '../../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Data} from '@angular/router';
import {JobService} from '../../../../services/shared-services/job.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit {

  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  job: Job;
  filesToUpload: Array<File>;
  @ViewChild('fileUpload', {static: false}) fileUploadVar: any;


  departments: Department[] = [];
  jobFunctions: JobFunction[] = [];
  jobTypes: JobType[] = [];

  constructor(private jobDataStorageService: JobDataStorageService,
              private settingsDataStorageService: SettingsDataStorageService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private jobService: JobService,
              private notifierService: NotifierService) {
    this.filesToUpload = [];
  }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        this.jobTypes = data['jobTypes'].jobTypes;
        this.jobFunctions = data['jobFunctions'].jobFunctions;
        this.departments = data['departments'].departments;
        this.job = this.jobService.job;
      }
    );

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
      .subscribe(
        (response: any) => {
          this.job.IsFavourite = false;
          this.notifierService.notify('default', 'Removed from favourites.')
        }
      );
  }

  archiveJobs(job: Job) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Archive Job',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          const jobs: Job[] = [];
          jobs.push(job);
          this.jobDataStorageService.archiveJobs(jobs)
            .subscribe(
              (response: any) => {
                this.job.IsArchived = true;
                this.notifierService.notify('default', 'Archived successfully.')
              }
            );
        }
      }
    );
  }

  restoreJobs(job: Job) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Restore Job',
          iconClass: 'fas fa-archive',
          confirmationText: 'Are you sure?',
          buttonText: 'Archive',
          confirmationStatus: false
        }
      });

    dialogRef.afterClosed().subscribe(result => {
        if (result.confirmationStatus) {
          const jobs: Job[] = [];
          jobs.push(job);
          this.jobDataStorageService.restoreJobs(jobs)
            .subscribe(
              (response: any) => {
                this.job.IsArchived = false;
                this.notifierService.notify('default', 'Restored successfully.')
              }
            );
        }
      }
    );
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

  fileChangeEvent(fileInput: any) {

    for (let i = 0; i < fileInput.target.files.length; i++) {
      const fileName = fileInput.target.files[i].name.substr(0, fileInput.target.files[i].name.lastIndexOf('.'));
      const fileExtension = fileInput.target.files[i].name.split('.').pop();
      if (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'docx') {
        const newFileName = fileName + Date.now() + '.' + fileExtension;
        const newFile = new File([fileInput.target.files[i]], newFileName, {type: fileInput.target.files[i].type});
        this.filesToUpload.push(newFile);
        const jobAttachment = new JobAttachment(
          null,
          fileInput.target.files[i].name,
          newFile.name,
          null,
          this.job.Id
        );
        this.job.JobAttachments.push(jobAttachment);
        this.notifierService.notify('default', 'File uploaded successfully');
      } else {
        this.notifierService.notify('default', 'Unsupported file format!');

      }
    }
    this.filesToUpload = [];
    this.fileUploadVar.nativeElement.value = '';

  }

  downloadFile(jobAttachment: JobAttachment) {
    window.open('http://localhost:55586/Content/Attachments/' + jobAttachment.ModifiedFileName);
  }

  getJobFunction() {

    if (this.job.JobFunctionId === null) {
      return '';
    }

    const jobFunction =  this.jobFunctions
      .find(x => x.Id === this.job.JobFunctionId);

    if (jobFunction === undefined) {
      return '';
    }
    return jobFunction.Name;
  }


  getJobType() {

    if (this.job.JobTypeId === null) {
      return '';
    }

    const jobType =  this.jobTypes
      .find(x => x.Id === this.job.JobTypeId);

    if (jobType === undefined) {
      return '';
    }
    return jobType.Name;


  }


  getClosingDays() {
    const today = new Date();
    const closingDate = moment(new Date(this.job.ClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));

  }

  getDepartmentName() {
    return this.departments.find(
      x => x.Id === this.job.DepartmentId).Name;
  }

  getCreatedDate() {
    return moment(new Date(this.job.PostingDate)).format('Do MMM YYYY')
  }

  getClosingDate() {
    return moment(new Date(this.job.ClosingDate)).format('Do MMM YYYY')
  }

}
