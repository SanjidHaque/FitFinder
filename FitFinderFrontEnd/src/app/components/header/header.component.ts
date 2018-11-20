import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  navigationBarLinks =  [
    {path: '/dashboard', label: 'Dashboard', iconClass: 'fas fa-tachometer-alt'},
    {path: '/jobs', label: 'Jobs', iconClass: 'fas fa-briefcase'},
    {path: '/candidates', label: 'Candidates', iconClass: 'fas fa-box-open'},
    {path: '/interviews', label: 'Interviews', iconClass: 'far fa-calendar-alt'}
  ];

  constructor() { }

  ngOnInit() {
  }

  onLogout()  {
  }

}
