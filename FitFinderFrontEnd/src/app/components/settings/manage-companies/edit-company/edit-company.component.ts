import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../models/settings/company.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import * as moment from 'moment';
import {UserAccount} from '../../../../models/settings/user-account.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  isDisabled = false;

  editCompanyForm: FormGroup;
  companyId: number;

  company: Company;
  companies: Company[] = [];


  constructor(private router: Router,
              private notifierService: NotifierService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private route: ActivatedRoute) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.companyId = +params['id'];
        }
      );
  }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        // this.companies = data['companies'];
        this.company = data['company'];

        if (this.company === undefined) {
          this.router.navigate(['/settings/manage-companies']);
          this.notifierService.notify('default',  'Company not found.')
        }
      }
    );


    this.editCompanyForm = new FormGroup({
      'companyName': new FormControl(this.company.CompanyName, Validators.required),
      'companyEmail': new FormControl(this.company.CompanyEmail, [Validators.required, Validators.email]),
      'companyPhoneNumber': new FormControl(this.company.CompanyPhoneNumber, Validators.required),
      'companyAddress': new FormControl(this.company.CompanyAddress),
      'adminUserName': new FormControl(this.company.AdminUserName, Validators.required),
      'adminFullName': new FormControl(this.company.AdminFullName),
      'adminEmail': new FormControl(this.company.AdminEmail, [Validators.required, Validators.email]),
      'adminPhoneNumber': new FormControl(this.company.CompanyPhoneNumber, Validators.required)
    });

    this.editCompanyForm.controls['adminUserName'].disable();
  }


  getEmailErrorMessage(formControlName: string) {
    return this.editCompanyForm.controls[formControlName].hasError('required') ? 'You must enter an email' :
      this.editCompanyForm.controls[formControlName].hasError('email') ? 'Not a valid email' :
        '';
  }

  editCompany() {
    this.isDisabled = true;
    this.userAccountDataStorageService.editUserAccount(
      new UserAccount(
        null,
        null,
        this.companyId,
        this.company.AdminUserName,
        this.editCompanyForm.controls['adminFullName'].value,
        this.editCompanyForm.controls['adminEmail'].value,
        '',
        this.editCompanyForm.controls['adminPhoneNumber'].value,
        '',
        'HR',
        null,
        1,
        true
      )
    ).subscribe((data: any) => {

        if (data.Succeeded) {

          this.userAccountDataStorageService.editCompany(
            new Company(
              this.companyId,
              this.editCompanyForm.controls['companyName'].value,
              this.editCompanyForm.controls['companyAddress'].value,
              this.editCompanyForm.controls['companyEmail'].value,
              this.editCompanyForm.controls['companyPhoneNumber'].value,
              '',
              this.editCompanyForm.controls['adminFullName'].value,
              this.editCompanyForm.controls['adminEmail'].value,
              this.editCompanyForm.controls['adminPhoneNumber'].value,
              '',
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
            )
          ).subscribe( (response: any) => {
            if ( response.statusText === 'Success' ) {

              this.notifierService.notify(
                'default',
                'Information updated.');
              this.router.navigate(['/settings/manage-companies']);

            } else {

              this.notifierService.notify( 'default', 'Something went wrong.');
              this.isDisabled = false;

            }
          })
        } else {
          this.notifierService.notify( 'default', data.Errors[0]);
          this.isDisabled = false;
        }
      }
    )
  }

}
