import { Component, OnInit } from '@angular/core';
import {Workflow} from '../../../../models/settings/workflow.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {SettingsService} from '../../../../services/shared-services/settings.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {
  isDisabled = false;
  workflows: Workflow[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private settingsService: SettingsService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.workflows = data['workflows'].workflows;
        this.settingsService.numberOfWorkflows = this.workflows.length;
      });
  }


  editWorkflowName(workflow: Workflow) {
    this.settingsService.editWorkflowName(workflow.Name).then(result => {
      if (result !== '') {
        const editedWorkflow = new Workflow(
          workflow.Id,
          result,
          null,
          null,
          []
        );

        this.isDisabled = true;
        this.settingsDataStorageService.editWorkflowName(editedWorkflow)
          .subscribe((data: any) => {
              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                workflow.Name = result;
                this.notifierService.notify('default',
                  'Workflow name updated successfully.');
              }
            });
      }
    });
  }

  deleteWorkflow(workflowId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Workflow')
      .then(result => {

      if (result.confirmationStatus) {

        this.settingsDataStorageService.deleteWorkflow(workflowId)
          .subscribe((response: any) => {
            this.isDisabled = false;

            if (response.statusText !== 'Success') {

              this.notifierService.notify('default', response.statusText);

            } else {
              this.workflows.splice(index, 1);
              this.notifierService.notify('default',
                'Workflow deleted successfully.');
            }

          });
      }

      this.isDisabled = false;

    }).catch();
  }



}
