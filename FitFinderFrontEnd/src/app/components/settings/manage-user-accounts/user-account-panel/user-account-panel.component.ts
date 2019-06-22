import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../models/company.model';
import {ActivatedRoute, Data} from '@angular/router';
import {UserAccount} from '../../../../models/user-account.model';
import {UserAccountDataStorageService} from '../../../../services/data-storage/user-account-data-storage.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-user-account-panel',
  templateUrl: './user-account-panel.component.html',
  styleUrls: ['./user-account-panel.component.css']
})
export class UserAccountPanelComponent implements OnInit {

  isDisabled = false;
  userAccounts: UserAccount[] = [];

  constructor(private route: ActivatedRoute,
              private notifierService: NotifierService,
              private userAccountDataStorageService: UserAccountDataStorageService) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.userAccounts = data['userAccounts'];
      }
    );
  }

  deleteUserAccount(userAccount: UserAccount, index: number) {
    this.isDisabled = true;
    this.userAccountDataStorageService.deleteUserAccount(userAccount).subscribe(
      (data: any) => {
        if (data.statusText === 'Success') {
          this.userAccounts.splice(index, 1);
          this.notifierService.notify('default',  'User deleted successfully.');
        } else {
          this.notifierService.notify('default',  'Error! Something went wrong!');
        }
      }
    )
  }

}
