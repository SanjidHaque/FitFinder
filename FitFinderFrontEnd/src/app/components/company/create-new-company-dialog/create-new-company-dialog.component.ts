import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Company} from '../../../models/company.model';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-create-new-company-dialog',
  templateUrl: './create-new-company-dialog.component.html',
  styleUrls: ['./create-new-company-dialog.component.css']
})
export class CreateNewCompanyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateNewCompanyDialogComponent>) {}

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter an email' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getNewCompanyData(form: NgForm) {
    const company = new Company(
      UUID.UUID(),
      form.value.name,
      form.value.address,
      this.email.value,
      []);
    return company;
  }

  closeDialog() {
    this.dialogRef.close();
  }


}