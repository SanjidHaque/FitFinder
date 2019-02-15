import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AddUpdatePipelineStageComponent} from '../add-update-pipeline-stage/add-update-pipeline-stage.component';
import {PipelineStage} from '../../models/pipeline-stage.model';
import {DataStorageService} from '../../services/data-storage.service';
import {NotifierService} from 'angular-notifier';
import {AddUpdateComponent} from '../add-update/add-update.component';
import {PipelineStageCriteria} from '../../models/pipeline-stage-criteria.model';

@Component({
  selector: 'app-pipeline-stage-criteria',
  templateUrl: './pipeline-stage-criteria.component.html',
  styleUrls: ['./pipeline-stage-criteria.component.css']
})
export class PipelineStageCriteriaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PipelineStageCriteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataStorageService: DataStorageService,
    private dialog: MatDialog,
    private notifierService: NotifierService) {}

  ngOnInit() {

  }


  addNewPipelineStageCriteria() {
    const dialogRef = this.dialog.open(AddUpdateComponent,
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

        const pipelineStageCriteria = new PipelineStageCriteria(
          null,
          result,
          this.data.stage.Id
        );



        this.dataStorageService.addNewPipelineStageCriteria(pipelineStageCriteria)
          .subscribe(
            (newPipelineStageCriteria: PipelineStageCriteria) => {
              this.data.stage.PipelineStageCriteria.push(newPipelineStageCriteria);
              this.notifierService.notify('default', 'New criteria added!');
            }
          );
      }
    });
  }
  editPipelineStageCriteria(pipelineStageCriteria: PipelineStageCriteria) {
    const dialogRef = this.dialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '450px',
        data:
          {
            header: 'Edit Pipeline Criteria',
            name: pipelineStageCriteria.Name,
            iconClass: 'fas fa-flag-checkered',
            footer: 'Add or update different pipeline criteria your candidate needs.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '' && result !== pipelineStageCriteria.Name) {

        const editPipelineStageCriteria = new PipelineStageCriteria(
          pipelineStageCriteria.Id,
          result,
          pipelineStageCriteria.PipelineStageId
        );



        this.dataStorageService.editPipelineStageCriteria(editPipelineStageCriteria)
          .subscribe(
            (data: any) => {
              pipelineStageCriteria.Name = result;
              this.notifierService.notify('default', 'Criteria updated successfully!');
            }
          );
      }
    });
  }
}
