import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Data, Route, Router} from '@angular/router';
import {Role} from '../../../../models/settings/role.model';
import {UserAccount} from '../../../../models/settings/user-account.model';
import * as moment from 'moment';
import {Department} from '../../../../models/settings/department.model';

@Component({
  selector: 'app-add-new-user-account',
  templateUrl: './add-new-user-account.component.html',
  styleUrls: ['./add-new-user-account.component.css']
})
export class AddNewUserAccountComponent implements OnInit {
  isDisabled = false;

  roles: Role[] = [];
  departments: Department[] = [];

  addNewUserAccountForm: FormGroup;
  constructor(private userAccountDataStorageService: UserAccountDataStorageService,
              private notifierService: NotifierService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.roles = data['roles'].roles;
        this.departments = data['departments'].departments;
      }
    );


    this.addNewUserAccountForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'fullName': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new FormControl('', Validators.required),
      'roleName': new FormControl('', Validators.required),
      'departmentId': new FormControl('', Validators.required)
    });


  }




  addNewUserAccount() {
    this.isDisabled = true;
    this.userAccountDataStorageService.addNewUserAccount(
      new UserAccount(
        null,
        null,
        null,
        this.addNewUserAccountForm.controls['userName'].value,
        this.addNewUserAccountForm.controls['fullName'].value,
        this.addNewUserAccountForm.controls['email'].value,
        '',
        this.addNewUserAccountForm.controls['phoneNumber'].value,
        moment().format('h:mm:ss A, Do MMMM YYYY'),
        this.addNewUserAccountForm.controls['roleName'].value,
        null,
        this.addNewUserAccountForm.controls['departmentId'].value,
        false
      )
    ).subscribe( (response: any) => {
      if (response.Succeeded) {

        this.notifierService.notify(
          'default',
          'New user created.' +
          ' A confirmation email ' +
          'includes username and password has sent to the registered email.');
        this.addNewUserAccountForm.reset();
        this.router.navigate(['/settings/manage-user-accounts']);

      } else {

        this.notifierService.notify( 'default', response.Errors[0]);
        this.isDisabled = false;

      }
    })
  }

  getEmailErrorMessage(formControlName: string) {
    return this.addNewUserAccountForm.controls[formControlName].hasError('required') ? 'You must enter an email' :
      this.addNewUserAccountForm.controls[formControlName].hasError('email') ? 'Not a valid email' :
        '';
  }


}
