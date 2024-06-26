import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {Company} from '../../../../models/settings/company.model';
import {UserAccount} from '../../../../models/settings/user-account.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrls: ['./add-new-company.component.css']
})
export class AddNewCompanyComponent implements OnInit {
  isDisabled = false;
  addNewCompanyForm: FormGroup;

  constructor(private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private router: Router) { }

  ngOnInit() {
    this.addNewCompanyForm = new FormGroup({
      'companyName': new FormControl('', Validators.required),
      'companyEmail': new FormControl('', [Validators.required, Validators.email]),
      'companyPhoneNumber': new FormControl('', Validators.required),
      'companyAddress': new FormControl(''),
      'adminUserName': new FormControl('', Validators.required),
      'adminFullName': new FormControl(''),
      'adminEmail': new FormControl('', [Validators.required, Validators.email]),
      'adminPhoneNumber': new FormControl('', Validators.required)
    });
  }


  getEmailErrorMessage(formControlName: string) {
    return this.addNewCompanyForm.controls[formControlName].hasError('required') ? 'You must enter an email' :
      this.addNewCompanyForm.controls[formControlName].hasError('email') ? 'Not a valid email' :
        '';
  }


  addNewCompany() {

    const company = new Company(
      null,
      this.addNewCompanyForm.controls['companyName'].value,
      this.addNewCompanyForm.controls['companyAddress'].value,
      this.addNewCompanyForm.controls['companyEmail'].value,
      this.addNewCompanyForm.controls['companyPhoneNumber'].value,
      this.addNewCompanyForm.controls['adminUserName'].value,
      this.addNewCompanyForm.controls['adminFullName'].value,
      this.addNewCompanyForm.controls['adminEmail'].value,
      this.addNewCompanyForm.controls['adminPhoneNumber'].value,
      moment().format('h:mm:ss A, Do MMMM YYYY'),
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    );

    const userAccount = new UserAccount(
      null,
      company,
      null,
      this.addNewCompanyForm.controls['adminUserName'].value,
      this.addNewCompanyForm.controls['adminFullName'].value,
      this.addNewCompanyForm.controls['adminEmail'].value,
      '',
      this.addNewCompanyForm.controls['adminPhoneNumber'].value,
      moment().format('h:mm:ss A, Do MMMM YYYY'),
      'HR',
      null,
      null,
      true
    );

    this.isDisabled = true;
    this.userAccountDataStorageService.addNewUserAccount(userAccount)
      .subscribe((data: any) => {

        if (data.statusText !== 'Success') {

          this.isDisabled = false;
          this.notifierService.notify('default', data.statusText);
        } else {

          this.notifierService.notify(
            'default', 'New company created. Check corresponded email.');
          this.router.navigate(['/settings/manage-companies', data.companyId]);

        }
      });
  }
}
