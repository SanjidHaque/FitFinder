import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {UserAccount} from '../../../../models/user-account.model';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-user-account-id',
  templateUrl: './user-account-id.component.html',
  styleUrls: ['./user-account-id.component.css']
})
export class UserAccountIdComponent implements OnInit {
  userAccountId: string;

  userAccounts: UserAccount[] = [];
  userAccount: UserAccount;


  constructor(private router: Router,
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
    this.route.data.
    subscribe(
      (data: Data) => {
        this.userAccounts = data['userAccounts'];
        this.userAccount = this.userAccounts.find(x => x.Id === this.userAccountId);
        if (this.userAccount === undefined) {
          this.router.navigate(['/settings/manage-user-accounts']);
          this.notifierService.notify('default',  'User not found.')
        }
      }
    );
  }

}
