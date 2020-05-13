import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  navigationBarLinks =  [
    {path: '/dashboard', label: 'Dashboard', iconClass: 'fas fa-tachometer-alt'},
    {path: '/jobs', label: 'Jobs', iconClass: 'fas fa-briefcase'},
    {path: '/interviews', label: 'Interviews', iconClass: 'far fa-calendar-alt'}
  ];

  constructor(private router: Router) {}

  signOut()  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userNameForSignIn');
    localStorage.removeItem('userRole');
    this.router.navigate(['/sign-in']);
  }

}
