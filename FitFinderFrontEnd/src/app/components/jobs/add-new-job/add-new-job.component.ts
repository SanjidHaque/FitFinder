import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
import {JobAttachment} from '../../../models/job-attachment.model';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job.model';
import {JobDataStorageService} from '../../../services/data-storage/job-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AddUpdateComponent} from '../../../dialogs/add-update/add-update.component';
import {Department} from '../../../models/department.model';
import {JobFunction} from '../../../models/job-function.model';
import {JobType} from '../../../models/job-type.model';
import {SettingsDataStorageService} from '../../../services/data-storage/settings-data-storage.service';
import {CandidateDataStorageService} from '../../../services/data-storage/candidate-data-storage.service';

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

  departments: Department[] = [];
  jobFunctions: JobFunction[] = [];
  jobTypes: JobType[] = [];

  addNewJobForm: FormGroup;
  minDate = '';

  jobAttachments: JobAttachment[] = [];
  filesToUpload: Array<File>;
  @ViewChild('fileUpload', {static: false}) fileUploadVar: any;
  isDisabled = false;

  constructor(private departmentDialog: MatDialog,
              private settingsDataStorageService: SettingsDataStorageService,
              private jobFunctionalityDialog: MatDialog,
              private notifierService: NotifierService,
              private jobDataStorageService: JobDataStorageService,
              private candidateDataStorageService: CandidateDataStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private jobType: MatDialog) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobTypes = data['jobTypes'];
          this.jobFunctions = data['jobFunctions'];
          this.departments = data['departments'];
        }
      );



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

    this.isDisabled = true;
    this.jobDataStorageService.addNewJob(job)
       .subscribe(
         (data: any) => {
           this.candidateDataStorageService.uploadAttachments(this.filesToUpload)
             .subscribe(
               (response: any) => {

                 this.clearAllArrays();
                 this.addNewJobForm.reset();
                 this.router.navigate(['/jobs/', response.Id ]);
                 this.notifierService.notify('default', 'New job published.');


               }
             );
         }
       );
  }

  fileChangeEvent(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      const fileName = fileInput.target.files[i].name.substr(0, fileInput.target.files[i].name.lastIndexOf('.'));
      const fileExtension = fileInput.target.files[i].name.split('.').pop();

      if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'pdf') {
        const newFileName = fileName + Date.now() + '.' + fileExtension;
        const newFile = new File([fileInput.target.files[i]], newFileName, {type: fileInput.target.files[i].type});
        this.filesToUpload.push(newFile);
        const jobAttachment = new JobAttachment(
          null,
          null,
          fileInput.target.files[i].name,
          newFile.name);
        this.jobAttachments.push(jobAttachment);
        this.notifierService.notify('default', 'File uploaded successfully.');

      } else {
        this.notifierService.notify('default', 'Unsupported format!');
      }
    }
    this.fileUploadVar.nativeElement.value = '';
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
    const dialogRef = this.departmentDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Department',
            name: '',
            iconClass: 'far fa-building',
            footer: 'Add or update different departments your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const department = new Department(
          null,
          result
        );

        this.settingsDataStorageService.addNewDepartment(department)
          .subscribe(
            (data: any) => {
             this.departments.push(data);
             this.notifierService.notify('default', 'New department added.');
            }
          );
      }
    });
  }


  addNewJobFunction() {
    const dialogRef = this.jobFunctionalityDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Job Function',
            name: '',
            iconClass: 'fas fa-briefcase',
            footer: 'Add or update different job job-functions your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const jobFunction = new JobFunction(
          null,
          result
        );

        this.settingsDataStorageService.addNewJobFunction(jobFunction)
          .subscribe(
            (data: any) => {
              this.jobFunctions.push(data);
              this.notifierService.notify('default', 'New job function added!');
            }
          );
      }
    });
  }



  addNewJobType() {
    const dialogRef = this.jobType.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Job Type',
            name: '',
            iconClass: 'fas fa-passport',
            footer: 'Add or update different job job-types your organization hires.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const jobType = new JobType(
          null,
          result
        );


        this.settingsDataStorageService.addNewJobType(jobType)
          .subscribe(
            (data: any) => {
              this.jobTypes.push(data);
              this.notifierService.notify('default', 'New job type added!');
            }
          );
      }
    });
  }
}
