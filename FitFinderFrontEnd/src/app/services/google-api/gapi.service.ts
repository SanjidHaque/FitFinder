import {Injectable} from '@angular/core';
import {SettingsService} from '../shared/settings.service';
import {NotifierService} from 'angular-notifier';

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

  constructor(private notifierService: NotifierService) {}


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






  createNewFolder(newFolderName: string, parentFolderId: string) {
    if (!this.isSignedIn()) {
      console.log('Sign in first!');
      return;
    }
    
    const newFolder = {
      name: newFolderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId]
    };

    gapi.client.drive.files.create({
      resource: newFolder,
      fields: 'id, name'
    }).then((folderInfo) => {
      console.log(folderInfo);
    });
  }


  searchFolder(queryFolderName: string, parentFolderId: string) {
    const pageToken = null;

    gapi.client.drive.files.list({
      q: `name = '${queryFolderName}' and ` +
        `mimeType = 'application/vnd.google-apps.folder' and ` +
        `'${parentFolderId}' in parents and ` +
        `trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      spaces: 'drive',
      corpora: 'user',
      pageToken
    })
      .then((files) => {
        console.log(files);
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
