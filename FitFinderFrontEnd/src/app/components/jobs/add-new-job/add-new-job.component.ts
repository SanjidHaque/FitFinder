import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
import {JobAttachment} from '../../../models/job/job-attachment.model';
import {NotifierService} from 'angular-notifier';
import {Job} from '../../../models/job/job.model';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AddUpdateDialogComponent} from '../../../dialogs/add-update-dialog/add-update-dialog.component';
import {Department} from '../../../models/settings/department.model';
import {JobFunction} from '../../../models/settings/job-function.model';
import {JobType} from '../../../models/settings/job-type.model';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {CandidateDataStorageService} from '../../../services/data-storage-services/candidate-data-storage.service';
import {Workflow} from '../../../models/settings/workflow.model';
import {PipelineStageCriterion} from '../../../models/settings/pipeline-stage-criterion.model';
import {PipelineStage} from '../../../models/settings/pipeline-stage.model';
import {GapiService} from '../../../services/google-api-services/gapi.service';
import {AttachmentDataStorageService} from '../../../services/data-storage-services/attachment-data-storage.service';

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

  workflows: Workflow[] = [];

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
              private attachmentDataStorageService: AttachmentDataStorageService,
              private route: ActivatedRoute,
              private gapiService: GapiService,
              private router: Router,
              private dialog: MatDialog,
              private jobType: MatDialog) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.jobTypes = data['jobTypes'].jobTypes;
          this.jobFunctions = data['jobFunctions'].jobFunctions;
          this.departments = data['departments'].departments;
          this.workflows = data['workflows'];

        }
      );

    this.filterDefaultPipelineStages();


    this.minDate = this.getTomorrowsDate();
    this.addNewJobForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'code': new FormControl(''),
      'description': new FormControl(''),
      'immediateSkills': new FormControl(''),
      'intermediateSkills': new FormControl(''),
      'goodToHaveSkills': new FormControl(''),
      'location': new FormControl(''),
      'departmentId': new FormControl('', Validators.required),
      'jobFunctionId': new FormControl(''),
      'jobTypeId': new FormControl(''),
      'positions': new FormControl('', [Validators.required, Validators.min(0)]),
      'closingDate': new FormControl(''),
      'experienceStarts': new FormControl('', Validators.min(0)),
      'experienceEnds': new FormControl('', Validators.min(0)),
      'salaryStarts': new FormControl('', Validators.min(0)),
      'salaryEnds': new FormControl('', Validators.min(0)),
      'workflowId': new FormControl(this.workflows[0].Id, Validators.required)
    });
  }


  filterDefaultPipelineStages() {
    this.workflows.forEach((workflow) => {
      workflow.Pipelines.forEach((pipeline) => {
        pipeline.PipelineStage.forEach((pipelineStage) => {

          if (pipelineStage.PipelineStageCriteria === null) {
            pipelineStage.PipelineStageCriteria = [];
          }

          pipelineStage.PipelineStageCriteria.forEach((pipelineStageCriteria, index) => {
            if (pipelineStageCriteria.JobId !== null) {
              pipelineStage.PipelineStageCriteria.splice(index);
            }
          });
        });
      });
    });
  }

  async addNewJob() {
    const job = new Job(
      null,
      this.addNewJobForm.controls['title'].value,
      this.addNewJobForm.controls['code'].value,
      this.addNewJobForm.controls['description'].value,
      this.addNewJobForm.controls['immediateSkills'].value,
      this.addNewJobForm.controls['intermediateSkills'].value,
      this.addNewJobForm.controls['goodToHaveSkills'].value,
      this.addNewJobForm.controls['location'].value,
      null,
      this.addNewJobForm.controls['departmentId'].value,
      null,
      this.addNewJobForm.controls['jobFunctionId'].value,
      null,
      this.addNewJobForm.controls['jobTypeId'].value,
      this.addNewJobForm.controls['positions'].value,
      this.addNewJobForm.controls['closingDate'].value,
      this.addNewJobForm.controls['experienceStarts'].value,
      this.addNewJobForm.controls['experienceEnds'].value,
      this.addNewJobForm.controls['salaryStarts'].value,
      this.addNewJobForm.controls['salaryEnds'].value,
      this.jobAttachments,
      false,
      true,
      new Date().toString(),
      false,
      null,
      null,
      null,
      this.addNewJobForm.controls['workflowId'].value,
    );

    this.isDisabled = true;


    this.isDisabled = true;
    await this.attachmentDataStorageService.uploadAttachments(this.filesToUpload)
      .subscribe(
        (data: any) => {
          if (data.statusText !== 'Success') {
            this.isDisabled = false;
            this.notifierService.notify('default', data.statusText);
            return;
          }
        });

    this.jobDataStorageService.addNewJob(job)
      .subscribe(
        (data: any) => {
          if (data.statusText !== 'Success') {

            this.isDisabled = false;
            this.notifierService.notify('default', data.statusText);
            return;

          } else {


            const jobSpecificPipelineStageCriteria = this.getJobSpecificPipelineStageCriteria(data.job.Id);

            this.settingsDataStorageService.addNewPipelineStageCriteriaForNewJob(jobSpecificPipelineStageCriteria)
              .subscribe((response: any) => {

                if (data.statusText !== 'Success') {

                  this.isDisabled = false;
                  this.notifierService.notify('default', data.statusText);
                  return;
                }

              });
          }
        });


    // await this.jobDataStorageService.addNewJob(job)
    //    .subscribe(
    //      (data: any) => {
    //        this.candidateDataStorageService.uploadAttachments(this.filesToUpload)
    //          .subscribe(
    //            (response: any) => {
    //
    //              this.settingsDataStorageService
    //                .addNewPipelineStageCriteriaForNewJob()
    //                .subscribe((reply: any) => {
    //
    //                  this.router.navigate(['/jobs/', data.job.Id ]);
    //                  this.notifierService.notify('default', 'New job published.');
    //
    //                  const jobs: Job[] = [];
    //                  jobs.push(data.job);
    //
    //                  this.gapiService.syncToDrive(this.departments, jobs);
    //
    //                });
    //
    //
    //
    //
    //            });
    //      });
  }

  getJobSpecificPipelineStageCriteria(jobId: number) {
    const workflowId = this.addNewJobForm.controls['workflowId'].value;
    const workflow = this.workflows.find(x => x.Id === workflowId);
    const pipelineStageCriteria: PipelineStageCriterion[] = [];

    workflow.Pipelines.forEach((pipeline) => {
      pipeline.PipelineStage.forEach((pipelineStage) => {

        if (pipelineStage.PipelineStageCriteria === null) {
          pipelineStage.PipelineStageCriteria = [];
        }

        pipelineStage.PipelineStageCriteria.forEach((pipelineStageCriterion) => {
          if (pipelineStageCriterion.Id === null) {
            pipelineStageCriterion.JobId = jobId;
            pipelineStageCriteria.push(pipelineStageCriterion);
          }
        });
      });
    });

    return pipelineStageCriteria;
  }

  getSelectedWorkflow() {
    const workflowId = this.addNewJobForm.controls['workflowId'].value;
    return this.workflows.find(x => x.Id === workflowId);
  }


  addNewPipelineStageCriteria(pipelineStage: PipelineStage) {

    const dialogRef = this.dialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            header: 'New Pipeline Criteria',
            name: '',
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different pipeline criteria your candidate needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {

        if (result !== '') {

          const pipelineStageCriteria = new PipelineStageCriterion(
            null,
            result,
            null,
            pipelineStage.Id,
            null,
            null
          );

          if (pipelineStage.PipelineStageCriteria === null) {
            pipelineStage.PipelineStageCriteria= [];
          }

          pipelineStage.PipelineStageCriteria.push(pipelineStageCriteria);

        }

      });
  }


  editPipelineStageCriteria(pipelineStageCriterion: PipelineStageCriterion) {
    const dialogRef = this.dialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            header: 'Edit Pipeline Criteria',
            name: pipelineStageCriterion.Name,
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different pipeline criteria your candidate needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '' && result !== pipelineStageCriterion.Name) {
        pipelineStageCriterion.Name = result;
      }

    });





  }

  deletePipelineStageCriterion(pipelineStage: PipelineStage, index: number) {
    pipelineStage.PipelineStageCriteria.splice(index, 1);
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
          fileInput.target.files[i].name,
          newFile.name,
          null,
          null
        );
        this.jobAttachments.push(jobAttachment);
        this.notifierService.notify('default', 'File uploaded successfully.');

      } else {
        this.notifierService.notify('default', 'Unsupported format!');
      }
    }
    this.fileUploadVar.nativeElement.value = '';
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
    const dialogRef = this.departmentDialog.open(AddUpdateDialogComponent,
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
          result,
          null,
          null
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
    const dialogRef = this.jobFunctionalityDialog.open(AddUpdateDialogComponent,
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
          result,
          null,
          null
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
    const dialogRef = this.jobType.open(AddUpdateDialogComponent,
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
          result,
          null,
          null
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
