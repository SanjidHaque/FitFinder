import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {JobFunction} from '../../../../models/job-function.model';
import {SettingsDataStorageService} from '../../../../services/data-storage/settings-data-storage.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

  jobFunctions: JobFunction[] = [];

  constructor(private jobFunctionDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {

        this.jobFunctions= data['jobFunctions'];
      }
    )
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
            (newJobFunction: JobFunction) => {
              this.jobFunctions.push(newJobFunction);
              this.notifierService.notify('default', 'New job function added!');
            }
          );
      }
    });
  }

}
