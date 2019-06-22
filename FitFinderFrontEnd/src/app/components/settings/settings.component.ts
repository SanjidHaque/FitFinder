import { Component, OnInit } from '@angular/core';
import {UserAccountDataStorageService} from '../../services/data-storage/user-account-data-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public userAccountDataStorageService: UserAccountDataStorageService) { }

  ngOnInit() {
  }

}
