import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {CandidateDataStorageService} from '../services/data-storage/candidate-data-storage.service';
import {Candidate} from '../models/candidate.model';
import {Observable} from 'rxjs';
import {UserAccount} from '../models/user-account.model';
import {Workflow} from '../models/workflow.model';
import {SettingsDataStorageService} from '../services/data-storage/settings-data-storage.service';

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
