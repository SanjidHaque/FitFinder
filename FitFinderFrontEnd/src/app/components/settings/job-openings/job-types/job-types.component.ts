import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {JobType} from '../../../../models/settings/job-type.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsService} from '../../../../services/shared-services/settings.service';

@Component({
  selector: 'app-types',
  templateUrl: './job-types.component.html',
  styleUrls: ['./job-types.component.css']
})
export class JobTypesComponent implements OnInit {
  isDisabled = false;
  jobTypes: JobType[] = [];

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.jobTypes = data['jobTypes'].jobTypes;
      });
  }


  addNewJobType() {
    this.settingsService.addNewJobType().then(result => {
      if (result !== '') {

        const jobType = new JobType(
          null,
          result,
          null,
          null
        );

        this.settingsDataStorageService.addNewJobType(jobType)
          .subscribe(
            (data: any) => {
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.jobTypes.push(data.jobType);
                this.notifierService.notify('default',
                  'New job type added.');
              }
            });
      }
    });
  }


  editJobType(jobType: JobType) {
    this.settingsService.editJobType(jobType.Name).then(result => {
      if (result !== '') {
        const editedJobType = new JobType(
          jobType.Id,
          result,
          null,
          null
        );

        this.isDisabled = true;
        this.settingsDataStorageService.editJobType(editedJobType)
          .subscribe(
            (data: any) => {
              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                jobType.Name = result;
                this.notifierService.notify('default',
                  'Job type updated successfully.');
              }
            });
      }
    });
  }


  deleteJobType(jobTypeId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteJobType().then(result => {

        if (result.confirmationStatus) {

          this.settingsDataStorageService.deleteJobType(jobTypeId)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {

                this.notifierService.notify('default', response.statusText);

              } else {

                this.jobTypes.splice(index, 1);
                this.notifierService.notify('default',
                  'Job type deleted successfully.');
              }

            });
        }

        this.isDisabled = false;

      })
      .catch();
  }
}
