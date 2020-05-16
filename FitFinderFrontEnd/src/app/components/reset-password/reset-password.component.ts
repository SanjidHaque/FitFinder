import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../services/data-storage-services/user-account-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {ChangePassword} from '../../models/settings/change-password.model';
import {PasswordErrorStateMatcher} from '../../custom-form-validators/password-error-state-matcher';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isDisabled = false;

  hideNewPassword = true;
  hideConfirmNewPassword = true;
  resetPasswordForm: FormGroup;

  passwordErrorStateMatcher = new PasswordErrorStateMatcher();

  code: string;
  userId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('user-id');
      this.code = params.get('code');
    });

    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, {validator: this.checkPasswords });
    this.notifierService.getConfig().behaviour.autoHide = false;
  }


  getNewPasswordConditionErrorMessage() {
    return this.resetPasswordForm.controls['newPassword']
      .hasError('required') ? 'You must enter your new password!' :
      this.resetPasswordForm.controls['newPassword']
        .hasError('minlength') ? 'Should be at least six characters long!' : '';
  }

  getConfirmNewPasswordConditionErrorMessage() {
    return this.resetPasswordForm.controls['confirmNewPassword']
      .hasError('required') ? 'You must confirm your new password!' :
      this.resetPasswordForm
        .hasError('notSame') ? 'Password do not match!' : '';
  }


  checkPasswords(group: FormGroup) {
    const newPassword = group.controls['newPassword'].value;
    const confirmNewPassword = group.controls['confirmNewPassword'].value;

    return newPassword === confirmNewPassword ? null : { notSame: true }
  }



  resetPassword() {
    const newPassword = this.resetPasswordForm.controls['newPassword'].value;
    this.isDisabled = true;

    const changePassword = new ChangePassword(
      this.userId,
      this.code,
      '',
      '',
      newPassword
    );

    this.isDisabled = true;
    this.userAccountDataStorageService.resetPassword(changePassword)
      .subscribe((data: any) => {
        this.isDisabled = false;

        if (data.statusText !== 'Success') {
          this.router.navigate(['/password-reset-link-expired']);
        } else {
          this.router.navigate(['/sign-in']);
          this.notifierService
            .notify('default', 'Password has reset successfully!');
        }
      });

  }
}
