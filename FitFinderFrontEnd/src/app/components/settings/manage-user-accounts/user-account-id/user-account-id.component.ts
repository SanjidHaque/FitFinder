import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {UserAccount} from '../../../../models/user-account.model';
import {NotifierService} from 'angular-notifier';
import {UserAccountDataStorageService} from '../../../../services/data-storage/user-account-data-storage.service';

@Component({
  selector: 'app-user-account-id',
  templateUrl: './user-account-id.component.html',
  styleUrls: ['./user-account-id.component.css']
})
export class UserAccountIdComponent implements OnInit {
  userAccountId: string;
  isDisabled = false;

  userAccounts: UserAccount[] = [];
  userAccount: UserAccount;


  constructor(private router: Router,
              private notifierService: NotifierService,
              private userAccountDataStorageService: UserAccountDataStorageService,
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

  deleteUserAccount() {
    this.isDisabled = true;
    this.userAccountDataStorageService.deleteUserAccount(this.userAccount).subscribe(
      (data: any) => {
        if (data.statusText === 'Success') {
          this.notifierService.notify('default',  'User deleted successfully.');
        } else {
          this.notifierService.notify('default',  'Error! Something went wrong!');
        }
      }
    )
  }

}
