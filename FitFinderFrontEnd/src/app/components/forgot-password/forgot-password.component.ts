import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../services/data-storage-services/user-account-data-storage.service';
import {ChangePassword} from '../../models/settings/change-password.model';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isDisabled = false;
  forgotPasswordForm: FormGroup;

  constructor(private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    });
    this.notifierService.getConfig().behaviour.autoHide = false;
  }

  getEmailErrorMessage() {
    return this.forgotPasswordForm.controls['email'].hasError('required') ? 'You must enter an email!' :
      this.forgotPasswordForm.controls['email'].hasError('email') ? 'Not a valid email!' :
        '';
  }

  forgotPassword() {
    const email = this.forgotPasswordForm.controls['email'].value;
    const changePassword = new ChangePassword(
      '',
       '',
       email,
      '',
      ''
    );
    this.isDisabled = true;
    this.userAccountDataStorageService.forgotPassword(changePassword)
      .subscribe((data: any) => {
        this.isDisabled = false;

        if (data.statusText !== 'Success') {
          this.notifierService.notify('default', data.statusText);
        } else {
          this.forgotPasswordForm.controls['email'].setValue({
            'email': null
          });
          this.notifierService
            .notify('default', 'Check your email inbox. ' +
              'We have sent instructions to reset your password.');
        }
      });
  }

}
