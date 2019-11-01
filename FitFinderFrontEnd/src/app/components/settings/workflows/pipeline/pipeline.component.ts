import { Component, OnInit } from '@angular/core';
import {Pipeline} from '../../../../models/pipeline.model';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {PipelineStage} from '../../../../models/pipeline-stage.model';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {AddUpdateDialogComponent} from '../../../../dialogs/add-update-dialog/add-update-dialog.component';
import {JobType} from '../../../../models/job-type.model';
import {AddUpdatePipelineStageDialogComponent} from '../../../../dialogs/add-update-pipeline-stage-dialog/add-update-pipeline-stage-dialog.component';
import {PipelineStageCriteriaDialogComponent} from '../../../../dialogs/pipeline-stage-criteria-dialog/pipeline-stage-criteria-dialog.component';
import {Workflow} from '../../../../models/workflow.model';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {

  pipelines: Pipeline[] = [];
  workflow: Workflow;

  constructor(private settingsDataStorageService: SettingsDataStorageService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private adialog: MatDialog,
              private notifierService: NotifierService) {}

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {

        this.workflow = data['workflow'];
      }
    );
  }

  addNewPipelineStage(pipelineId: number) {
    const dialogRef = this.dialog.open(AddUpdatePipelineStageDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            header: 'New Pipeline Stage',
            name: '',
            color: '#' + (Math.random().toString(16) + '000000').substring(2, 8),
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different pipeline stages your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== '') {
        const pipelineStage = new PipelineStage(
          null,
          result.name,
          result.color,
          pipelineId,
          []
        );

        const getPipeline = this.workflow.Pipelines.find(x => x.Id === pipelineId);

        this.settingsDataStorageService.addNewPipelineStage(pipelineStage)
          .subscribe(
            (newPipelineStage: PipelineStage) => {
              getPipeline.PipelineStage.push(newPipelineStage);
              this.notifierService.notify('default', 'New stage added.');
            }
          );
      }
    });
  }

  editPipelineStage(pipelineStage: PipelineStage) {
    const dialogRef = this.dialog.open(AddUpdatePipelineStageDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            header: 'Edit Pipeline Stage',
            name: pipelineStage.Name,
            color: pipelineStage.Color,
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different pipeline stages your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        if (result.name !== pipelineStage.Name || result.color !== pipelineStage.Color ) {
          const editedPipelineStage = new PipelineStage(
            pipelineStage.Id,
            result.name,
            result.color,
            pipelineStage.PipelineId,
            []
          );


          this.settingsDataStorageService.editPipelineStage(editedPipelineStage)
            .subscribe(
              (data: any) => {
                pipelineStage.Name = result.name;
                pipelineStage.Color = result.color;
                this.notifierService.notify('default',
                  'Stage updated successfully.');
              }
            );
        }
      }

    });
  }


  pipelineStageCriteria(pipelineStage: PipelineStage) {
    const dialogRef = this.dialog.open(PipelineStageCriteriaDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '650px',
        data:
          {
            iconClass: 'fas fa-flag-checkered',
            stage: pipelineStage,
            editMode: true
          }
      });
  }


  editWorkflowName() {
    const dialogRef = this.adialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data:
          {
            header: 'Edit Workflow Name',
            name: this.workflow.Name,
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different workflows your organization needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== this.workflow.Name && result !== '') {

        const editedWorkflow = new Workflow(
          this.workflow.Id,
          result,
          null,
          []
        );

        this.settingsDataStorageService.editWorkflowName(editedWorkflow)
          .subscribe(
            (data: any) => {
              this.workflow.Name = result;
              this.notifierService.notify('default', 'Workflow name updated.');
            }
          );

      }
    });
  }
}
