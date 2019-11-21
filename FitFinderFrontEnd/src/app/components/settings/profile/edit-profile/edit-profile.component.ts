import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../../../models/settings/user-account.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {Company} from '../../../../models/settings/company.model';
import {Department} from '../../../../models/settings/department.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isDisabled = false;
  departments: Department[] = [];
  currentUserAccount: UserAccount;
  company: Company;
  editProfileForm: FormGroup;

  constructor(private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {


  }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        this.currentUserAccount = data['currentUserAccount'];

        this.company = data['company'];
        this.departments = data['departments'];


        if (this.currentUserAccount === undefined) {
          this.router.navigate(['/sign-in']);
          this.notifierService.notify('default',  'User not found, sign-in again')
        }

      });


        this.editProfileForm = new FormGroup({
          'userName': new FormControl(this.currentUserAccount.UserName, Validators.required),
          'fullName': new FormControl(this.currentUserAccount.FullName),
          'email': new FormControl(this.currentUserAccount.Email,
            [Validators.required, Validators.email]),
          'phoneNumber': new FormControl(this.currentUserAccount.PhoneNumber, Validators.required),
          'departmentId': new FormControl(this.currentUserAccount.DepartmentId, Validators.required),
          'companyName': new FormControl(this.company.CompanyName, Validators.required),
          'companyPhoneNumber': new FormControl(this.company.CompanyPhoneNumber, Validators.required),
          'companyEmail': new FormControl(this.company.CompanyEmail, Validators.required),
          'companyAddress': new FormControl(this.company.CompanyAddress)
        });

        this.editProfileForm.controls['userName'].disable();




  }


  editUserAccount() {
    this.isDisabled = true;
    this.userAccountDataStorageService.editUserAccount(
      new UserAccount(
        this.currentUserAccount.Id,
        this.currentUserAccount.CompanyId,
        this.currentUserAccount.UserName,
        this.editProfileForm.controls['fullName'].value,
        this.editProfileForm.controls['email'].value,
        '',
        this.editProfileForm.controls['phoneNumber'].value,
        this.currentUserAccount.JoiningDateTime,
        this.currentUserAccount.RoleName,
        null,
        this.currentUserAccount.IsOwner,
      )
    ).subscribe( (data: any) => {
      if (data.Succeeded) {

        if (this.currentUserAccount.IsOwner) {

          this.userAccountDataStorageService.editCompany(
            new Company(
              null,
              this.editProfileForm.controls['companyName'].value,
              this.editProfileForm.controls['companyAddress'].value,
              this.editProfileForm.controls['companyEmail'].value,
              this.editProfileForm.controls['companyPhoneNumber'].value,
              '',
              this.editProfileForm.controls['fullName'].value,
              this.editProfileForm.controls['email'].value,
              this.editProfileForm.controls['phoneNumber'].value,
              ''
            )
          ).subscribe( (response: any) => {
            if ( response.statusText === 'Success' ) {

              this.notifierService.notify(
                'default',
                'Information updated.');
              this.router.navigate(['/settings/profile']);

            } else {

              this.notifierService.notify( 'default', 'Something went wrong.');
              this.isDisabled = false;

            }
          })
        } else {
          this.router.navigate(['settings/profile']);
        }


      } else {
        this.notifierService.notify( 'default', data.Errors[0]);
        this.isDisabled = false;
      }
    })
  }

  getEmailErrorMessage(formControlName: string) {
    return this.editProfileForm.controls[formControlName].hasError('required') ? 'You must enter an email' :
      this.editProfileForm.controls[formControlName].hasError('email') ? 'Not a valid email' :
        '';
  }

}
