import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {MatDialog} from '@angular/material';
import {CreateDepartmentInstantlyDialogComponent} from './create-department-instantly-dialog/create-department-instantly-dialog.component';
import {UUID} from 'angular2-uuid';
import {CreateEmploymentTypeInstantlyDialogComponent} from './create-employment-type-instantly-dialog/create-employment-type-instantly-dialog.component';
import {CreateJobFunctionalityInstantlyDialogComponent} from './create-job-functionality-instantly-dialog/create-job-functionality-instantly-dialog.component';
import * as moment from 'moment';

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
    {id: '1', name: 'Accounts'},
    {id: '2', name: 'Finance'},
    {id: '3', name: 'Development'},
    {id: '4', name: 'Engineering'}
  ];
  jobFunctionalities = [
    {id: '1', name: 'Research'},
    {id: '2', name: 'Sales'},
    {id: '3', name: 'Consulting'}
  ];
  employmentTypes = [
    {id: '1', name: 'Full Time'},
    {id: '2', name: 'Part Time'},
    {id: '3', name: 'Internship'}
  ];

  addNewJobForm: FormGroup;
  minDate = '';

  constructor(private departmentDialog: MatDialog,
              private jobFunctionalitiesDialog: MatDialog,
              private employmentTypesDialog: MatDialog) {

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
      'jobClosingDate': new FormControl('', Validators.required),
      'jobExperienceStarts': new FormControl('', Validators.min(0)),
      'jobExperienceEnds': new FormControl('', Validators.min(0)),
      'jobSalaryStarts': new FormControl('', Validators.min(0)),
      'jobSalaryEnds': new FormControl('', Validators.min(0))
    });
  }
  getJobPositionErrorMessage() {
    return this.addNewJobForm.controls['jobPositions'].hasError('required') ? 'You must enter a job position!' :
      this.addNewJobForm.controls['jobPositions'].hasError('min') ? 'This value is invalid!' :
        '';
  }

  onSubmitNewJob() {

  }

  getTomorrowsDate() {
    const today = new Date();
    const tomorrow =  today.setDate(today.getDate() + 1);
    return moment(tomorrow).format('YYYY-MM-DD');
  }




  openCreateNewDepartmentInstantlyDialog() {
    const dialogRef = this.departmentDialog.open(CreateDepartmentInstantlyDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.departments.push({id: UUID.UUID(), name: result});
      }
    });
  }
  openCreateNewJobFunctionalitiesInstantlyDialog() {
    const dialogRef = this.jobFunctionalitiesDialog.open(CreateJobFunctionalityInstantlyDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.jobFunctionalities.push({id: UUID.UUID(), name: result});
      }
    });
  }
  openCreateNewEmploymentTypesInstantlyDialog() {
    const dialogRef = this.employmentTypesDialog.open(CreateEmploymentTypeInstantlyDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.employmentTypes.push({id: UUID.UUID(), name: result});
      }
    });
  }
}
