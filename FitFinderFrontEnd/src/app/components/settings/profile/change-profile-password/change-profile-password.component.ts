import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {Router} from '@angular/router';
import {ChangePassword} from '../../../../models/settings/change-password.model';
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
      'newPassword': new FormControl('', Validators.required),
      'confirmNewPassword': new FormControl('', Validators.required),
    });
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

