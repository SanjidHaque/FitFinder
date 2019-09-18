import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Pipeline} from '../models/pipeline.model';
import {SettingsDataStorageService} from '../services/data-storage/settings-data-storage.service';
import {Workflow} from '../models/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowsResolverService implements Resolve<Workflow[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Workflow[]> | Promise<Workflow[]> | Workflow[] {
    return this.settingsDataStorageService.getAllWorkflow();
  }
}