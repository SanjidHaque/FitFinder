import { Component, OnInit } from '@angular/core';
import {CreateJobTypeComponent} from '../../../../dialogs/create-job-type/create-job-type.component';
import {UUID} from 'angular2-uuid';
import {Tag} from '../../../../models/tag.model';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {CreateDepartmentComponent} from '../../../../dialogs/create-department/create-department.component';
import {Department} from '../../../../models/department.model';
import {SettingsService} from '../../../../services/settings.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];

  constructor(private departmentDialog: MatDialog,
              private settingsService: SettingsService,
              private dataStorageService: DataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.departments = this.settingsService.getAllDepartment();
  }

  addNewDepartment() {
    const dialogRef = this.departmentDialog.open(CreateDepartmentComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: { name: ''}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const department = new Department(
          UUID.UUID(),
          result
        );
        this.departments.push(department);
      }
    });
  }
}
