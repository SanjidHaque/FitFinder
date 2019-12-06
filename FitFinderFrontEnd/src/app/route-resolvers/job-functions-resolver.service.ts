import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {JobFunction} from '../models/settings/job-function.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobFunctionsResolverService implements Resolve<JobFunction[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(): Observable<JobFunction[]> | Promise<JobFunction[]> | JobFunction[] {
    return this.settingsDataStorageService.getAllJobFunction();
  }
}
