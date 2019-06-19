import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../models/company.model';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.css']
})
export class CompanyPanelComponent implements OnInit {

  companies: Company[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.
    subscribe(
      (data: Data) => {
        this.companies= data['companies'];
      }
    );
  }



}
