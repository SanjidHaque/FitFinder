import { Component, OnInit } from '@angular/core';
import {Pipeline} from '../../../../models/pipeline.model';
import {SettingsService} from '../../../../services/settings.service';
import {ActivatedRoute, Data} from '@angular/router';
import {PipelineStage} from '../../../../models/pipeline-stage.model';
import {DataStorageService} from '../../../../services/data-storage.service';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {AddUpdateComponent} from '../../../../dialogs/add-update/add-update.component';
import {JobType} from '../../../../models/job-type.model';
import {AddUpdatePipelineStageComponent} from '../../../../dialogs/add-update-pipeline-stage/add-update-pipeline-stage.component';
import {PipelineStageCriteriaComponent} from '../../../../dialogs/pipeline-stage-criteria/pipeline-stage-criteria.component';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {

  pipelines: Pipeline[] = [];

  constructor(private sharedService: SettingsService,
              private dataStorageService: DataStorageService,
              private dialog: MatDialog,
              private notifierService: NotifierService) {}

  ngOnInit() {
   this.pipelines = this.sharedService.getAllPipeline();
  }

  addNewPipelineStage(pipelineId: number) {
    const dialogRef = this.dialog.open(AddUpdatePipelineStageComponent,
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

       /* const getPipelineStage = this.pipelines.find(x => x.Id === pipelineId).PipelineStage;*/

        this.dataStorageService.addNewPipelineStage(pipelineStage)
          .subscribe(
            (data: any) => {
              this.dataStorageService.getAllPipeline().
                subscribe(
                (pipelines: any) => {
                  this.pipelines = pipelines;
                  this.notifierService.notify('default', 'New stage added!');
                }
              );

            }
          );
      }
    });
  }

  editPipelineStage(pipelineStage: PipelineStage) {
    const dialogRef = this.dialog.open(AddUpdatePipelineStageComponent,
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


          this.dataStorageService.editPipelineStage(editedPipelineStage)
            .subscribe(
              (data: any) => {
                pipelineStage.Name = result.name;
                pipelineStage.Color = result.color;
                this.notifierService.notify('default', 'Stage updated successfully!');
              }
            );
        }
      }

    });
  }


  pipelineStageCriteria(pipelineStage: PipelineStage) {
    const dialogRef = this.dialog.open(PipelineStageCriteriaComponent,
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
}
