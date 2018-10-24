import {Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  navbarLinks =  [
    {path: '/company', label: 'Companies'},
    {path: '/applicants', label: 'Applicants'},
    {path: '/users', label: 'Users'}
    ]
}



