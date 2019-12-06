import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {Department} from '../../../../models/settings/department.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {GapiService} from '../../../../services/google-api-services/gapi.service';
import {SettingsService} from '../../../../services/shared-services/settings.service';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  isDisabled = false;
  departments: Department[] = [];

  constructor(private departmentDialog: MatDialog,
              private route: ActivatedRoute,
              private gapiService: GapiService,
              private settingsService: SettingsService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.departments = data['departments'].departments;
      });
  }

  addNewDepartment() {
    this.settingsService.addNewDepartment().then(result => {
      if (result !== '') {

        const department = new Department(
          null,
          result,
          null,
          null
        );

        this.settingsDataStorageService.addNewDepartment(department)
          .subscribe(
            (data: any) => {
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.departments.push(data.department);
                this.notifierService.notify('default',
                  'New department added.');
                this.gapiService.syncToDrive(this.departments, []).then().catch();
              }
            });
      }
    });
  }

  editDepartment(department: Department) {
    this.settingsService.editDepartment(department.Name).then(result => {
      if (result !== '') {
        const editedDepartment = new Department(
          department.Id,
          result,
          null,
          null
        );

        this.isDisabled = true;
        this.settingsDataStorageService.editDepartment(editedDepartment)
          .subscribe(
            (data: any) => {
              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                department.Name = result;
                this.notifierService.notify('default',
                  'Department updated successfully.');
              }
            });
      }
    });
  }

  deleteDepartment(departmentId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteDepartment().then(result => {

        if (result.confirmationStatus) {

          this.settingsDataStorageService.deleteDepartment(departmentId)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {

                this.notifierService.notify('default', response.statusText);

              } else {

                this.departments.splice(index, 1);
                this.notifierService.notify('default',
                  'Department deleted successfully.');
              }

            });
        }

        this.isDisabled = false;

      })
      .catch();
  }

}
