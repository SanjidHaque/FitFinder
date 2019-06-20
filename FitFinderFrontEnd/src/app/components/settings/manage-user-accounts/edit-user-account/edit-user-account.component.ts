import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../../../models/user-account.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {UserAccountDataStorageService} from '../../../../services/data-storage/user-account-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {Role} from '../../../../models/role.model';

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.css']
})
export class EditUserAccountComponent implements OnInit {
  userAccountId: string;
  isDisabled = false;
  roles: Role[] = [];

  userAccounts: UserAccount[] = [];
  userAccount: UserAccount;

  editUserAccountForm: FormGroup;

  constructor(private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userAccountId = params['id'];
        }
      );

  }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        this.userAccounts = data['userAccounts'];
        this.roles = data['roles'];

        this.userAccount = this.userAccounts.find(x => x.Id === this.userAccountId);
        if (this.userAccount === undefined) {
          this.router.navigate(['/settings/manage-user-accounts']);
          this.notifierService.notify('default', 'User not found.')
        }

        this.editUserAccountForm = new FormGroup({
          'userName': new FormControl(this.userAccount.UserName, Validators.required),
          'fullName': new FormControl(this.userAccount.FullName),
          'email': new FormControl(this.userAccount.Email,
            [Validators.required, Validators.email]),
          'phoneNumber': new FormControl(this.userAccount.PhoneNumber, Validators.required),
          'roleName': new FormControl('', Validators.required)
        });

        this.editUserAccountForm.controls['userName'].disable();
      }
    );

  }


  editUserAccount() {
    this.isDisabled = true;
    this.userAccountDataStorageService.editUserAccount(
      new UserAccount(
        this.userAccount.Id,
        this.userAccount.CompanyId,
        this.editUserAccountForm.controls['userName'].value,
        this.editUserAccountForm.controls['fullName'].value,
        this.editUserAccountForm.controls['email'].value,
        '',
        this.editUserAccountForm.controls['phoneNumber'].value,
        this.userAccount.JoiningDateTime,
        this.editUserAccountForm.controls['roleName'].value,
        this.userAccount.IsOwner
      )
    ).subscribe( (response: any) => {
      if (response.Succeeded) {

        if (this.userAccount.IsOwner) {

        }

        this.router.navigate(['/settings/manage-user-accounts/', this.userAccountId]);
        this.notifierService.notify(
          'default',
          'Information updated.');
      } else {

        this.notifierService.notify( 'default', response.Errors[0]);
        this.isDisabled = false;

      }
    })
  }

  getEmailErrorMessage(formControlName: string) {
    return this.editUserAccountForm.controls[formControlName].hasError('required') ? 'You must enter an email' :
      this.editUserAccountForm.controls[formControlName].hasError('email') ? 'Not a valid email' :
        '';
  }
}