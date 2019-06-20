import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../../../models/user-account.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage/user-account-data-storage.service';
import {Company} from '../../../../models/company.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isDisabled = false;

  userAccounts: UserAccount[] = [];
  userAccount: UserAccount;
  company: Company;
  editProfileForm: FormGroup;

  constructor(private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {


  }

  ngOnInit() {
    const userName = JSON.parse(JSON.stringify(localStorage.getItem('userNameForSignIn')));
    this.route.data.subscribe(
      (data: Data) => {
        this.userAccounts = data['userAccounts'];
        this.company = data['company'];


        this.userAccount = this.userAccounts.find(x => x.UserName === userName);
        if (this.userAccount === undefined) {
          this.router.navigate(['/dashboard']);
          this.notifierService.notify('default', 'User not found.')
        }

      });


        this.editProfileForm = new FormGroup({
          'userName': new FormControl(this.userAccount.UserName, Validators.required),
          'fullName': new FormControl(this.userAccount.FullName),
          'email': new FormControl(this.userAccount.Email,
            [Validators.required, Validators.email]),
          'phoneNumber': new FormControl(this.userAccount.PhoneNumber, Validators.required),
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
        this.userAccount.Id,
        this.userAccount.CompanyId,
        this.userAccount.UserName,
        this.editProfileForm.controls['fullName'].value,
        this.editProfileForm.controls['email'].value,
        '',
        this.editProfileForm.controls['phoneNumber'].value,
        this.userAccount.JoiningDateTime,
       this.userAccount.RoleName,
        this.userAccount.IsOwner
      )
    ).subscribe( (data: any) => {
      if (data.Succeeded) {




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
