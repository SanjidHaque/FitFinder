import { Component } from '@angular/core';
import {UserAccountDataStorageService} from '../../services/data-storage-services/user-account-data-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(public userAccountDataStorageService: UserAccountDataStorageService) {}
}
