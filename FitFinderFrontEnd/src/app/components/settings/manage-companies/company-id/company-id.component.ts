import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/settings/company.model';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {SettingsService} from '../../../../services/shared-services/settings.service';

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
              private settingsService: SettingsService,
              private userAccountDataStorageService: UserAccountDataStorageService,
              private route: ActivatedRoute) {

    this.route.params.subscribe((params: Params) => {
          this.companyId = +params['id'];
        });
  }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.companies = data['companies'].companies;

        this.company = this.companies.find(x => x.Id === this.companyId);
        if (this.company === undefined) {
          this.notifierService.notify('default', 'Resource not found!');
          this.router.navigate(['/settings/manage-companies']);
        }
      });
  }


  deleteCompany() {
    this.settingsService.deleteResource('Delete Company')
      .then( result => {
      if (result.confirmationStatus) {


        this.isDisabled = true;
        this.userAccountDataStorageService.deleteCompany(this.company).subscribe(
          (data: any) => {
            if (data.statusText !== 'Success') {

              this.isDisabled = false;
              this.notifierService.notify('default', data.statusText);

            } else {

              this.notifierService.notify('default', 'Company deleted successfully.');
              this.router.navigate(['/settings/manage-companies']);

            }
          });

      }
    });
  }
}
