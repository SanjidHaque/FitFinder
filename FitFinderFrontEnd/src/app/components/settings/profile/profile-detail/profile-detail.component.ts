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
        this.jobs = data['jobs'];


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



  async connectToGoogleDrive() {

    await this.gapiService.signIn()
      .then(() => {

        this.zone.run(() => {

          this.currentGoogleAccountEmail = this.gapiService.currentGoogleAccountEmail;
          this.notifierService.notify('default', 'Connected to drive.');


        });
      })
      .catch();


    let rootFolderId = '';


    await this.gapiService.searchFolder(
      'root',
      'FitFinder-' + this.company.CompanyName)
      .then((rootFolder) => {

        if (rootFolder.result.files.length !== 0) {
          rootFolderId =  rootFolder.result.files[0].id;
        }

      });

    if (rootFolderId === '') {
      await this.gapiService.createNewFolder(
        'root',
        'FitFinder-' + this.company.CompanyName)
        .then((newRootFolderInfo) => {

          rootFolderId = newRootFolderInfo.result.id;

        });
    }


    const departmentPromises = [];
    this.departments.forEach((department) => {
      departmentPromises
        .push(this.gapiService.searchFolder(rootFolderId, department.Name));
    });


    const newDepartmentFoldersPromises = [];

    await Promise.all(departmentPromises).then((driveDepartmentFolders) => {


      driveDepartmentFolders.forEach((driveDepartmentFolder) => {

        if (driveDepartmentFolder.result.files.length === 0) {
          driveDepartmentFolder.result.files.push({id: -1, name: 'undefined'});
        }
      });

      this.departments.forEach((department) => {


        const folderExist = driveDepartmentFolders
          .find(x => x.result.files[0].name === department.Name)
;
        if (folderExist === undefined) {

          newDepartmentFoldersPromises
            .push(this.gapiService.createNewFolder(rootFolderId, department.Name));
        }

      });


    });


   await Promise.all(newDepartmentFoldersPromises)
      .then((newDepartmentFolderInfo) => {});

    const departmentPromisesForJobs = [];

    const departmentNames = [];

    this.jobs.forEach((job) => {

      const departmentName = this.settingsService.getDepartmentName(job.DepartmentId, this.departments);

      if (departmentName !== '') {

        const ifExists = departmentNames.find(x => x === departmentName);

        if (ifExists === undefined) {
          departmentNames.push(departmentName);
        }
      }


    });


    departmentNames.forEach((departmentName) => {

      departmentPromisesForJobs.push(this.gapiService.searchFolder(rootFolderId, departmentName));

    });


    const departments = [];
    await Promise.all(departmentPromisesForJobs)
      .then((departmentFoldersInfo) => {


      departmentFoldersInfo.forEach((departmentFolderInfo) => {

        if (departmentFolderInfo.result.files.length !== 0) {


          const department = {
            Id: departmentFolderInfo.result.files[0].id,
            Name: departmentFolderInfo.result.files[0].name
          };

          departments.push(department);

        }

      });


    });


    const jobPromises = [];

    for (const job of this.jobs) {

      const getDepartmentName = this.settingsService
        .getDepartmentName(job.DepartmentId, this.departments);

      if (getDepartmentName !== '') {
        const findDepartment = departments
          .find(x => x.Name === getDepartmentName);

        if (findDepartment !== undefined) {

         await this.gapiService
            .searchFolder(findDepartment.Id, job.JobTitle).then((jobFolderInfo) => {


             if (jobFolderInfo.result.files.length === 0) {

                   this.gapiService.createNewFolder(findDepartment.Id, job.JobTitle)
                     .then();

                 }

           });

        }
      }
    }

  }



  

  disconnectFormGoogleDrive() {
    this.gapiService.disconnect();
    this.currentGoogleAccountEmail = '';
    this.notifierService.notify('default', 'Disconnected from drive.');

  }


}
