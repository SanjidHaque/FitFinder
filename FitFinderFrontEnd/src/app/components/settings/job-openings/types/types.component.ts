import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {JobType} from '../../../../models/job-type.model';
import {SettingsService} from '../../../../services/settings.service';
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


        this.dataStorageService.editJobType({Id: jobType.Id, Name: result})
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
    const dialogRef = this.jobTypeDialog.open(AddUpdateComponent,
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


        this.dataStorageService.addNewJobType(jobType)
          .subscribe(
            (newJobType: any) => {
              this.jobTypes.push(newJobType);
              this.notifierService.notify('default', 'New job type added!');
            }
          );
      }
    });
  }

}
