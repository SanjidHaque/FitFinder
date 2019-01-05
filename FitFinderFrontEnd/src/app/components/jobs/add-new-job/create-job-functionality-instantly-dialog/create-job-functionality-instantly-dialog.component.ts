import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-job-functionality-instantly-dialog',
  templateUrl: './create-job-functionality-instantly-dialog.component.html',
  styleUrls: ['./create-job-functionality-instantly-dialog.component.css']
})
export class CreateJobFunctionalityInstantlyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateJobFunctionalityInstantlyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
