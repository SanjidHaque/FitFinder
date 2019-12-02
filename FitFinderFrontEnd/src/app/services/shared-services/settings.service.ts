import { Injectable } from '@angular/core';
import {Department} from '../../models/settings/department.model';
import {DialogService} from '../dialog-services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private dialogService: DialogService) {}

  addNewRejectedReason() {
    const header = 'New Rejected Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for rejection by hiring manager.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewWithdrawnReason() {
    const header = 'New Withdrawn Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for withdrawn of application by candidate.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewSource() {
    const header = 'New Withdrawn Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for rejection by hiring manager.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewDepartment() {
    const header = 'New Withdrawn Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for rejection by hiring manager.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewJobFunction() {
    const header = 'New Withdrawn Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for rejection by hiring manager.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewJobType() {
    const header = 'New Withdrawn Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for rejection by hiring manager.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }


  editRejectedReason(name: string) {
    const header = 'Edit Rejected Reason';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for withdrawn of application by candidate.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editWithdrawnReason(name: string) {
    const header = 'Edit Withdrawn Reason';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for withdrawn of application by candidate.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  deleteRejectedReason() {
    const header = 'Delete rejected reason';
    const iconClass = 'far fa-trash-alt';
    const cssClass = 'delete';
    const width = '400px';
    const confirmationText = 'Are you sure?';
    const buttonText = 'Delete';
    const confirmationStatus = false;
    const dialogRef = this.dialogService.confirmationDialog(header, iconClass,
      cssClass, confirmationText, buttonText, confirmationStatus);
    return dialogRef.afterClosed().toPromise();
  }

  deleteWithdrawnReason() {
    const header = 'Delete withdrawn reason';
    const iconClass = 'far fa-trash-alt';
    const cssClass = 'delete';
    const width = '400px';
    const confirmationText = 'Are you sure?';
    const buttonText = 'Delete';
    const confirmationStatus = false;
    const dialogRef = this.dialogService.confirmationDialog(header, iconClass,
      cssClass, confirmationText, buttonText, confirmationStatus);
    return dialogRef.afterClosed().toPromise();
  }

}
