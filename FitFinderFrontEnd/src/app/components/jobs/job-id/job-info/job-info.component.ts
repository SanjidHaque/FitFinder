import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {JobDataStorageService} from '../../../../services/data-storage/job-data-storage.service';
import {Job} from '../../../../models/job.model';
import * as moment from 'moment';
import {CandidateAttachment} from '../../../../models/canidate-attachment.model';
import {JobAttachment} from '../../../../models/job-attachment.model';
import {NotifierService} from 'angular-notifier';
import {UUID} from 'angular2-uuid';
import {Department} from '../../../../models/department.model';
import {JobFunction} from '../../../../models/job-function.model';
import {JobType} from '../../../../models/job-type.model';
import {SettingsDataStorageService} from '../../../../services/data-storage/settings-data-storage.service';
import {ConfirmationComponent} from '../../../../dialogs/confirmation/confirmation.component';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage/data-storage.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit, DoCheck {

  candidateDefaultImage = 'assets/images/candidateDefaultImage.png';
  job: Job;
  filesToUpload: Array<File>;
  @ViewChild('fileUpload', {static: false}) fileUploadVar: any;


  departments: Department[] = [];
  jobFunctionalities: JobFunction[] = [];
  employmentTypes: JobType[] = [];

  constructor(private jobService: JobDataStorageService,
              private settingsService: SettingsDataStorageService,
              private dialog: MatDialog,
              private dataStorageService: DataStorageService,
              private notifierService: NotifierService) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.job = this.jobService.job;
    this.employmentTypes = this.settingsService.getAllJobType();
    this.jobFunctionalities = this.settingsService.getAllJobFunction();
    this.departments = this.settingsService.getAllDepartment();
  }

  ngDoCheck() {
   this.job = this.jobService.job;
  }

  favouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);
    this.dataStorageService.favouriteJobs(jobs)
      .subscribe(
        (response: any) => {
          this.job.IsFavourite = true;
          this.notifierService.notify('default', 'Added to favourites!')
        }
      );
  }

  unfavouriteJobs(job: Job) {
    const jobs: Job[] = [];
    jobs.push(job);
    this.dataStorageService.unfavouriteJobs(jobs)
      .subscribe(
        (response: any) => {
          this.job.IsFavourite = false;
          this.notifierService.notify('default', 'Removed from favourites!')
        }
      );
  }

  archiveJobs(job: Job) {
    const dialogRef = this.dialog.open(ConfirmationComponent,
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
          this.dataStorageService.archiveJobs(jobs)
            .subscribe(
              (response: any) => {
                this.job.IsArchived = true;
                this.notifierService.notify('default', 'Archived successfully!')
              }
            );
        }
      }
    );
  }

  restoreJobs(job: Job) {
    const dialogRef = this.dialog.open(ConfirmationComponent,
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
          this.dataStorageService.restoreJobs(jobs)
            .subscribe(
              (response: any) => {
                this.job.IsArchived = false;
                this.notifierService.notify('default', 'Restored successfully!')
              }
            );
        }
      }
    );
  }
  getJobDescription() {
    document.getElementById('job-description').innerHTML = this.job.JobDescription;
  }

  getImmediateSkill() {
    document.getElementById('job-immediate').innerHTML = this.job.JobImmediate;
  }

  getIntermediateSkill() {
    document.getElementById('job-intermediate').innerHTML = this.job.JobIntermediate;
  }

  getGoodToHaveSkill() {
    document.getElementById('job-good-to-have').innerHTML = this.job.JobGoodToHave;
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
          null, this.job.Id, fileInput.target.files[i].name, newFile.name);
        this.job.JobAttachment.push(jobAttachment);
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
    /*window.open('assets/cseregular3rd.pdf');*/
  }
  getJobFunction() {
    return this.jobFunctionalities.find(
      x => x.Id === this.job.JobFunctionalityId).Name;
  }
  getJobType() {
    return this.employmentTypes.find(
      x => x.Id === this.job.EmploymentTypeId).Name;
  }
  getClosingDays() {
    const today = new Date();
    const closingDate = moment(new Date(this.job.JobClosingDate));
    return Math.ceil(closingDate.diff(today, 'days', true));

  }

  getDepartmentName() {
    return this.departments.find(
      x => x.Id === this.job.DepartmentId).Name;
  }

  getCreatedDate() {
    return moment(new Date(this.job.JobCreatedDate)).format('Do MMM YYYY')
  }

  getClosingDate() {
    return moment(new Date(this.job.JobClosingDate)).format('Do MMM YYYY')
  }

}
