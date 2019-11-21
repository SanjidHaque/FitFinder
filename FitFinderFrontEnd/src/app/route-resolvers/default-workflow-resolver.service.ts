import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {CandidateDataStorageService} from '../services/data-storage-services/candidate-data-storage.service';
import {Candidate} from '../models/candidate/candidate.model';
import {Observable} from 'rxjs';
import {UserAccount} from '../models/settings/user-account.model';
import {Workflow} from '../models/settings/workflow.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultWorkflowResolverService implements Resolve<any> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.settingsDataStorageService.getDefaultWorkflow();
  }
}

