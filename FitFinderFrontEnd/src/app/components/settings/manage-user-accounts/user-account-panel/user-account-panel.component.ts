import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {UserAccount} from '../../../../models/settings/user-account.model';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {SettingsService} from '../../../../services/shared-services/settings.service';

@Component({
  selector: 'app-user-account-panel',
  templateUrl: './user-account-panel.component.html',
  styleUrls: ['./user-account-panel.component.css']
})
export class UserAccountPanelComponent implements OnInit {

  isDisabled = false;
  userAccounts: UserAccount[] = [];

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService,
              private notifierService: NotifierService,
              private userAccountDataStorageService: UserAccountDataStorageService) { }

  ngOnInit() {
    this.route.data
      .subscribe(
      (data: Data) => {
        this.userAccounts = data['userAccounts'].userAccounts;
      });
  }

  deleteUserAccount(userAccountId: string, index: number) {
    this.isDisabled = true;

    this.settingsService.deleteResource('Delete User Account')
      .then(result => {

        if (result.confirmationStatus) {

          this.userAccountDataStorageService.deleteUserAccount(userAccountId)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {

                this.notifierService.notify('default', response.statusText);

              } else {
                this.userAccounts.splice(index, 1);
                this.notifierService.notify('default',
                  'User account deleted successfully.');
              }

            });
        }

        this.isDisabled = false;

      }).catch();

  }

}
