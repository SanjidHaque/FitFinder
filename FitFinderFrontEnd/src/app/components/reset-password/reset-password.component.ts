import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../services/data-storage-services/user-account-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {ChangePassword} from '../../models/settings/change-password.model';

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

  code: string;
  userId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('user-id');
      this.code = params.get('code');
    });

    this.resetPasswordForm = new FormGroup({
      'newPassword': new FormControl('', Validators.required),
      'confirmNewPassword': new FormControl('', Validators.required)
    });
    this.notifierService.getConfig().behaviour.autoHide = false;
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
