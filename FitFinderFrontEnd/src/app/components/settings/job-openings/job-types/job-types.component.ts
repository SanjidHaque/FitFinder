import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {JobType} from '../../../../models/settings/job-type.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {AddUpdateDialogComponent} from '../../../../dialogs/add-update-dialog/add-update-dialog.component';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-types',
  templateUrl: './job-types.component.html',
  styleUrls: ['./job-types.component.css']
})
export class JobTypesComponent implements OnInit {

  jobTypes: JobType[] = [];

  constructor(private jobTypeDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.jobTypes = data['jobTypes'].jobTypes;
      }
    );
  }


  editJobType(jobType: JobType) {
    const dialogRef = this.jobTypeDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Job Type',
            name: jobType.Name,
            iconClass: 'fas fa-passport',
            footer: 'Add or update different job job-types your organization hires.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== jobType.Name && result !== '') {


        const editedJobType = new JobType(
          jobType.Id,
          result,
          null,
          null
        );


        this.settingsDataStorageService.editJobType(editedJobType)
          .subscribe(
            (data: any) => {
              jobType.Name = result;
              this.notifierService.notify('default', 'Job type updated.');
            }
          );

      }
    });
  }

  addNewJobType() {
    const dialogRef = this.jobTypeDialog.open(AddUpdateDialogComponent,
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
            (newJobType: any) => {
              this.jobTypes.push(newJobType);
              this.notifierService.notify('default', 'New job type added.');
            }
          );
      }
    });
  }

}
