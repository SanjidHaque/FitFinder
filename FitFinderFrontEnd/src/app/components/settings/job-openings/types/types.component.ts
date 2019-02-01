import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../models/department.model';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {CreateDepartmentComponent} from '../../../../dialogs/create-department/create-department.component';
import {UUID} from 'angular2-uuid';
import {CreateJobTypeComponent} from '../../../../dialogs/create-job-type/create-job-type.component';
import {JobType} from '../../../../models/job-type.model';
import {SettingsService} from '../../../../services/settings.service';
import {Tag} from '../../../../models/tag.model';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  jobTypes: JobType[] = [];

  constructor(private jobTypeDialog: MatDialog,
              private dataStorageService: DataStorageService,
              private settingsService: SettingsService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.jobTypes = this.settingsService.getAllJobType();
  }


  editJobType(jobType: JobType) {
    const dialogRef = this.jobTypeDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Job Type',
            name: jobType.Name,
            iconClass: 'fas fa-passport',
            footer: 'Add or update different job types your organization hires.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== jobType.Name && result !== '') {

        jobType.Name = result;
        this.notifierService.notify('default', 'Job type updated!');

        this.dataStorageService.editJobType(jobType)
          .subscribe(
            (data: any) => {
              jobType.Name = result;
              this.notifierService.notify('default', 'Job type updated!');
            }
          );

      }
    });
  }

  addNewJobType() {
    const dialogRef = this.jobTypeDialog.open(CreateJobTypeComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Job Type',
            name: '',
            iconClass: 'fas fa-passport',
            footer: 'Add or update different job types your organization hires.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const jobType = new JobType(
          null,
          result
        );

        this.jobTypes.push(jobType);
        this.notifierService.notify('default', 'New job type added!');

        this.dataStorageService.addNewJobType(jobType)
          .subscribe(
            (data: any) => {
              this.jobTypes.push(jobType);
              this.notifierService.notify('default', 'New job type added!');
            }
          );
      }
    });
  }

}
