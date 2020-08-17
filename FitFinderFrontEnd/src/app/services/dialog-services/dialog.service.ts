import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {AddUpdateDialogComponent} from '../../dialogs/add-update-dialog/add-update-dialog.component';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {AddUpdatePipelineStageDialogComponent} from '../../dialogs/add-update-pipeline-stage-dialog/add-update-pipeline-stage-dialog.component';

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
                     iconClass: string, width: string,
                     cssClass: string, confirmationText: string,
                     buttonText: string, confirmationStatus: boolean) {
   return this.matDialog.open(ConfirmationDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: width,
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

  addNewPipelineStageDialog(header: string, name: string, color: string,
                            iconClass: string, width: string, footer: string) {
    return this.matDialog.open(AddUpdatePipelineStageDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: width,
        data: {
          header: header,
          name: name,
          color: color,
          iconClass: iconClass,
          footer: footer,
        }
      });
  }
}
