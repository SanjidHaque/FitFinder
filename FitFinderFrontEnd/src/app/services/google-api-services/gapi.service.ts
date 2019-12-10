import {Injectable} from '@angular/core';
import {SettingsService} from '../shared-services/settings.service';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../models/settings/company.model';
import {Department} from '../../models/settings/department.model';
import {Job} from '../../models/job/job.model';

const CLIENT_ID = '702778738746-7a3e9tc282csr0e8fnekj1cdd5c4kbd5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB41UTFYHcZcdEr947h6GCQyd9ESUUYRzk';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive';

declare var gapi: any;

@Injectable()
export class GapiService {

  googleAuth: gapi.auth2.GoogleAuth;

  currentGoogleAccountEmail = '';

  companyName = '';

  constructor(private notifierService: NotifierService,
              private settingsService: SettingsService) {
  }


  initClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        }).then((res: any) => {
          this.googleAuth = gapi.auth2.getAuthInstance();

          if (this.googleAuth.isSignedIn.get()) {
            this.currentGoogleAccountEmail = this.googleAuth.currentUser
              .get()
              .getBasicProfile()
              .getEmail();
          }


          resolve();
        });
      });
    });

  }


  async syncToDrive(departments: Department[], jobs: Job[]) {

    if (!this.isSignedIn()) {
      this.notifierService.notify('default',
        'Connect to google account!');
      return;
    }

    let rootFolderId = '';


    await this.searchFolder(
      'root',
      'FitFinder')
      .then((rootFolder) => {

        if (rootFolder.result.files.length !== 0) {
          rootFolderId = rootFolder.result.files[0].id;
        }

      });

    if (rootFolderId === '') {
      await this.createNewFolder(
        'root',
        'FitFinder')
        .then((newRootFolderInfo) => {

          rootFolderId = newRootFolderInfo.result.id;

        });
    }


    const departmentPromises = [];
    departments.forEach((department) => {
      departmentPromises
        .push(this.searchFolder(rootFolderId, department.Name));
    });


    const newDepartmentFoldersPromises = [];

    await Promise.all(departmentPromises).then((driveDepartmentFolders) => {


      driveDepartmentFolders.forEach((driveDepartmentFolder) => {

        if (driveDepartmentFolder.result.files.length === 0) {
          driveDepartmentFolder.result.files.push({id: -1, name: 'undefined'});
        }
      });

      departments.forEach((department) => {


        const folderExist = driveDepartmentFolders
          .find(x => x.result.files[0].name === department.Name)
        ;
        if (folderExist === undefined) {

          newDepartmentFoldersPromises
            .push(this.createNewFolder(rootFolderId, department.Name));
        }

      });

    });


    await Promise.all(newDepartmentFoldersPromises).then(() => {
    });

    const departmentPromisesForJobs = [];
    const departmentNames = [];

    jobs.forEach((job) => {
      departmentNames.push(job.Department.Name);
    });

    departmentNames.forEach((departmentName) => {
      departmentPromisesForJobs.push(this.searchFolder(rootFolderId, departmentName));

    });


    const filteredDepartments = [];
    await Promise.all(departmentPromisesForJobs)
      .then((departmentFoldersInfo) => {


        departmentFoldersInfo.forEach((departmentFolderInfo) => {

          if (departmentFolderInfo.result.files.length !== 0) {


            const department = {
              Id: departmentFolderInfo.result.files[0].id,
              Name: departmentFolderInfo.result.files[0].name
            };

            filteredDepartments.push(department);

          }
        });

      }).catch((error) => {
        console.log(error);
      });


    const jobPromises = [];

    for (const job of jobs) {

      const findDepartment = filteredDepartments
        .find(x => x.Name === job.Department.Name);

      if (findDepartment !== undefined) {

        await this
          .searchFolder(findDepartment.Id, job.Title)
          .then((jobFolderInfo) => {


            if (jobFolderInfo.result.files.length === 0) {

              this.createNewFolder(findDepartment.Id, job.Title)
                .then();

            }

          });

      }

    }
  }


  isSignedIn() {
    return this.googleAuth.isSignedIn.get();
  }

  signIn() {
    return this.googleAuth.signIn({
      prompt: 'consent'
    }).then((googleUser: gapi.auth2.GoogleUser) => {
      this.currentGoogleAccountEmail = googleUser.getBasicProfile().getEmail();
    }).catch(() => {
    });
  }


  createNewFolder(parentFolderId: string, newFolderName: string) {
    if (!this.isSignedIn()) {
      console.log('Sign in first!');
      return;
    }

    const newFolder = {
      name: newFolderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId]
    };

    return gapi.client.drive.files.create({
      resource: newFolder,
      fields: 'id, pipelineStageName'
    });
  }


  searchFolder(parentFolderId: string, queryFolderName: string) {
    const pageToken = null;

    return gapi.client.drive.files.list({
      q: `name = '${queryFolderName}' and ` +
        `mimeType = 'application/vnd.google-apps.folder' and ` +
        `'${parentFolderId}' in parents and ` +
        `trashed = false`,
      fields: 'nextPageToken, files(id, parents, pipelineStageName, mimeType)',
      spaces: 'drive',
      corpora: 'user',
      pageToken
    });
  }


  signOut() {
    this.googleAuth.signOut();
  }

  disconnect() {
    this.googleAuth.disconnect();
  }

  getCurrentUser() {
    return this.googleAuth.currentUser.get();
  }


}
