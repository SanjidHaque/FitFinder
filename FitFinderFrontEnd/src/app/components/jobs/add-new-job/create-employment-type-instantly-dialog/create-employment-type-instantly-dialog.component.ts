import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-employment-type-instantly-dialog',
  templateUrl: './create-employment-type-instantly-dialog.component.html',
  styleUrls: ['./create-employment-type-instantly-dialog.component.css']
})
export class CreateEmploymentTypeInstantlyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateEmploymentTypeInstantlyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
  }

}
