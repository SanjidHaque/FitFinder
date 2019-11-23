import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {AddUpdateDialogComponent} from '../add-update-dialog/add-update-dialog.component';
import { PipelineStageCriterion} from '../../models/settings/pipeline-stage-criterion.model';
import {SettingsDataStorageService} from '../../services/data-storage-services/settings-data-storage.service';

@Component({
  selector: 'app-pipeline-stage-criteria',
  templateUrl: './pipeline-stage-criteria-dialog.component.html',
  styleUrls: ['./pipeline-stage-criteria-dialog.component.css']
})
export class PipelineStageCriteriaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PipelineStageCriteriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingsDataStorageService: SettingsDataStorageService,
    private dialog: MatDialog,
    private notifierService: NotifierService) {}

  ngOnInit() {

  }


  addNewPipelineStageCriteria() {
    const dialogRef = this.dialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            header: 'New Pipeline Criteria',
            name: '',
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different pipeline criteria your candidate needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '') {

        const pipelineStageCriteria = new PipelineStageCriterion(
          null,
          result,
          this.data.stage.Id,
          null,
          null,
          null
        );


        if (this.data.editMode) {

          this.settingsDataStorageService.addNewPipelineStageCriteria(pipelineStageCriteria)
            .subscribe(
              (newPipelineStageCriterion: PipelineStageCriterion) => {

                if (this.data.stage.PipelineStageCriteria === null) {
                  this.data.stage.PipelineStageCriteria = [];
                }

                this.data.stage.PipelineStageCriteria.push(newPipelineStageCriterion);
                this.notifierService.notify('default', 'New criteria added!');
              }
            );
        } else {
          if (this.data.stage.PipelineStageCriteria === null) {
            this.data.stage.PipelineStageCriteria = [];
          }

          this.data.stage.PipelineStageCriteria.push(pipelineStageCriteria);
          this.notifierService.notify('default', 'New criteria added!');
        }


      }
    });
  }
  editPipelineStageCriteria(pipelineStageCriterion: PipelineStageCriterion) {
    const dialogRef = this.dialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            header: 'Edit Pipeline Criteria',
            name: pipelineStageCriterion.Name,
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different pipeline criteria your candidate needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '' && result !== pipelineStageCriterion.Name) {

        const editPipelineStageCriterion = new PipelineStageCriterion(
          pipelineStageCriterion.Id,
          result,
          null,
          pipelineStageCriterion.PipelineStageId,
          null,
          null
        );


        if (this.data.editMode) {

          this.settingsDataStorageService.editPipelineStageCriterion(editPipelineStageCriterion)
            .subscribe(
              (data: any) => {
                pipelineStageCriterion.Name = result;
                this.notifierService.notify('default', 'Criteria updated successfully!');
              }
            );

        } else {

          pipelineStageCriterion.Name = result;
          this.notifierService.notify('default', 'Criteria updated successfully!');

        }

      }
    });
  }
}
