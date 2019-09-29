import {ChangeDetectorRef, Component, DoCheck, NgZone, OnInit} from '@angular/core';
import {UserAccount} from '../../../../models/user-account.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/company.model';
import {Department} from '../../../../models/department.model';
import {SettingsService} from '../../../../services/shared/settings.service';
import {GapiService} from '../../../../services/google-api/gapi.service';
import {Job} from '../../../../models/job.model';

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
              private route: ActivatedRoute) {}

  ngOnInit() {

    if (this.gapiService.getCurrentUser().isSignedIn()) {
      this.currentGoogleAccountEmail = this.gapiService.currentGoogleAccountEmail;
    }


    this.route.data.
    subscribe(
      (data: Data) => {



        this.currentUserAccount = data['currentUserAccount'];
        this.company = data['company'];
        this.departments = data['departments'];
        this.departments = data['departments'];


        if (this.currentUserAccount === undefined) {
          this.router.navigate(['/sign-in']);
          this.notifierService.notify('default',  'User not found, sign-in again')
        }

      });
  }



  getDepartmentName() {
    return this.settingsService
      .getDepartmentName(this.currentUserAccount.DepartmentId, this.departments);
  }


  connectToGoogleDrive() {
    this.gapiService.signIn()
      .then(() => {

        this.zone.run(() => {

          this.currentGoogleAccountEmail = this.gapiService.currentGoogleAccountEmail;
          this.notifierService.notify('default', 'Connected to drive.');

        });





    }).catch(() => {});
  }

  createFolders() {

  }


  

  disconnectFormGoogleDrive() {
    this.gapiService.disconnect();
    this.currentGoogleAccountEmail = '';
    this.notifierService.notify('default', 'Disconnected from drive.');

  }





}
