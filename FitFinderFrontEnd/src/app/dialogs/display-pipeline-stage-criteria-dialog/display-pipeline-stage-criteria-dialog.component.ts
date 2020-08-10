import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotifierService} from 'angular-notifier';
import {PipelineStageCriterion} from '../../models/settings/pipeline-stage-criterion.model';
import {SettingsDataStorageService} from '../../services/data-storage-services/settings-data-storage.service';
import {SettingsService} from '../../services/shared-services/settings.service';

@Component({
  selector: 'app-display-pipeline-stage-criteria',
  templateUrl: './display-pipeline-stage-criteria-dialog.component.html',
  styleUrls: ['./display-pipeline-stage-criteria-dialog.component.css']
})
export class DisplayPipelineStageCriteriaDialogComponent {
  isDisabled = false;

  constructor(public dialogRef: MatDialogRef<DisplayPipelineStageCriteriaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private settingsDataStorageService: SettingsDataStorageService,
              private dialog: MatDialog,
              private settingsService: SettingsService,
              private notifierService: NotifierService) {

    if (this.data.stage.PipelineStageCriteria === null) {
      this.data.stage.PipelineStageCriteria = [];
    }
  }


  addNewPipelineStageCriterion() {
    this.settingsService.addNewPipelineStageCriterion().then(result => {

      if (result !== '') {

        const pipelineStageCriterion = new PipelineStageCriterion(
          null,
          result,
          null,
          this.data.stage.Id,
          null,
          null
        );


        if (this.data.insertInDatabase) {

          this.settingsDataStorageService.addNewPipelineStageCriterion(pipelineStageCriterion)
            .subscribe(
              (data: any) => {

                if (data.statusText !== 'Success') {
                  this.notifierService.notify('default', data.statusText);
                } else {

                  this.data.stage.PipelineStageCriteria.push(data.pipelineStageCriterion);
                  this.notifierService
                    .notify('default', 'New pipeline stage criterion added.');

                }

              }
            );
        } else {

          this.data.stage.PipelineStageCriteria.push(pipelineStageCriterion);
          this.notifierService
            .notify('default', 'New pipeline stage criterion added.');
        }


      }
    });
  }


  editPipelineStageCriterion(pipelineStageCriterion: PipelineStageCriterion) {
    this.settingsService.editPipelineStageCriterion(pipelineStageCriterion.Name)
      .then(result => {

        this.isDisabled = true;

        if (result !== '' && result !== pipelineStageCriterion.Name) {

          const editPipelineStageCriterion = new PipelineStageCriterion(
            pipelineStageCriterion.Id,
            result,
            null,
            pipelineStageCriterion.PipelineStageId,
            null,
            null
          );


          if (this.data.insertInDatabase) {

            this.settingsDataStorageService.editPipelineStageCriterion(editPipelineStageCriterion)
              .subscribe(
                (data: any) => {
                  this.isDisabled = false;
                  if (data.statusText !== 'Success') {
                    this.notifierService.notify('default', data.statusText);
                  } else {
                    pipelineStageCriterion.Name = result;
                    this.notifierService
                      .notify('default', 'Pipeline stage criterion updated successfully.');
                  }
                }
              );

          } else {
            this.isDisabled = false;
            pipelineStageCriterion.Name = result;
            this.notifierService
              .notify('default', 'Pipeline stage criterion updated successfully.');

          }

        }
      });
  }


  deletePipelineStageCriterion(pipelineStageCriterionId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Pipeline Stage Criterion')
      .then(result => {

      if (result.confirmationStatus) {
        if (this.data.insertInDatabase) {

          this.settingsDataStorageService.deletePipelineStageCriterion(pipelineStageCriterionId)
            .subscribe(
              (data: any) => {
                this.isDisabled = false;
                if (data.statusText !== 'Success') {
                  this.notifierService.notify('default', data.statusText);
                } else {
                  this.data.stage.PipelineStageCriteria.splice(index, 1);
                  this.notifierService
                    .notify('default', 'Pipeline stage criterion deleted successfully.');
                }
              }
            );

        } else {
          this.isDisabled = false;
          this.data.stage.PipelineStageCriteria.splice(index, 1);
          this.notifierService
            .notify('default', 'Pipeline stage criterion deleted successfully.');

        }

      }

      this.isDisabled = false;

    }).catch();
  }


}
