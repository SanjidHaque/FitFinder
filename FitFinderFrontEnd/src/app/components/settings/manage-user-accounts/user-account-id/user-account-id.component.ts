import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {UserAccount} from '../../../../models/user-account.model';
import {NotifierService} from 'angular-notifier';
import {UserAccountDataStorageService} from '../../../../services/data-storage/user-account-data-storage.service';
import {Department} from '../../../../models/department.model';
import {SettingsService} from '../../../../services/shared/settings.service';

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

  departments: Department[] = [];


  constructor(private router: Router,
              private notifierService: NotifierService,
              private settingsService: SettingsService,
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
        this.userAccount = data['userAccount'];
        this.departments = data['departments'];
       // this.userAccount = this.userAccounts.find(x => x.Id === this.userAccountId);

        if (this.userAccount === null) {
          this.router.navigate(['/settings/manage-user-accounts']);
          this.notifierService.notify('default',  'User not found.')
        }
      }
    );
  }


  getDepartmentName() {
    return this.settingsService.getDepartmentName(this.userAccount.DepartmentId, this.departments);
  }

  deleteUserAccount() {
    this.isDisabled = true;
    this.userAccountDataStorageService.deleteUserAccount(this.userAccount.Id).subscribe(
      (data: any) => {
        if (data.statusText === 'Success') {
          this.notifierService.notify('default',  'User deleted successfully.');
          this.router.navigate(['/settings/manage-user-accounts']);
        } else {
          this.notifierService.notify('default', 'Error! Something went wrong!');
        }
      });
  }

}
