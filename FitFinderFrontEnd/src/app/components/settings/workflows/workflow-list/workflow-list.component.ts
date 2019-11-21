import { Component, OnInit } from '@angular/core';
import {Workflow} from '../../../../models/settings/workflow.model';
import {ActivatedRoute, Data, Route} from '@angular/router';
import {Department} from '../../../../models/settings/department.model';
import {AddUpdateDialogComponent} from '../../../../dialogs/add-update-dialog/add-update-dialog.component';
import {MatDialog} from '@angular/material';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {

  workflows: Workflow[] = [];


  constructor(private workflowDialog: MatDialog,
              private route: ActivatedRoute,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.workflows = data['workflows'];
      }
    )
  }


  editWorkflowName(workflow: Workflow) {
    const dialogRef = this.workflowDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Workflow Name',
            name: workflow.Name,
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different workflows your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== workflow.Name && result !== '') {

        const editedWorkflow = new Workflow(
          workflow.Id,
          result,
          null,
          []
        );

        this.settingsDataStorageService.editWorkflowName(editedWorkflow)
          .subscribe(
            (data: any) => {
              workflow.Name = result;
              this.notifierService.notify('default', 'Workflow name updated.');
            }
          );

      }
    });
  }



}
