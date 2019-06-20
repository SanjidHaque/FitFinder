import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../models/company.model';
import {ActivatedRoute, Data} from '@angular/router';
import {UserAccount} from '../../../../models/user-account.model';

@Component({
  selector: 'app-user-account-panel',
  templateUrl: './user-account-panel.component.html',
  styleUrls: ['./user-account-panel.component.css']
})
export class UserAccountPanelComponent implements OnInit {

  userAccounts: UserAccount[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.userAccounts = data['userAccounts'];
      }
    );
  }

}
