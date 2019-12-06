import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Workflow} from '../models/settings/workflow.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowResolverService implements Resolve<Workflow> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot):
    Observable<Workflow> | Promise<Workflow> | Workflow {
    return this.settingsDataStorageService.getWorkflow(+route.paramMap.get('workflow-id'));
  }
}

