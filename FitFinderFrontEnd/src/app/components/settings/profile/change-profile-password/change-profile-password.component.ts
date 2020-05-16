import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {Router} from '@angular/router';
import {ChangePassword} from '../../../../models/settings/change-password.model';
import {NotifierService} from 'angular-notifier';
import {PasswordErrorStateMatcher} from '../../../../custom-form-validators/password-error-state-matcher';

@Component({
  selector: 'app-change-profile-password',
  templateUrl: './change-profile-password.component.html',
  styleUrls: ['./change-profile-password.component.css']
})
export class ChangeProfilePasswordComponent implements OnInit {
  isDisabled = false;

  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;

  passwordErrorStateMatcher = new PasswordErrorStateMatcher();

  changeProfilePasswordForm: FormGroup;


  constructor(private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changeProfilePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }


  getOldPasswordConditionErrorMessage() {
    return this.changeProfilePasswordForm.controls['oldPassword']
      .hasError('required') ? 'You must enter your old password!' :
      this.changeProfilePasswordForm.controls['oldPassword']
        .hasError('minlength') ? 'Should be at least six characters long!' : '';
  }

  getNewPasswordConditionErrorMessage() {
    return this.changeProfilePasswordForm.controls['newPassword']
      .hasError('required') ? 'You must enter your new password!' :
      this.changeProfilePasswordForm.controls['newPassword']
        .hasError('minlength') ? 'Should be at least six characters long!' : '';
  }

  getConfirmNewPasswordConditionErrorMessage() {
    return this.changeProfilePasswordForm.controls['confirmNewPassword']
      .hasError('required') ? 'You must confirm your new password!' :
      this.changeProfilePasswordForm
        .hasError('notSame') ? 'Password do not match!' : '';
  }


  checkPasswords(group: FormGroup) {
    const newPassword = group.controls['newPassword'].value;
    const confirmNewPassword = group.controls['confirmNewPassword'].value;

    return newPassword === confirmNewPassword ? null : { notSame: true }
  }


  changeProfilePassword() {
    this.isDisabled = true;
    const changePassword = new ChangePassword(
      '',
      '',
      '',
      this.changeProfilePasswordForm.controls['oldPassword'].value,
      this.changeProfilePasswordForm.controls['newPassword'].value
    );


    this.userAccountDataStorageService.changeProfilePassword(changePassword)
      .subscribe( (data: any) => {
      if (data.statusText !== 'Success') {
        this.isDisabled = false;
        this.notifierService.notify('default',  data.statusText);
      } else {

        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        this.router.navigate(['sign-in']);
        this.notifierService.notify('default',  'Password changed successfully!');      }

    });


  }
}

