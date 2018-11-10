import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navigationBarLinks =  [
    {path: '/dashboard', label: 'Dashboard'},
    {path: '/jobs', label: 'Jobs'},
    {path: '/candidates', label: 'Candidates'},
    {path: '/interviews', label: 'Interviews'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
