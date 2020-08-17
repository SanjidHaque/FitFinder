import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  constructor(private router: Router) {}

  signOut()  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userNameForSignIn');
    localStorage.removeItem('userRole');
    this.router.navigate(['/sign-in']);
  }

}
