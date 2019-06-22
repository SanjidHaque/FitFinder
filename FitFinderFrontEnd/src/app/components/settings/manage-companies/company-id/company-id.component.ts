import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../../../models/user-account.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/company.model';
import {UserAccountDataStorageService} from '../../../../services/data-storage/user-account-data-storage.service';
import {DeleteDialogComponent} from '../../../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material';

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
        this.companies = data['companies'];
        this.company = this.companies.find(x => x.Id === this.companyId);
        if (this.company === undefined) {
          this.router.navigate(['/settings/manage-companies']);
          this.notifierService.notify('default',  'Company not found.')
        }
      }
    );
  }


  deleteCompany() {


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
