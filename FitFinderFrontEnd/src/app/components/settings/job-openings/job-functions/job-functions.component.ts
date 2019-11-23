import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {JobFunction} from '../../../../models/settings/job-function.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {AddUpdateDialogComponent} from '../../../../dialogs/add-update-dialog/add-update-dialog.component';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-functions',
  templateUrl: './job-functions.component.html',
  styleUrls: ['./job-functions.component.css']
})
export class JobFunctionsComponent implements OnInit {

  jobFunctions: JobFunction[] = [];

  constructor(private jobFunctionDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {

        this.jobFunctions = data['jobFunctions'].jobFunctions;
      }
    )
  }

  editJobFunction(jobFunction: JobFunction) {
    const dialogRef = this.jobFunctionDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Job Function',
            name: jobFunction.Name,
            iconClass: 'fas fa-briefcase',
            footer: 'Add or update different job job-functions your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== jobFunction.Name && result !== '') {

        const editedJobFunction = new JobFunction(
          jobFunction.Id,
          result,
          null,
          null
        );

        this.settingsDataStorageService.editJobFunction(editedJobFunction)
          .subscribe(
            (data: any) => {
              jobFunction.Name = result;
              this.notifierService.notify('default', 'Job function updated.');
            }
          );

      }
    });
  }

  addNewJobFunction() {
    const dialogRef = this.jobFunctionDialog.open(AddUpdateDialogComponent,
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
            (newJobFunction: JobFunction) => {
              this.jobFunctions.push(newJobFunction);
              this.notifierService.notify('default', 'New job function added.');
            }
          );
      }
    });
  }

}
