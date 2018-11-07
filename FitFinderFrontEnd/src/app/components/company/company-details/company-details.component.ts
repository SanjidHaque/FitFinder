import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../../services/data-storage.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Company} from '../../../models/company.model';
import {Department} from '../../../models/department.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  companyId: string;
  companies: Company[] = [];
  company: Company;
  departments: Department[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.companyId = params['companyId'];
        }
      );
  }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Company[]) => {
        this.companies = data['companies'];
      }
    );
    this.company = this.companies.find(x => x.id === this.companyId);
    this.departments = this.company.departments;
  }


}
