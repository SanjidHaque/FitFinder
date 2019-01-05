import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {MatDialog} from '@angular/material';
import {CreateDepartmentInstantlyDialogComponent} from './create-department-instantly-dialog/create-department-instantly-dialog.component';
import {UUID} from 'angular2-uuid';
import {CreateEmploymentTypeInstantlyDialogComponent} from './create-employment-type-instantly-dialog/create-employment-type-instantly-dialog.component';
import {CreateJobFunctionalityInstantlyDialogComponent} from './create-job-functionality-instantly-dialog/create-job-functionality-instantly-dialog.component';

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

  addNewJobForm: FormGroup;

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
  selectedDepartment = 'Accounts';

  constructor(private departmentDialog: MatDialog,
              private jobFunctionalitiesDialog: MatDialog,
              private employmentTypesDialog: MatDialog) {

  }

  ngOnInit() {
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
      'employmentTypeId': new FormControl('')
    });
  }


  onSubmitNewJob() {

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
