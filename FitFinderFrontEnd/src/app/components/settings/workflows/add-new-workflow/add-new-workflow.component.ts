import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Workflow} from '../../../../models/settings/workflow.model';
import {PipelineStage} from '../../../../models/settings/pipeline-stage.model';
import {DisplayPipelineStageCriteriaDialogComponent} from '../../../../dialogs/display-pipeline-stage-criteria-dialog/display-pipeline-stage-criteria-dialog.component';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {SettingsDataStorageService} from '../../../../services/data-storage-services/settings-data-storage.service';
import {SettingsService} from '../../../../services/shared-services/settings.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {noWhitespaceValidator} from '../../../../custom-form-validators/no-white-space.validator';

@Component({
  selector: 'app-add-new-workflow',
  templateUrl: './add-new-workflow.component.html',
  styleUrls: ['./add-new-workflow.component.css']
})
export class AddNewWorkflowComponent implements OnInit {
  defaultWorkflow: Workflow;

  isDisabled = false;
  addNewWorkflowForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              private settingsService: SettingsService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.defaultWorkflow = data['defaultWorkflow'].workflow;
      });

    this.addNewWorkflowForm = new FormGroup({
      'workflowName': new FormControl('',
        [Validators.required, noWhitespaceValidator])
    });
  }


  addNewPipelineStage(pipelineId: number) {
    this.settingsService.addNewPipelineStage().then(result => {
      if (result !== '') {

        const pipelineStage = new PipelineStage(
          null,
          result.name,
          result.color,
          null,
          pipelineId,
          null
        );

        const pipeline = this.defaultWorkflow.Pipelines
          .find(x => x.Id === pipelineId);

        if (pipeline === undefined) {
          this.notifierService.notify('default', 'Something went wrong!');
        } else {
          pipeline.PipelineStages.push(pipelineStage);
          this.notifierService.notify('default', 'New pipeline stage added.');
        }
      }
    });
  }


  editPipelineStage(pipelineStage: PipelineStage) {
    this.settingsService.editPipelineStage(pipelineStage.Name, pipelineStage.Color)
      .then(result => {
        if ((result !== '')
          && (result.name !== pipelineStage.Name || result.color !== pipelineStage.Color)) {
          const editedPipelineStage = new PipelineStage(
            pipelineStage.Id,
            result.name,
            result.color,
            null,
            pipelineStage.PipelineId,
            []
          );
          pipelineStage.Name = result.name;
          pipelineStage.Color = result.color;
          this.notifierService
            .notify('default', 'pipeline stage updated successfully.');
        }
      });
  }

  deletePipelineStage(pipelineId: number, pipelineStageId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deletePipelineStage().then(result => {

      if (result.confirmationStatus) {

        const pipeline = this.defaultWorkflow.Pipelines
          .find(x => x.Id === pipelineId);

        if (pipeline === undefined) {
          this.notifierService.notify('default', 'Something went wrong!');
          return;
        }

        pipeline.PipelineStages.splice(index, 1);
        this.notifierService
          .notify('default', 'Pipeline stage deleted successfully.');
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
            insertInDatabase: false
          }
      });
  }


  addNewWorkflow() {
    this.isDisabled = true;
    this.defaultWorkflow.Name = this.addNewWorkflowForm.controls['workflowName'].value;

    this.settingsDataStorageService.addNewWorkflow(this.defaultWorkflow)
      .subscribe((data: any) => {
        if (data.statusText !== 'Success') {
          this.isDisabled = false;
          this.notifierService.notify('default', data.statusText);
        } else {
          this.notifierService.notify('default', 'New workflow added.');
          this.router.navigate(['/settings/workflows']);
        }
      });
  }

}
