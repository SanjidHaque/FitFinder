import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {Router} from '@angular/router';
import {ChangePassword} from '../../../../models/change-password.model';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-change-profile-password',
  templateUrl: './change-profile-password.component.html',
  styleUrls: ['./change-profile-password.component.css']
})
export class ChangeProfilePasswordComponent implements OnInit {
  isDisabled = false;
  changeProfilePasswordForm: FormGroup;


  constructor( private userAccountDataStorageService: UserAccountDataStorageService,
               private notifierService: NotifierService,
               private router: Router) { }

  ngOnInit() {
    this.changeProfilePasswordForm = new FormGroup({
      'oldPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
        ]),
      'confirmNewPassword': new FormControl('', Validators.required),

    });
  }


  getPasswordConditionErrorMessage() {
    return this.changeProfilePasswordForm.controls['newPassword'].hasError('required') ? 'You must enter a password' :
      this.changeProfilePasswordForm.controls['newPassword'].hasError('pattern') ? 'Not a valid password' :
        '';
  }

  getPasswordMatchingErrorMessage() {
    if (this.changeProfilePasswordForm.controls['newPassword'].value !==
      this.changeProfilePasswordForm.controls['confirmNewPassword'].value) {
      return 'Passwords do not matched!';
    } else {
      return 'You must confirm your password!';
    }
  }

  changeProfilePassword() {
    this.isDisabled = true;
    this.userAccountDataStorageService.changeProfilePassword(
      new ChangePassword(
        this.changeProfilePasswordForm.controls['oldPassword'].value,
        this.changeProfilePasswordForm.controls['newPassword'].value
      )
    ).subscribe( (data: any) => {
      if (data === null || data === undefined) {
        this.isDisabled = false;
        this.notifierService.notify('default',  'Error! Something went wrong!');
      }

      if (data.Succeeded) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        this.router.navigate(['sign-in']);
        this.notifierService.notify('default',  'Password changed successfully! Sign in again.');
      } else {
        if (data.Errors[0] === 'Incorrect password') {
          this.notifierService.notify('default',  'Error! Old password is incorrect!');
        } else {
          this.notifierService.notify('default',  'Error! ' + data.Errors[0]);
        }
      }
    })
  }
}

