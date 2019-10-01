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



    Promise.all(departmentPromises).then((driveDepartmentFolders) => {



      const newDepartmentFoldersPromises = [];

      driveDepartmentFolders.forEach((driveDepartmentFolder, index) => {

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


      Promise.all(newDepartmentFoldersPromises)
        .then((newDepartmentFolderInfo) => {});


    });


    this.jobs.forEach((job) => {

      const departmentName = this.settingsService.getDepartmentName(job.DepartmentId, this.departments);

      if (departmentName !== undefined) {

      }

      this.gapiService.searchFolder(rootFolderId, departmentName)
        .then((res) => {

          if (res.result.files.length === 0) {
            // this.gapiService.createNewFolder()
          } else {
            this.gapiService.createNewFolder(res.result.files[0].id, job.JobTitle)
              .then();
          }

        });

});




    // const newDepartmentFoldersPromises = [];
    //
    // this.departments.forEach((department) => {
    //
    //   driveDepartmentFolders.forEach((driveDepartmentFolder) => {
    //
    //     if (department.Name !== driveDepartmentFolder.result.files[0].Name) {
    //       newDepartmentFoldersPromises
    //         .push(this.gapiService.createNewFolder(department.Name, rootFolderId));
    //     }
    //
    //   });
    //
    // });
    //
    // Promise.all(newDepartmentFoldersPromises).then((newDepartmentFolderInfo) => {
    //
    //
    // });



    // for (const department of this.departments) {
    //
    //   await this.gapiService.searchFolder(department.Name, rootFolderId)
    //     .then((departmentFolderInfo) => {
    //
    //       if (departmentFolderInfo.result.files.length === 0) {
    //
    //         this.gapiService.createNewFolder(department.Name, rootFolderId)
    //           .then(() => { });
    //
    //       }
    //
    //     });
    // }

     // await this.departments.forEach((department) => {
     //
     //   this.gapiService.searchFolder(department.Name, rootFolderId)
     //    .then((departmentFolderInfo) => {
     //
     //      if (departmentFolderInfo.result.files.length === 0) {
     //
     //        this.gapiService.createNewFolder(department.Name, rootFolderId)
     //          .then(() => { });
     //
     //      }
     //
     //    });
     // });





  }


  // connectToGoogleDrive() {
  //
  //   this.gapiService
  //       .signIn()
  //       .then(() => {
  //
  //         this.zone.run(() => {
  //
  //           this.currentGoogleAccountEmail = this.gapiService.currentGoogleAccountEmail;
  //           this.notifierService.notify('default', 'Connected to drive.');
  //
  //
  //           let rootFolderId = '';
  //
  //           this.gapiService.searchFolder(
  //             'root',
  //             'FitFinder-' + this.company.CompanyName)
  //             .then((rootFolder) => {
  //
  //
  //
  //               if (rootFolder.result.files.length === 0) {
  //
  //                 this.gapiService.createNewFolder(
  //                   'root',
  //                   'FitFinder-' + this.company.CompanyName)
  //                   .then((newRootFolderInfo) => {
  //                     rootFolderId = newRootFolderInfo.result.id;
  //
  //
  //                     this.gapiService.searchFolder(rootFolderId, '')
  //                       .then((departmentFolders) => {
  //
  //
  //                         const filteredDepartmentNames = this.getFilteredDepartmentNames(departmentFolders.result.files);
  //
  //                         filteredDepartmentNames.forEach((filteredDepartmentName) => {
  //                           this.gapiService.createNewFolder(rootFolderId, filteredDepartmentName)
  //                             .then(() => {
  //
  //
  //
  //                             });
  //                         });
  //
  //
  //                         this.jobs.forEach((job) => {
  //
  //                           const departmentName = this.settingsService.getDepartmentName(job.DepartmentId, this.departments);
  //
  //                           this.gapiService.searchFolder(rootFolderId, departmentName)
  //                             .then((res) => {
  //
  //                               if (res.result.files.length === 0) {
  //                                 // this.gapiService.createNewFolder()
  //                               } else {
  //                                 this.gapiService.createNewFolder(res.result.files[0].id, job.JobTitle)
  //                                   .then();
  //                               }
  //
  //                             });
  //
  //
  //                         });
  //
  //
  //
  //
  //
  //
  //                       });
  //
  //
  //                   });
  //
  //               } else {
  //                 rootFolderId = rootFolder.result.files[0].id;
  //
  //                 this.gapiService.searchFolder(rootFolderId, '')
  //                   .then((departmentFolders) => {
  //
  //                     const filteredDepartmentNames = this.getFilteredDepartmentNames(departmentFolders.result.files);
  //
  //                     filteredDepartmentNames.forEach((filteredDepartmentName) => {
  //                       this.gapiService.createNewFolder(rootFolderId, filteredDepartmentName)
  //                         .then(() => {
  //
  //
  //
  //
  //                         });
  //                     });
  //
  //
  //                     this.jobs.forEach((job) => {
  //
  //                       const departmentName = this.settingsService.getDepartmentName(job.DepartmentId, this.departments);
  //
  //                       this.gapiService.searchFolder(rootFolderId, departmentName)
  //                         .execute((res) => {
  //
  //                           if (res.result.files.length === 0) {
  //                             // this.gapiService.createNewFolder()
  //                           } else {
  //                             this.gapiService.createNewFolder(res.result.files[0].id, job.JobTitle)
  //                               .then();
  //                           }
  //
  //                         });
  //
  //
  //                     });
  //
  //                   });
  //
  //               }
  //
  //
  //
  //             })
  //
  //
  //         });
  //       })
  //     .catch((err) => {});
  // }




  getFilteredDepartmentNames(driveDepartmentFolders) {

    const departmentNames = [];
    const driveDepartmentFolderNames = [];

    this.departments.forEach((department) => {
      departmentNames.push(department.Name);
    });

    driveDepartmentFolders.forEach((departmentFolder) => {
      driveDepartmentFolderNames.push(departmentFolder.name);
    });

    let filteredDepartmentNames = [];

    filteredDepartmentNames =
      departmentNames.filter(x => !driveDepartmentFolderNames.includes(x));


    return filteredDepartmentNames;

  }



  getFilteredJobNames(driveJobFolders) {




  }
  //  connectToGoogleDrive() {
  //   this.gapiService
  //     .signIn()
  //     .then(() => {
  //
  //       this.zone.run(() => {
  //
  //         this.currentGoogleAccountEmail = this.gapiService.currentGoogleAccountEmail;
  //         this.notifierService.notify('default', 'Connected to drive.');
  //
  //         this.gapiService
  //           .searchFolder(
  //             'FitFinder-' + this.company.CompanyName,
  //             'root')
  //           .then((folder) => {
  //
  //               let rootFolderId = '';
  //
  //               if (folder.result.files.length === 0) {
  //
  //                 this.gapiService.createNewFolder(
  //                   'FitFinder-' +
  //                   this.company.CompanyName, 'root')
  //                   .then((folderInfo) => {
  //                     rootFolderId = folderInfo.result.id;
  //
  //
  //
  //
  //
  //                   }).then(() => {
  //
  //
  //
  //
  //                 });
  //
  //
  //               } else {
  //                 rootFolderId = folder.result.files[0].id;
  //               }
  //
  //
  //               // this.departments.forEach((department) => {
  //               //
  //               //   this.gapiService.searchFolder(department.Name, rootFolderId)
  //               //     .then((departmentFolderInfo) => {
  //               //
  //               //       if (departmentFolderInfo.result.files.length === 0) {
  //               //
  //               //         this.gapiService.createNewFolder(department.Name, rootFolderId)
  //               //           .then(() => { });
  //               //
  //               //       }
  //               //
  //               //     });
  //               //
  //               // });
  //               //
  //               //
  //               //
  //               // this.jobs.forEach((job) => {
  //               //
  //               //   const departmentName = this.settingsService.getDepartmentName(job.DepartmentId, this.departments);
  //               //
  //               //
  //               //   if (departmentName !== '') {
  //               //
  //               //
  //               //     this.gapiService.searchFolder(departmentName, rootFolderId)
  //               //       .then((departmentFolderInfo) => {
  //               //
  //               //         let departmentFolderId = '';
  //               //
  //               //         if (departmentFolderInfo.result.files.length === 0) {
  //               //
  //               //           this.gapiService.createNewFolder(department.Name, rootFolderId)
  //               //             .then((newDepartmentFolderInfo) => {
  //               //
  //               //               departmentFolderId = newDepartmentFolderInfo.result.id;
  //               //
  //               //             });
  //               //         } else {
  //               //
  //               //
  //               //           departmentFolderId = departmentFolderInfo.result.files[0].id;
  //               //
  //               //         }
  //               //
  //               //
  //               //         this.gapiService.searchFolder(job.JobTitle, departmentFolderId)
  //               //           .then((jobFolderInfo) => {
  //               //
  //               //             if (jobFolderInfo.result.files.length === 0) {
  //               //               this.gapiService.createNewFolder(job.JobTitle, departmentFolderId)
  //               //                 .then(() => { });
  //               //             }
  //               //
  //               //           });
  //               //
  //               //       });
  //               //
  //               //
  //               //   }
  //               //
  //               //
  //               // });
  //
  //
  //
  //
  //
  //
  //
  //         }).then(() => {
  //           console.log('Okay1');
  //         }).then(() => {
  //           console.log('Okay2');
  //         });
  //
  //
  //       });
  //
  //
  //
  //   })
  //     .catch(() => {});
  // }



  

  disconnectFormGoogleDrive() {
    this.gapiService.disconnect();
    this.currentGoogleAccountEmail = '';
    this.notifierService.notify('default', 'Disconnected from drive.');

  }





}
