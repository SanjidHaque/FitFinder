import { Component, OnInit } from '@angular/core';
import {AddUpdateComponent} from '../../../dialogs/add-update/add-update.component';
import {Source} from '../../../models/source.model';
import {MatDialog} from '@angular/material';
import {DataStorageService} from '../../../services/data-storage.service';
import {SettingsService} from '../../../services/settings.service';
import {NotifierService} from 'angular-notifier';
import {RejectedReason} from '../../../models/rejected-reason.model';
import {WithdrawnReason} from '../../../models/withdrawn-reason.model';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-disqualify-reasons',
  templateUrl: './disqualify-reasons.component.html',
  styleUrls: ['./disqualify-reasons.component.css']
})
export class DisqualifyReasonsComponent implements OnInit {

  rejectedReasons: RejectedReason[] = [];
  withdrawnReasons: WithdrawnReason[] = [];

  constructor(private commonDialog: MatDialog,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private settingsService: SettingsService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.rejectedReasons = data['rejectedReasons'];
        this.withdrawnReasons = data['withdrawnReasons'];
      }
    );
  }

  addNewRejectedReasonDialog() {
    const dialogRef = this.commonDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '500px',
        data:
          {
            header: 'New Rejected Reason',
            name: '',
            iconClass: 'fas fa-ban',
            footer: 'Add or update different reasons for rejection by hiring manager.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const rejectedReason = new RejectedReason(
          null,
          result
        );


        this.dataStorageService.addNewRejectedReason(rejectedReason)
          .subscribe(
            (data: any) => {
              this.rejectedReasons.push(rejectedReason);
              this.notifierService.notify('default', 'New reason added!');
            }
          );

      }
    });
  }

  addNewWithdrawnReasonDialog() {
    const dialogRef = this.commonDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '500px',
        data:
          {
            header: 'New Withdrawn Reason',
            name: '',
            iconClass: 'fas fa-ban',
            footer: 'Add or update different reasons for withdrawn of application by candidate.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        const withdrawnReason = new WithdrawnReason(
          null,
          result
        );



        this.dataStorageService.addNewWithdrawnReason(withdrawnReason)
          .subscribe(
            (data: any) => {
              this.withdrawnReasons.push(withdrawnReason);
              this.notifierService.notify('default', 'New reason added!');
            }
          );

      }
    });
  }

  editRejectedReason(rejectedReason: RejectedReason) {
    const dialogRef = this.commonDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '500px',
        data:
          {
            header: 'Edit Rejected Reason',
            name: rejectedReason.Name ,
            iconClass: 'fas fa-ban',
            footer: 'Add or update different reasons for rejection by hiring manager.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' && result !== rejectedReason.Name) {
        const editRejectedReason = new RejectedReason(
          null,
          result
        );


        this.dataStorageService.editRejectedReason(editRejectedReason )
          .subscribe(
            (data: any) => {
              rejectedReason.Name = result.name;
              this.notifierService.notify('default', 'Reason updated successfully!');
            }
          );

      }
    });
  }

  editWithdrawnReason(withdrawnReason: WithdrawnReason) {
    const dialogRef = this.commonDialog.open(AddUpdateComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '500px',
        data:
          {
            header: 'Edit Withdrawn Reason',
            name: withdrawnReason.Name ,
            iconClass: 'fas fa-ban',
            footer: 'Add or update different reasons for withdrawn of application by candidate.'
          }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' && result !== withdrawnReason.Name) {
        const editWithdrawnReason = new WithdrawnReason(
          null,
          result
        );


        this.dataStorageService.editWithdrawnReason(editWithdrawnReason)
          .subscribe(
            (data: any) => {
              withdrawnReason.Name = result.name;
              this.notifierService.notify('default', 'Reason updated successfully!');
            }
          );

      }
    });
  }
}
