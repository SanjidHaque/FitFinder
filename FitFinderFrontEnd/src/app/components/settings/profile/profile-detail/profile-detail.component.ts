import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {UserAccount} from '../../../../models/settings/user-account.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/settings/company.model';
import {Department} from '../../../../models/settings/department.model';
import {SettingsService} from '../../../../services/shared-services/settings.service';
import {GapiService} from '../../../../services/google-api-services/gapi.service';
import {Job} from '../../../../models/job/job.model';

@Component({
  selector: 'app-profile-id',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})

export class ProfileDetailComponent implements OnInit {
  currentUserAccount: UserAccount;
  currentGoogleAccountEmail = '';

  jobs: Job[] = [];

  company: Company;
  departments: Department[] = [];

  constructor(private router: Router,
              private settingsService: SettingsService,
              private notifierService: NotifierService,
              private gapiService: GapiService,
              private zone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.gapiService.getCurrentUser().isSignedIn()) {
      this.currentGoogleAccountEmail = this.gapiService.currentGoogleAccountEmail;
      console.log(this.gapiService.getCurrentUser().isSignedIn());
      console.log(this.gapiService.currentGoogleAccountEmail);
    }

    this.route.data.subscribe((data: Data) => {
        this.currentUserAccount = data['currentUserAccount'].userAccount;
        this.company = data['company'].company;
        this.departments = data['departments'].departments;
        this.jobs = data['jobs'].jobs;

        if (this.currentUserAccount === undefined || this.company === undefined)  {
          this.router.navigate(['/sign-in']);
          this.notifierService.notify('default', 'Resources not found. Sign in again');
        }
      });
  }


  connectToGoogleDrive() {
    this.gapiService.signIn()
      .then(() => {
        this.zone.run(() => {
          this.currentGoogleAccountEmail = this.gapiService.currentGoogleAccountEmail;
          this.notifierService.notify('default', 'Connected to drive.');
          this.gapiService.syncToDrive(this.departments, this.jobs);
        });
      }).catch();
  }


  disconnectFormGoogleDrive() {
    this.gapiService.disconnect();
    this.currentGoogleAccountEmail = '';
    this.notifierService.notify('default', 'Disconnected from drive.');
  }
}
