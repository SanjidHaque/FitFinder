import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/settings/company.model';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {MatDialog} from '@angular/material';
import {AddUpdateDialogComponent} from '../../../../dialogs/add-update-dialog/add-update-dialog.component';

@Component({
  selector: 'app-company-id',
  templateUrl: './company-id.component.html',
  styleUrls: ['./company-id.component.css']
})
export class CompanyIdComponent implements OnInit {
  isDisabled = false;

  companyId: number;

  company: Company;
  companies: Company[] = [];


  constructor(private router: Router,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private route: ActivatedRoute) {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.companyId = +params['id'];
        }
      );
  }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
       // this.companies = data['companies'];
        this.company = data['company'];

        if (this.company === undefined) {
          this.router.navigate(['/settings/manage-companies']);
          this.notifierService.notify('default',  'Company not found.')
        }
      }
    );
  }


  deleteCompany() {


    const dialogRef = this.dialog.open(AddUpdateDialogComponent,
      {
        hasBackdrop: true,
        disableClose: true,
        width: '400px',
        data: {
          header: 'Delete Company',
          iconClass: 'far fa-trash-alt',
          cssClass: 'delete',
          confirmationText: 'Are you sure?',
          buttonText: 'Delete',
          confirmationStatus: false
        }
      });


    dialogRef.afterClosed().subscribe( result => {
      if (result.confirmationStatus) {


        this.isDisabled = true;
        this.userAccountDataStorageService.deleteCompany(this.company).subscribe(
          (data: any) => {
            if (data.statusText === 'Success') {

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
