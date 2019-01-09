import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DashboardComponent implements OnInit {


  allDepartment = 'All Department';

  departments = [
    {id: '1', name: 'Accounts'},
    {id: '2', name: 'Finance'},
    {id: '3', name: 'Development'},
    {id: '4', name: 'Engineering'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
