import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Department} from '../../../models/settings/department.model';
import {JobFunction} from '../../../models/settings/job-function.model';
import {JobType} from '../../../models/settings/job-type.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {SettingsService} from '../../../services/shared-services/settings.service';
import {Job} from '../../../models/job/job.model';
import * as moment from 'moment';
import {Workflow} from '../../../models/settings/workflow.model';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  isDisabled = false;

  editJobForm: FormGroup;
  minDate = '';

  job: Job;
  departments: Department[] = [];
  jobFunctions: JobFunction[] = [];
  jobTypes: JobType[] = [];
  workflows: Workflow[] = [];

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

  constructor(private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService,
              private jobDataStorageService: JobDataStorageService,
              private route: ActivatedRoute,
              private settingsService: SettingsService,
              private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.job = data['job'].job;
      this.jobTypes = data['jobTypes'].jobTypes;
      this.jobFunctions = data['jobFunctions'].jobFunctions;
      this.departments = data['departments'].departments;
      this.workflows = data['workflows'].workflows;
    });

    this.minDate = this.getTomorrowsDate();
    this.editJobForm = new FormGroup({
      'title': new FormControl(this.job.Title, Validators.required),
      'code': new FormControl(this.job.Code),
      'description': new FormControl(this.job.Description),
      'immediateSkills': new FormControl(this.job.ImmediateSkills),
      'intermediateSkills': new FormControl(this.job.IntermediateSkills),
      'goodToHaveSkills': new FormControl(this.job.GoodToHaveSkills),
      'location': new FormControl(this.job.Location),
      'departmentId': new FormControl(this.job.DepartmentId, Validators.required),
      'jobFunctionId': new FormControl(this.job.JobFunctionId),
      'jobTypeId': new FormControl(this.job.JobTypeId),
      'positions': new FormControl(this.job.Positions, [Validators.required, Validators.min(0)]),
      'closingDate': new FormControl(this.job.ClosingDate),
      'experienceStarts': new FormControl(this.job.ExperienceStarts, Validators.min(0)),
      'experienceEnds': new FormControl(this.job.ExperienceEnds, Validators.min(0)),
      'salaryStarts': new FormControl(this.job.SalaryStarts, Validators.min(0)),
      'salaryEnds': new FormControl(this.job.SalaryEnds, Validators.min(0))
    });

  }

  getJobPositionErrorMessage() {
    return this.editJobForm.controls['positions'].hasError('required') ? 'You must enter a position!' :
      this.editJobForm.controls['positions'].hasError('min') ? 'This value is invalid!' :
        '';
  }

  getTomorrowsDate() {
    const today = new Date();
    const tomorrow =  today.setDate(today.getDate() + 1);
    return moment(tomorrow).format('YYYY-MM-DD');
  }

  addNewDepartment() {
    this.settingsService.addNewDepartment().then(result => {
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
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.departments.push(data.department);
                this.notifierService.notify('default',
                  'New department added.');
                //  this.gapiService.syncToDrive(this.departments, []).then().catch();
              }
            });
      }
    });
  }


  addNewJobFunction() {
    this.settingsService.addNewJobFunction().then(result => {
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
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.jobFunctions.push(data.jobFunction);
                this.notifierService.notify('default',
                  'New job function added.');
              }
            });
      }
    });
  }



  addNewJobType() {
    this.settingsService.addNewJobType().then(result => {
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
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.jobTypes.push(data.jobType);
                this.notifierService.notify('default',
                  'New job type added.');
              }
            });
      }
    });
  }


  editJob() {
    const job = new Job(
      this.job.Id,
      this.editJobForm.controls['title'].value,
      this.editJobForm.controls['code'].value,
      this.editJobForm.controls['description'].value,
      this.editJobForm.controls['immediateSkills'].value,
      this.editJobForm.controls['intermediateSkills'].value,
      this.editJobForm.controls['goodToHaveSkills'].value,
      this.editJobForm.controls['location'].value,
      null,
      this.editJobForm.controls['departmentId'].value,
      null,
      this.editJobForm.controls['jobFunctionId'].value,
      null,
      this.editJobForm.controls['jobTypeId'].value,
      this.editJobForm.controls['positions'].value,
      this.editJobForm.controls['closingDate'].value,
      this.editJobForm.controls['experienceStarts'].value,
      this.editJobForm.controls['experienceEnds'].value,
      this.editJobForm.controls['salaryStarts'].value,
      this.editJobForm.controls['salaryEnds'].value,
      [],
      false,
      true,
      '',
      false,
      null,
      null,
      null,
     null
    );

    this.isDisabled = true;
    this.jobDataStorageService.editJob(job).subscribe((data: any) => {
      if (data.statusText !== 'Success') {
        this.isDisabled = false;
        this.notifierService.notify('default', data.statusText);
      } else {
        this.router.navigate(['/jobs/', this.job.Id]);
        this.notifierService.notify('default', 'Job updated successfully.');
      }
    });

  }

}
