import { Component, OnInit } from '@angular/core';
import {JobDataStorageService} from '../../../services/data-storage-services/job-data-storage.service';
import {ActivatedRoute, Data} from '@angular/router';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {Workflow} from '../../../models/settings/workflow.model';
import {AddUpdateDialogComponent} from '../../../dialogs/add-update-dialog/add-update-dialog.component';
import {MatDialog} from '@angular/material';
import {AddNewWorkflowDialogComponent} from '../../../dialogs/add-new-workflow-dialog/add-new-workflow-dialog.component';
import {FormGroup} from '@angular/forms';
import {SettingsService} from '../../../services/shared-services/settings.service';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {

  defaultWorkflow: Workflow;
  defaultWorkflowCopy: Workflow;
  workflowName = '';
  defaultPipelines = [];

  p = [];
  c= [];

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     this.defaultWorkflow = data['defaultWorkflow'];
    //     this.settingsService.defaultWorkflow = this.defaultWorkflow;
    //
    //   }
    // );


  //  this.defaultPipelines = this.settingsService.getDefaultPipelines();
  }

  addNewWorkflow() {
    const dialogRef = this.dialog.open(AddNewWorkflowDialogComponent,

      {
        hasBackdrop: true,
        disableClose: true,
        width: '900px',
        data:
          {
            workflowName: this.workflowName,
            defaultPipelines:  this.defaultPipelines
          }
      },

      );


    dialogRef.afterClosed().subscribe(result => {




      if (result === '')  {
     //   console.log('ES');
       // console.log(this.settingsService.defaultWorkflow);
        return;


      } else {
    //    console.log(result);
        console.log(this.p);

       // console.log(result);
       // console.log(this.workflowName);

      }






    });


  }



}
