import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Company} from '../../../models/company.model';

@Component({
  selector: 'app-create-new-company',
  templateUrl: './create-new-company.component.html',
  styleUrls: ['./create-new-company.component.css']
})
export class CreateNewCompanyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateNewCompanyComponent>) {}

  ngOnInit() {
  }

  getNewCompanyData() {
    const company = new Company('12', 'Test', '89/A', []);
    return company;
  }
  closeCreateNewCompanyDialog() {
    this.dialogRef.close();
  }

}
