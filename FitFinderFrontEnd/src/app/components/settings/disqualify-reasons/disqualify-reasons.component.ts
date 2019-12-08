import { Component, OnInit } from '@angular/core';
import {SettingsDataStorageService} from '../../../services/data-storage-services/settings-data-storage.service';
import {NotifierService} from 'angular-notifier';
import {RejectedReason} from '../../../models/settings/rejected-reason.model';
import {WithdrawnReason} from '../../../models/settings/withdrawn-reason.model';
import {ActivatedRoute, Data} from '@angular/router';
import {DialogService} from '../../../services/dialog-services/dialog.service';
import {SettingsService} from '../../../services/shared-services/settings.service';

@Component({
  selector: 'app-disqualify-reasons',
  templateUrl: './disqualify-reasons.component.html',
  styleUrls: ['./disqualify-reasons.component.css']
})
export class DisqualifyReasonsComponent implements OnInit {
  isDisabled = false;

  rejectedReasons: RejectedReason[] = [];
  withdrawnReasons: WithdrawnReason[] = [];

  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService,
              private settingsDataStorageService: SettingsDataStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.rejectedReasons = data['rejectedReasons'].rejectedReasons;
        this.withdrawnReasons = data['withdrawnReasons'].withdrawnReasons;
      });
  }


  addNewRejectedReason() {
    this.settingsService.addNewRejectedReason().then(result => {
      if (result !== '') {
        const rejectedReason = new RejectedReason(
          null,
          result,
          null,
          null
        );

        this.settingsDataStorageService.addNewRejectedReason(rejectedReason).subscribe(
          (data: any) => {
            if (data.statusText !== 'Success') {
              this.notifierService.notify('default', data.statusText);
            } else {
              this.rejectedReasons.push(data.rejectedReason);
              this.notifierService.notify('default',
                'New rejected reason added.');
            }
          });
      }
    });
  }


  addNewWithdrawnReason() {
    this.settingsService.addNewWithdrawnReason().then(result => {
      if (result !== '') {

        const withdrawnReason = new WithdrawnReason(
          null,
          result,
          null,
          null
        );

        this.settingsDataStorageService.addNewWithdrawnReason(withdrawnReason)
          .subscribe(
            (data: any) => {
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                this.withdrawnReasons.push(data.withdrawnReason);
                this.notifierService.notify('default',
                  'New withdrawn reason added.');
              }
            });
      }
    });
  }



  editRejectedReason(rejectedReason: RejectedReason) {
    this.settingsService.editRejectedReason(rejectedReason.Name).then(result => {
      if (result !== '') {
        const editedRejectedReason = new RejectedReason(
          rejectedReason.Id,
          result,
          null,
          null
        );

        this.isDisabled = true;
        this.settingsDataStorageService.editRejectedReason(editedRejectedReason)
          .subscribe(
            (data: any) => {
              this.isDisabled = false;
              if (data.statusText !== 'Success') {
                this.notifierService.notify('default', data.statusText);
              } else {
                rejectedReason.Name = result;
                this.notifierService.notify('default',
                  'Reason updated successfully.');
              }
            });
      }
    });
  }

  editWithdrawnReason(withdrawnReason: WithdrawnReason) {
    this.settingsService.editWithdrawnReason(withdrawnReason.Name)
      .then(result => {
        if (result !== '') {
          const editedWithdrawnReason = new WithdrawnReason(
            withdrawnReason.Id,
            result,
            null,
            null
          );

          this.isDisabled = true;
          this.settingsDataStorageService.editWithdrawnReason(editedWithdrawnReason)
            .subscribe(
              (data: any) => {
                this.isDisabled = false;
                if (data.statusText !== 'Success') {
                  this.notifierService.notify('default', data.statusText);
                } else {
                  withdrawnReason.Name = result;
                  this.notifierService.notify('default',
                    'Reason updated successfully.');
                }
              });
        }
      })
      .catch();
  }


  deleteRejectedReason(rejectedReasonId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Rejected Reason')
      .then(result => {
        
        if (result.confirmationStatus) {

          this.settingsDataStorageService.deleteRejectedReason(rejectedReasonId)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {

                this.notifierService.notify('default', response.statusText);

              } else {

                this.rejectedReasons.splice(index, 1);
                this.notifierService.notify('default',
                  'Withdrawn reason deleted successfully.');

              }

            });
        }
        this.isDisabled = false;
        
      })
      .catch();
  }

  deleteWithdrawnReason(withdrawnReasonId: number, index: number) {
    this.isDisabled = true;
    this.settingsService.deleteResource('Delete Withdrawn Reason')
      .then(result => {

        if (result.confirmationStatus) {

          this.settingsDataStorageService.deleteWithdrawnReason(withdrawnReasonId)
            .subscribe((response: any) => {
              this.isDisabled = false;

              if (response.statusText !== 'Success') {

                this.notifierService.notify('default', response.statusText);

              } else {

                this.withdrawnReasons.splice(index, 1);
                this.notifierService.notify('default',
                  'Rejected reason deleted successfully.');
              }

            });
        }

        this.isDisabled = false;

      })
      .catch();
  }
}
