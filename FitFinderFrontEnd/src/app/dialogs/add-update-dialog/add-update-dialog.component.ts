import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css']
})
export class AddUpdateDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
