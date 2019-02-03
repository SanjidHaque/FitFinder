import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-add-update-pipeline-stage',
  templateUrl: './add-update-pipeline-stage.component.html',
  styleUrls: ['./add-update-pipeline-stage.component.css']
})
export class AddUpdatePipelineStageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUpdatePipelineStageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
