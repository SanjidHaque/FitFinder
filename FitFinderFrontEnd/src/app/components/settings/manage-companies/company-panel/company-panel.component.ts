import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../models/settings/company.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {UserAccountDataStorageService} from '../../../../services/data-storage-services/user-account-data-storage.service';
import {MatDialog} from '@angular/material';
import {SettingsService} from '../../../../services/shared-services/settings.service';


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
              private settingsService: SettingsService,
              private notifierService: NotifierService,
              private userAccountDataStorageService: UserAccountDataStorageService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.companies = data['companies'].companies;
      });
  }


  deleteCompany(company: Company, index: number) {

    this.settingsService.deleteResource('Delete Company')
      .then(result => {
        if (result.confirmationStatus) {

          this.isDisabled = true;
          this.userAccountDataStorageService.deleteCompany(company)
            .subscribe((data: any) => {
              if (data.statusText !== 'Success') {

                this.isDisabled = false;
                this.notifierService.notify('default', data.statusText);

              } else {

                this.companies.splice(index, 1);
                this.notifierService.notify('default', 'Company deleted successfully.');
                this.router.navigate(['/settings/manage-companies']);

              }
            });
        }
      });
  }
}
