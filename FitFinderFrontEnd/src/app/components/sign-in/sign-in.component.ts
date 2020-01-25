import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserAccountDataStorageService} from '../../services/data-storage-services/user-account-data-storage.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent  {
  hide = true;
  isDisabled = false;

  constructor(private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService) { }


  signIn(form: NgForm) {
    const userName  = form.value.userName;
    const password  = form.value.password;
    if (userName === '' || password === '') { return; }

    this.isDisabled = true;
    this.userAccountDataStorageService.login(userName, password)
      .subscribe(
        (data : any) => {
          localStorage.setItem('userName', userName);
          localStorage.setItem('userToken', data.access_token);
          localStorage.setItem('userRoles', data.role);
          this.router.navigate(['/dashboard']);
        },
        (error : HttpErrorResponse) => {
          this.isDisabled = false;
        });
  }
}

