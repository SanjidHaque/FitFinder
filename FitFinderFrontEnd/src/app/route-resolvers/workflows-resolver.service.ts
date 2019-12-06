import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/index';

import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';
import {Workflow} from '../models/settings/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowsResolverService implements Resolve<Workflow[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(): Observable<Workflow[]> | Promise<Workflow[]> | Workflow[] {
    return this.settingsDataStorageService.getAllWorkflow();
  }
}
