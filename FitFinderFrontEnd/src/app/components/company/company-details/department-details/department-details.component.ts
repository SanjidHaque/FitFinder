import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../models/company.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {DataStorageService} from '../../../../services/data-storage.service';
import {Job} from '../../../../models/job.model';
import {Department} from '../../../../models/department.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  companyId: string;
  departmentId: string;
  companies: Company[] = [];
  company: Company;
  jobs: Job[] = [];
  departments: Department[] = [];
  department: Department;

  constructor(private route: ActivatedRoute) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.departmentId = params['departmentId'];
          this.companyId = params['companyId'];
        }
      );
  }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.companies = data['companies'];
      }
    );

    this.company = this.companies.find(x => x.id === this.companyId);
    this.departments = this.company.departments;
    this.department = this.departments.find(x => x.id === this.departmentId);
    this.jobs = this.department.jobs;

  }

}
