import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-source',
  templateUrl: './create-source.component.html',
  styleUrls: ['./create-source.component.css']
})
export class CreateSourceComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateSourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
  }

}
