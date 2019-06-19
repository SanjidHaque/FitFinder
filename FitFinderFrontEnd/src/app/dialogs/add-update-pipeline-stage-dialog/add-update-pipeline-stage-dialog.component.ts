import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-add-update-pipeline-stage',
  templateUrl: './add-update-pipeline-stage-dialog.component.html',
  styleUrls: ['./add-update-pipeline-stage-dialog.component.css']
})
export class AddUpdatePipelineStageDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUpdatePipelineStageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
