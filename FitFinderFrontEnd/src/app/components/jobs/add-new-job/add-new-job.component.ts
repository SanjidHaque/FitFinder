import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {MatDialog} from '@angular/material';
import {UUID} from 'angular2-uuid';
import * as moment from 'moment';
import {JobAttachment} from '../../../models/job-attachment.model';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job.model';
import {JobService} from '../../../services/job.service';
import {Router} from '@angular/router';
import {DataStorageService} from '../../../services/data-storage.service';
import {CreateDepartmentComponent} from '../../../dialogs/create-department/create-department.component';
import {CreateJobFunctionComponent} from '../../../dialogs/create-job-function/create-job-function.component';
import {CreateJobTypeComponent} from '../../../dialogs/create-job-type/create-job-type.component';

@Component({
  selector: 'app-add-new-job',
  templateUrl: './add-new-job.component.html',
  styleUrls: ['./add-new-job.component.css']
})
export class AddNewJobComponent implements OnInit {

  jobDescriptionConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Description here',
    translate: 'no',
    uploadUrl: 'images'
  };
  jobIntermediateConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Description here',
    translate: 'no',
    uploadUrl: 'images'
  };
  jobImmediateConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Description here',
    translate: 'no',
    uploadUrl: 'images'
  };
  jobGoodToHaveConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Description here',
    translate: 'no',
    uploadUrl: 'images'
  };

  departments = [
    {id: 1, name: 'Accounts'},
    {id: 2, name: 'Finance'},
    {id: 3, name: 'Development'},
    {id: 4, name: 'Engineering'}
  ];
  jobFunctionalities = [
    {id: 1, name: 'Research'},
    {id: 2, name: 'Sales'},
    {id: 3, name: 'Consulting'}
  ];
  employmentTypes = [
    {id: 1, name: 'Full Time'},
    {id: 2, name: 'Part Time'},
    {id: 3, name: 'Internship'}
  ];

  addNewJobForm: FormGroup;
  minDate = '';

  jobAttachments: JobAttachment[] = [];
  filesToUpload: Array<File>;
  @ViewChild('fileUpload') fileUploadVar: any;
  isDisabled = false;

  constructor(private departmentDialog: MatDialog,
              private jobFunctionalityDialog: MatDialog,
              private notifierService: NotifierService,
              private jobService: JobService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private jobType: MatDialog) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.minDate = this.getTomorrowsDate();
    this.addNewJobForm = new FormGroup({
      'jobTitle': new FormControl('', Validators.required),
      'jobCode': new FormControl(''),
      'jobDescription': new FormControl(''),
      'jobImmediate': new FormControl(''),
      'jobIntermediate': new FormControl(''),
      'jobGoodToHave': new FormControl(''),
      'jobLocation': new FormControl(''),
      'departmentId': new FormControl('', Validators.required),
      'jobFunctionalityId': new FormControl(''),
      'employmentTypeId': new FormControl(''),
      'jobPositions': new FormControl('', [Validators.required, Validators.min(0)]),
      'jobClosingDate': new FormControl(''),
      'jobExperienceStarts': new FormControl('', Validators.min(0)),
      'jobExperienceEnds': new FormControl('', Validators.min(0)),
      'jobSalaryStarts': new FormControl('', Validators.min(0)),
      'jobSalaryEnds': new FormControl('', Validators.min(0))
    });
  }

  onSubmitNewJob() {
    const jobId = null;

    for ( let i = 0; i < this.jobAttachments.length; i++ ) {
      this.jobAttachments[i].JobId = null;
      this.jobAttachments[i].Id = null;
    }

    const job = new Job(
      jobId,
      this.addNewJobForm.controls['jobTitle'].value,
      this.addNewJobForm.controls['jobCode'].value,
      this.addNewJobForm.controls['jobDescription'].value,
      this.addNewJobForm.controls['jobImmediate'].value,
      this.addNewJobForm.controls['jobIntermediate'].value,
      this.addNewJobForm.controls['jobGoodToHave'].value,
      this.addNewJobForm.controls['jobLocation'].value,
      this.addNewJobForm.controls['departmentId'].value,
      this.addNewJobForm.controls['jobFunctionalityId'].value,
      this.addNewJobForm.controls['employmentTypeId'].value,
      this.addNewJobForm.controls['jobPositions'].value,
      this.addNewJobForm.controls['jobClosingDate'].value,
      this.addNewJobForm.controls['jobExperienceStarts'].value,
      this.addNewJobForm.controls['jobExperienceEnds'].value,
      this.addNewJobForm.controls['jobSalaryStarts'].value,
      this.addNewJobForm.controls['jobSalaryEnds'].value,
      this.jobAttachments,
      false,
      true,
      new Date().toString(),
      false
    );
    this.jobService.addNewJob(job);
    this.notifierService.notify('default', 'New job published');
    this.isDisabled = true;
    this.router.navigate(['/jobs']);
    /*this.dataStorageService.addNewJob(job)
       .subscribe(
         (data: any) => {
           this.dataStorageService.uploadAttachments(this.filesToUpload)
             .subscribe(
               (response: any) => {
                  this.clearAllArrays();
                  this.addNewJobForm.reset();
                  this.router.navigate(['/jobs']);
                  this.notifierService.notify('default', 'New job published');
                 /!* 148, 150 no line'll be removed when comment out this block *!/
               }
             );
         }
       );*/
  }

  fileChangeEvent(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      const fileName = fileInput.target.files[i].name.substr(0, fileInput.target.files[i].name.lastIndexOf('.'));
      const fileExtension = fileInput.target.files[i].name.split('.').pop();
      const newFileName = fileName + Date.now() + '.' + fileExtension;
      const newFile = new File([fileInput.target.files[i]], newFileName, {type: fileInput.target.files[i].type});
      this.filesToUpload.push(newFile);
      const jobAttachment = new JobAttachment(
        null,
         null,
        fileInput.target.files[i].name,
        newFile.name);
      this.jobAttachments.push(jobAttachment);
    }
    this.notifierService.notify('default', 'File uploaded successfully');
  }

  clearAllArrays() {
    this.jobAttachments = [];
    this.filesToUpload = [];
  }

  getFile() {
    document.getElementById('choseFile').click();
  }

  removeAllSelectedFiles() {
    this.filesToUpload = [];
    this.fileUploadVar.nativeElement.value = '';
    this.jobAttachments = [];
  }

  removeSelectedFiles(index: number) {
    this.jobAttachments.splice(index, 1);
  }

  getJobPositionErrorMessage() {
    return this.addNewJobForm.controls['jobPositions'].hasError('required') ? 'You must enter a job position!' :
      this.addNewJobForm.controls['jobPositions'].hasError('min') ? 'This value is invalid!' :
        '';
  }

  getTomorrowsDate() {
    const today = new Date();
    const tomorrow =  today.setDate(today.getDate() + 1);
    return moment(tomorrow).format('YYYY-MM-DD');
  }




  addNewDepartment() {
    const dialogRef = this.departmentDialog.open(CreateDepartmentComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.departments.push({id: null, name: result});
      }
    });
  }


  addNewJobFunction() {
    const dialogRef = this.jobFunctionalityDialog.open(CreateJobFunctionComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.jobFunctionalities.push({id: null, name: result});
      }
    });
  }



  addNewJobType() {
    const dialogRef = this.jobType.open(CreateJobTypeComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.employmentTypes.push({id: null, name: result});
      }
    });
  }
}
