import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {UserAccount} from '../../../../models/settings/user-account.model';
import {NotifierService} from 'angular-notifier';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {SettingsService} from '../../../../services/shared-services/settings.service';

@Component({
  selector: 'app-user-account-id',
  templateUrl: './user-account-id.component.html',
  styleUrls: ['./user-account-id.component.css']
})
export class UserAccountIdComponent implements OnInit {
  isDisabled = false;
  userAccount: UserAccount;

  constructor(private router: Router,
              private notifierService: NotifierService,
              private settingsService: SettingsService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.userAccount = data['userAccount'].userAccount;

        if (this.userAccount === null) {
          this.router.navigate(['/settings/manage-user-accounts']);
          this.notifierService.notify('default',  'Resource not found!')
        }
      });
  }



  deleteUserAccount() {

    this.settingsService.deleteResource('Delete User Account')
      .then(result => {

        this.isDisabled = true;
        if (result.confirmationStatus) {

          this.userAccountDataStorageService.deleteUserAccount(this.userAccount.Id)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {

                this.notifierService.notify('default', response.statusText);

              } else {
                this.router.navigate(['/settings/manage-user-accounts']);
                this.notifierService.notify('default',
                  'User account deleted successfully.');
              }

            });
        }

      }).catch();
  }

}
