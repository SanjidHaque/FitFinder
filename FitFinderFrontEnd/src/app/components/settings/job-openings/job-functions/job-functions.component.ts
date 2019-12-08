import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {JobFunction} from '../../../../models/settings/job-function.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsService} from '../../../../services/shared-services/settings.service';

@Component({
  selector: 'app-functions',
  templateUrl: './job-functions.component.html',
  styleUrls: ['./job-functions.component.css']
})
export class JobFunctionsComponent implements OnInit {
  isDisabled = false;
  jobFunctions: JobFunction[] = [];

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.jobFunctions = data['jobFunctions'].jobFunctions;
      });
  }

  addNewJobFunction() {
    this.settingsService.addNewJobFunction().then(result => {
      if (result !== '') {

        const jobFunction = new JobFunction(
          null,
          result,
          null,
          null
        );

        this.settingsDataStorageService.addNewJobFunction(jobFunction)
          .subscribe(
            (data: any) => {
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.jobFunctions.push(data.jobFunction);
                this.notifierService.notify('default',
                  'New job function added.');
              }
            });
      }
    });
  }


  editJobFunction(jobFunction: JobFunction) {
    this.settingsService.editJobFunction(jobFunction.Name).then(result => {
      if (result !== '') {
        const editedJobFunction = new JobFunction(
          jobFunction.Id,
          result,
          null,
          null
        );

        this.isDisabled = true;
        this.settingsDataStorageService.editJobFunction(editedJobFunction)
          .subscribe(
            (data: any) => {
              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                jobFunction.Name = result;
                this.notifierService.notify('default',
                  'Job function updated successfully.');
              }
            });
      }
    });
  }


  deleteJobFunction(jobFunctionId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Job Function')
      .then(result => {

        if (result.confirmationStatus) {

          this.settingsDataStorageService.deleteJobFunction(jobFunctionId)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {

                this.notifierService.notify('default', response.statusText);

              } else {

                this.jobFunctions.splice(index, 1);
                this.notifierService.notify('default',
                  'job type function successfully.');
              }

            });
        }

        this.isDisabled = false;

      })
      .catch();
  }

}
