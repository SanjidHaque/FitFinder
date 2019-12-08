import { Injectable } from '@angular/core';
import {DialogService} from '../dialog-services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  numberOfWorkflows = 0;

  constructor(private dialogService: DialogService) {}

  addNewRejectedReason() {
    const header = 'New Rejected Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for rejection by hiring manager.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewWithdrawnReason() {
    const header = 'New Withdrawn Reason';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons for withdrawn of application by' +
      ' candidate.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewSource() {
    const header = 'New Source';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different sources your organization have.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewDepartment() {
    const header = 'New Department';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different departments your organization have.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewJobFunction() {
    const header = 'New Job Function';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different job-functions your organization requires.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  addNewJobType() {
    const header = 'New Job Type';
    const name = '';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different job-types your organization needs.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editWorkflowName(name: string) {
    const header = 'Edit Workflow Name';
    const iconClass = 'fas fa-flag-checkered';
    const width = '500px';
    const footer = 'Add or update different workflows your organization needs.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editSource(name: string) {
    const header = 'Edit Source';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different sources your organization have.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editDepartment(name: string) {
    const header = 'Edit Department';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different departments your organization have.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editJobFunction(name: string) {
    const header = 'Edit Job Function';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different job-functions your organization requires.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editJobType(name: string) {
    const header = 'Edit Job Type';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different job-types your organization needs.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editRejectedReason(name: string) {
    const header = 'Edit Rejected Reason';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons ' +
      'for rejection of application by hiring manager.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editWithdrawnReason(name: string) {
    const header = 'Edit Withdrawn Reason';
    const iconClass = 'fas fa-ban';
    const width = '500px';
    const footer = 'Add or update different reasons' +
      ' for withdrawn of application by candidate.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }


  addNewPipelineStage() {
    const header = 'New Pipeline Stage';
    const name = '';
    const iconClass = 'fas fa-flag-checkered';
    const color = '#' + (Math.random().toString(16) + '000000').substring(2, 8);
    const width = '450px';
    const footer = 'Add or update different pipeline stages your organization needs.';
    const dialogRef = this.dialogService.addNewPipelineStageDialog(header, name,
      color, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editPipelineStage(name: string, color: string) {
    const header = 'Edit Pipeline Stage';
    const iconClass = 'fas fa-flag-checkered';
    const width = '450px';
    const footer = 'Add or update different pipeline stages your organization needs.';
    const dialogRef = this.dialogService.addNewPipelineStageDialog(header, name,
      color, iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }


  addNewPipelineStageCriterion() {
    const header = 'Add New Pipeline Stage Criterion';
    const name = '';
    const iconClass = 'fas fa-flag-checkered';
    const width = '450px';
    const footer = 'Add or update different pipeline criterion your candidate needs.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  editPipelineStageCriterion(name: string) {
    const header = 'Edit Pipeline Stage Criterion';
    const iconClass = 'fas fa-flag-checkered';
    const width = '450px';
    const footer = 'Add or update different pipeline criterion your candidate needs.';
    const dialogRef = this.dialogService.addOrUpdateDialog(header, name,
      iconClass, width, footer);
    return dialogRef.afterClosed().toPromise();
  }

  deleteResource(header: string) {
    const iconClass = 'far fa-trash-alt';
    const cssClass = 'delete';
    const width = '400px';
    const confirmationText = 'Are you sure?';
    const buttonText = 'Delete';
    const confirmationStatus = false;
    const dialogRef = this.dialogService.confirmationDialog(header, iconClass, width,
      cssClass, confirmationText, buttonText, confirmationStatus);
    return dialogRef.afterClosed().toPromise();
  }

}
