import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {Department} from '../../../../models/department.model';
import {SettingsDataStorageService} from '../../../../services/data-storage/settings-data-storage.service';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];

  constructor(private departmentDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {

        this.departments= data['departments'];
      }
    )
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


        this.settingsDataStorageService.editDepartment({Id: department.Id, Name: result})
          .subscribe(
            (data: any) => {
              department.Name = result;
              this.notifierService.notify('default', 'Department updated.');
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

        this.settingsDataStorageService.addNewDepartment(department)
          .subscribe(
            (newDepartment: any) => {
              this.departments.push(newDepartment);
              this.notifierService.notify('default', 'New department added.');
            }
          );
      }
    });
  }
}
