import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pipeline} from '../../models/pipeline.model';
import {FormGroup} from '@angular/forms';
import {AddUpdatePipelineStageDialogComponent} from '../add-update-pipeline-stage-dialog/add-update-pipeline-stage-dialog.component';
import {PipelineStage} from '../../models/pipeline-stage.model';
import {NotifierService} from 'angular-notifier';
import {PipelineStageCriteriaDialogComponent} from '../pipeline-stage-criteria-dialog/pipeline-stage-criteria-dialog.component';

@Component({
  selector: 'app-add-new-workflow-dialog',
  templateUrl: './add-new-workflow-dialog.component.html',
  styleUrls: ['./add-new-workflow-dialog.component.css']
})
export class AddNewWorkflowDialogComponent implements OnInit {
  addNewWorkflowForm: FormGroup;
  pipelines: Pipeline[] = [];

  constructor(public dialogRef: MatDialogRef<AddNewWorkflowDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private notifierService: NotifierService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.pipelines = this.data.defaultPipelines;
  }

  close() {
     this.dialogRef.close(this.data.defaultWorkflow);
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

      if (result !== '') {

        const pipelineStage = new PipelineStage(
          null,
          result.name,
          result.color,
          pipelineId,
          null
        );

        const getPipeline = this.data.defaultPipelines.find(x => x.Id === pipelineId);
        getPipeline.PipelineStage.push(pipelineStage);
        this.notifierService.notify('default', 'New stage added.');


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
            stage: pipelineStage
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
          pipelineStage.Name = result.name;
          pipelineStage.Color = result.color;
          this.notifierService.notify('default',
            'Stage updated successfully.');

          // this.settingsDataStorageService.editPipelineStage(editedPipelineStage)
          //   .subscribe(
          //     (data: any) => {
          //       pipelineStage.Name = result.name;
          //       pipelineStage.Color = result.color;
          //       this.notifierService.notify('default',
          //         'Stage updated successfully.');
          //     }
          //   );
        }
      }

    });
  }


}
