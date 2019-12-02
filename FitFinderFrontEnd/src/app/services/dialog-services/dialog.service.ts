import {Injectable} from '@angular/core';
import {AddUpdateDialogComponent} from '../../dialogs/add-update-dialog/add-update-dialog.component';
import {RejectedReason} from '../../models/settings/rejected-reason.model';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {SettingsDataStorageService} from '../data-storage-services/settings-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }


  addOrUpdateDialog(header: string,
                    name: string, iconClass: string, width: string, footer: string) {
    return this.matDialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: width,
        data:
          {
            header: header,
            name: name,
            iconClass: iconClass,
            footer: footer
          }
      });
  }


  confirmationDialog(header: string,
                     iconClass: string,
                     cssClass: string, confirmationText: string,
                     buttonText: string, confirmationStatus: boolean) {
   return this.matDialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: header,
          iconClass: iconClass,
          cssClass: cssClass,
          confirmationText: confirmationText,
          buttonText: buttonText,
          confirmationStatus: confirmationStatus
        }
      });
  }





}
