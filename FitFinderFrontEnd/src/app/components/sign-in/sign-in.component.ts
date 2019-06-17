import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserAccountDataStorageService} from '../../services/data-storage/user-account-data-storage.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  isDisabled = false;


  constructor(private router: Router,
              private userAccountDataStorageService: UserAccountDataStorageService) { }

  ngOnInit() {
  }

  signIn(form: NgForm) {
    const userName  = form.value.userName;
    const password  = form.value.password;
    if (userName === '' || password === '') { return; }

    this.isDisabled = true;
    this.userAccountDataStorageService.login(userName, password)
      .subscribe(
        (data : any) => {
          localStorage.setItem('userToken', data.access_token);
          localStorage.setItem('userRole', data.role);
          localStorage.setItem('userNameForSignIn', data.userName);
          this.router.navigate(['/dashboard']);
        },
        (error : HttpErrorResponse) => {
          this.isDisabled = false;
        });
  }
}

