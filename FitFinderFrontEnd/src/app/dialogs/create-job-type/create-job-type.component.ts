import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-job-type',
  templateUrl: './create-job-type.component.html',
  styleUrls: ['./create-job-type.component.css']
})
export class CreateJobTypeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateJobTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
  }

}
