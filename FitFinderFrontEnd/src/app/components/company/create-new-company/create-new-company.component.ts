import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Company} from '../../../models/company.model';
import {NgForm} from '@angular/forms';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-create-new-company',
  templateUrl: './create-new-company.component.html',
  styleUrls: ['./create-new-company.component.css']
})
export class CreateNewCompanyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateNewCompanyComponent>) {}

  ngOnInit() {
  }


  getNewCompanyData(form: NgForm) {
    const company = new Company( UUID.UUID() , form.value.name, form.value.address, []);
    return company;
  }


}
