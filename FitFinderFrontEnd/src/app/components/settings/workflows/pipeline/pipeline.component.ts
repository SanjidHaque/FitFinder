import { Component, OnInit } from '@angular/core';
import {Pipeline} from '../../../../models/settings/pipeline.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {PipelineStage} from '../../../../models/settings/pipeline-stage.model';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {DisplayPipelineStageCriteriaDialogComponent} from '../../../../dialogs/display-pipeline-stage-criteria-dialog/display-pipeline-stage-criteria-dialog.component';
import {Workflow} from '../../../../models/settings/workflow.model';
import {SettingsService} from '../../../../services/shared-services/settings.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {
  isDisabled = false;
  pipelines: Pipeline[] = [];
  workflow: Workflow;

  constructor(private settingsDataStorageService: SettingsDataStorageService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              public settingsService: SettingsService,
              private notifierService: NotifierService) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.workflow = data['workflow'].workflow;
      });
  }

  addNewPipelineStage(pipelineId: number) {

    this.settingsService.addNewPipelineStage().then(result => {
      this.isDisabled = true;

      if (result !== '') {
        const pipelineStage = new PipelineStage(
          null,
          result.name,
          result.color,
          null,
          pipelineId,
          []
        );

        const getPipeline =
          this.workflow.Pipelines.find(x => x.Id === pipelineId);

        this.settingsDataStorageService.addNewPipelineStage(pipelineStage)
          .subscribe(
            (data: any) => {

              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);

              } else {

                if (getPipeline === undefined) {
                  this.notifierService.notify('default',
                    'Something went wrong!');
                  return;
                }

                getPipeline.PipelineStages.push(data.pipelineStage);
                this.notifierService.notify('default',
                  'New pipeline stage added.');
              }

            });
      }
    }).catch();
  }

  editPipelineStage(pipelineStage: PipelineStage) {

    this.settingsService.editPipelineStage(pipelineStage.Name, pipelineStage.Color)
      .then(result => {
        if ((result !== '')
          && (result.name !== pipelineStage.Name || result.color !== pipelineStage.Color)) {

          this.isDisabled = true;
          const editedPipelineStage = new PipelineStage(
            pipelineStage.Id,
            result.name,
            result.color,
            null,
            pipelineStage.PipelineId,
            []
          );


          this.settingsDataStorageService.editPipelineStage(editedPipelineStage)
            .subscribe(
              (data: any) => {

                if (data.statusText !== 'Success') {

                  this.notifierService.notify('default', data.statusText);

                } else {

                  pipelineStage.Name = result.name;
                  pipelineStage.Color = result.color;
                  this.notifierService.notify('default',
                    'Pipeline stage updated successfully.');
                }
              });
        }
      }).catch();
  }


  openPipelineStageCriteria(pipelineStage: PipelineStage) {
    const dialogRef = this.dialog.open(DisplayPipelineStageCriteriaDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '650px',
        data:
          {
            iconClass: 'fas fa-flag-checkered',
            stage: pipelineStage,
            insertInDatabase: true
          }
      });
  }


  editWorkflowName() {
    this.settingsService.editWorkflowName(this.workflow.Name).then(result => {
      if (result !== '') {
        const workflow = new Workflow(
          this.workflow.Id,
          result,
          null,
          null,
          []
        );

        this.isDisabled = true;
        this.settingsDataStorageService.editWorkflowName(workflow)
          .subscribe((data: any) => {

            this.isDisabled = false;

            if (data.statusText !== 'Success') {

              this.notifierService.notify('default', data.statusText);

            } else {

              workflow.Name = result;
              this.notifierService.notify('default',
                'Workflow pipelineStageName updated successfully.');

            }
          });
      }
    }).catch();
  }


  deletePipelineStage(pipelineId: number, pipelineStageId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Pipeline Stage')
      .then(result => {

      if (result.confirmationStatus) {

        this.settingsDataStorageService.deletePipelineStage(pipelineStageId)
          .subscribe((response: any) => {
            this.isDisabled = false;

            if (response.statusText !== 'Success') {

              this.notifierService.notify('default', response.statusText);

            } else {

              const pipeline = this.workflow.Pipelines
                .find(x => x.Id === pipelineId);

              if (pipeline === undefined) {
                this.notifierService.notify('default', 'Something went wrong!');
                return;
              }

              pipeline.PipelineStages.splice(index, 1);
              this.notifierService
                .notify('default', 'Pipeline stage deleted successfully.');
            }

          });
      }

      this.isDisabled = false;

    }).catch();
  }

  deleteWorkflow() {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Workflow')
      .then(result => {

      if (result.confirmationStatus) {

        this.settingsDataStorageService.deleteWorkflow(this.workflow.Id)
          .subscribe((response: any) => {
            this.isDisabled = false;

            if (response.statusText !== 'Success') {

              this.notifierService.notify('default', response.statusText);


            } else {
              this.router.navigate(['/settings/workflows']);
              this.notifierService.notify('default',
                'Workflow deleted successfully.');
            }

          });
      }

      this.isDisabled = false;

    }).catch();
  }
}
