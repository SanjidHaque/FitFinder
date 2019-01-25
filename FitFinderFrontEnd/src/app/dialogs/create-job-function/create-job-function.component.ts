import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-job-function',
  templateUrl: './create-job-function.component.html',
  styleUrls: ['./create-job-function.component.css']
})
export class CreateJobFunctionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateJobFunctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
