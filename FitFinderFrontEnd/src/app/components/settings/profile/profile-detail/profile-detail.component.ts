import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../../../models/user-account.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/company.model';

@Component({
  selector: 'app-profile-id',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  currentUserAccount: UserAccount;

  company: Company;

  constructor(private router: Router,
              private notifierService: NotifierService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.currentUserAccount = data['currentUserAccount'];

        this.company = data['company'];



        if (this.currentUserAccount === undefined) {
          this.router.navigate(['/sign-in']);
          this.notifierService.notify('default',  'User not found, sign-in again')
        }

      });
  }

  connectToDrive() {

  }
}
