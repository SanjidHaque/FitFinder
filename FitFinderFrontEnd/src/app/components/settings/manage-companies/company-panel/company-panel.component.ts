import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../models/settings/company.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {UserAccount} from '../../../../models/settings/user-account.model';
import {NotifierService} from 'angular-notifier';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {DeleteDialogComponent} from '../../../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.css']
})
export class CompanyPanelComponent implements OnInit {
  isDisabled = false;

  companies: Company[] = [];

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              private notifierService: NotifierService,
              private userAccountDataStorageService: UserAccountDataStorageService) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.companies = data['companies'].companies;
      }
    );
  }


  deleteCompany(company: Company, index: number) {

    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Delete Company',
          iconClass: 'far fa-trash-alt',
          confirmationText: 'Are you sure?',
          buttonText: 'Delete',
          confirmationStatus: false
        }
      });


    dialogRef.afterClosed().subscribe( result => {
      if (result.confirmationStatus) {


        this.isDisabled = true;
        this.userAccountDataStorageService.deleteCompany(company).subscribe(
          (data: any) => {
            if (data.statusText === 'Success') {

              this.companies.splice(index, 1);
              this.notifierService.notify('default', 'Company deleted successfully.');
              this.router.navigate(['/settings/manage-companies']);

            } else {
              this.isDisabled = false;
              this.notifierService.notify('default', 'Error! Something went wrong!');
            }
          }
        );

      }
    });




  }
}
