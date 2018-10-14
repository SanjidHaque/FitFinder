import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../../models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies : Company[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.
      subscribe(
      (data: Company[]) => {
        this.companies = data['companies'];
      }
    )
  }

}
