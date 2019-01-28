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
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';

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
    const dialogRef = this.jobFunctionDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Job Function',
            name: '',
            iconClass: 'fas fa-briefcase',
            footer: 'Add or update different job functions your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const jobFunction = new JobFunction(
          UUID.UUID(),
          result
        );
        this.jobFunctions.push(jobFunction);
        this.notifierService.notify('default', 'New job function added!');

        this.dataStorageService.addNewJobFunction(jobFunction)
          .subscribe(
            (data: any) => {
              this.jobFunctions.push(jobFunction);
              this.notifierService.notify('default', 'New job function added!');
            }
          );
      }
    });
  }

}
