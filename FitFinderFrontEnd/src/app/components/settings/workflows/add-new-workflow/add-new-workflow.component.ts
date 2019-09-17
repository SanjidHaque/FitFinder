import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Workflow} from '../../../../models/workflow.model';
import {AddUpdatePipelineStageDialogComponent} from '../../../../dialogs/add-update-pipeline-stage-dialog/add-update-pipeline-stage-dialog.component';
import {PipelineStage} from '../../../../models/pipeline-stage.model';
import {PipelineStageCriteriaDialogComponent} from '../../../../dialogs/pipeline-stage-criteria-dialog/pipeline-stage-criteria-dialog.component';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {SettingsDataStorageService} from '../../../../services/data-storage/settings-data-storage.service';

@Component({
  selector: 'app-add-new-workflow',
  templateUrl: './add-new-workflow.component.html',
  styleUrls: ['./add-new-workflow.component.css']
})
export class AddNewWorkflowComponent implements OnInit {
  defaultWorkflow: Workflow;

  isDisabled = false;

  workflowName = '';

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        this.defaultWorkflow = data['defaultWorkflow'];
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

      if (result !== '') {

        const pipelineStage = new PipelineStage(
          null,
          result.name,
          result.color,
          pipelineId,
          null
        );

        const getPipeline = this.defaultWorkflow.Pipelines.find(x => x.Id === pipelineId);
        getPipeline.PipelineStage.push(pipelineStage);
        this.notifierService.notify('default', 'New stage added.');


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
            editMode: false
          }
      });
  }


  addNewWorkflow() {

    this.isDisabled = true;
    this.defaultWorkflow.Name = this.workflowName;


    this.settingsDataStorageService.addNewWorkflow(this.defaultWorkflow)
      .subscribe( (data: any) => {

        this.notifierService.notify('default', 'New workflow added.');
        this.router.navigate(['/settings/workflows']);



      });


  }



}
