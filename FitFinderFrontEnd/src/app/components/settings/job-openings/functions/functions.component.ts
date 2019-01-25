import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../models/department.model';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {CreateDepartmentComponent} from '../../../../dialogs/create-department/create-department.component';
import {UUID} from 'angular2-uuid';
import {CreateJobFunctionComponent} from '../../../../dialogs/create-job-function/create-job-function.component';
import {JobFunction} from '../../../../models/job-function.model';
import {SettingsService} from '../../../../services/settings.service';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

  jobFunctions: JobFunction[] = [];

  constructor(private jobFunctionDialog: MatDialog,
              private settingsService: SettingsService,
              private dataStorageService: DataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.jobFunctions = this.settingsService.getAllJobFunction();
  }

  addNewJobFunction() {
    const dialogRef = this.jobFunctionDialog.open(CreateJobFunctionComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const jobFunction = new JobFunction(
          UUID.UUID(),
          result
        );
        this.jobFunctions.push(jobFunction);
      }
    });
  }

}
