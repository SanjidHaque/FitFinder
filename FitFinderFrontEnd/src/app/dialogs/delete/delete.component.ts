import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  cancelClick() {
    this.data.confirmationStatus = false;
    this.dialogRef.close(this.data);
  }

  confirmClick() {
    this.data.confirmationStatus = true;
    this.dialogRef.close(this.data);
  }

}
