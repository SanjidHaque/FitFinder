import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
  }

}
