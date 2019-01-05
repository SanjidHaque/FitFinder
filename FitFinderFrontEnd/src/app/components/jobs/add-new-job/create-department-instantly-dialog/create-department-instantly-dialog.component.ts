import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-department-instantly-dialog',
  templateUrl: './create-department-instantly-dialog.component.html',
  styleUrls: ['./create-department-instantly-dialog.component.css']
})
export class CreateDepartmentInstantlyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateDepartmentInstantlyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
  }

}
