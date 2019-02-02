import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../models/department.model';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {UUID} from 'angular2-uuid';
import {JobFunction} from '../../../../models/job-function.model';
import {SettingsService} from '../../../../services/settings.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';
import {Tag} from '../../../../models/tag.model';

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

  editJobFunction(jobFunction: JobFunction) {
    const dialogRef = this.jobFunctionDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Job Function',
            name: jobFunction.Name,
            iconClass: 'fas fa-briefcase',
            footer: 'Add or update different job functions your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== jobFunction.Name && result !== '') {


        this.dataStorageService.editJobFunction({Id: jobFunction.Id, Name: result})
          .subscribe(
            (data: any) => {
              jobFunction.Name = result;
              this.notifierService.notify('default', 'Job function updated!');
            }
          );

      }
    });
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
          null,
          result
        );

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
