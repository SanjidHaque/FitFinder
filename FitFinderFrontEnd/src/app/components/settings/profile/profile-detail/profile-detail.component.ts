import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../../../models/user-account.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/company.model';

@Component({
  selector: 'app-profile-id',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  userAccounts: UserAccount[] = [];
  userAccount: UserAccount;

  company: Company;

  constructor(private router: Router,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {


  }

  ngOnInit() {
    const userName = JSON.parse(JSON.stringify(localStorage.getItem('userNameForSignIn')));
    this.route.data.
    subscribe(
      (data: Data) => {
        this.userAccounts = data['userAccounts'];
        this.company = data['company'];


        this.userAccount = this.userAccounts.find(x => x.UserName === userName);
        if (this.userAccount === undefined) {
          this.router.navigate(['/dashboard']);
          this.notifierService.notify('default',  'User not found.')
        }
      }
    );
  }
}
