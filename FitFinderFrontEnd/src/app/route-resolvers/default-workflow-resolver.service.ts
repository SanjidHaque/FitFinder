import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';

import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultWorkflowResolverService implements Resolve<any> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve() {
    return this.settingsDataStorageService.getDefaultWorkflow();
  }
}

