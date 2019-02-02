import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {Department} from '../../../../models/department.model';
import {SettingsService} from '../../../../services/settings.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';

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

  editDepartment(department: Department) {
    const dialogRef = this.departmentDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Department',
            name: department.Name,
            iconClass: 'far fa-building',
            footer: 'Add or update different departments your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== department.Name && result !== '') {


        this.dataStorageService.editDepartment({Id: department.Id, Name: result})
          .subscribe(
            (data: any) => {
              department.Name = result;
              this.notifierService.notify('default', 'Department updated!');
            }
          );

      }
    });
  }

  addNewDepartment() {
    const dialogRef = this.departmentDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'New Department',
            name: '',
            iconClass: 'far fa-building',
            footer: 'Add or update different departments your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const department = new Department(
          null,
          result
        );

        this.dataStorageService.addNewDepartment(department)
          .subscribe(
            (data: any) => {
              this.departments.push(department);
              this.notifierService.notify('default', 'New department added!');
            }
          );
      }
    });
  }
}
