import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../../../models/user-account.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Company} from '../../../../models/company.model';

@Component({
  selector: 'app-company-id',
  templateUrl: './company-id.component.html',
  styleUrls: ['./company-id.component.css']
})
export class CompanyIdComponent implements OnInit {

  companyId: number;

  company: Company;
  companies: Company[] = [];


  constructor(private router: Router,
              private notifierService: NotifierService,
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
}
