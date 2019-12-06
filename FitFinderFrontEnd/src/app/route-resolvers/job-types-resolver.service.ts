import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {JobType} from '../models/settings/job-type.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobTypesResolverService implements Resolve<JobType[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(): Observable<JobType[]> | Promise<JobType[]> | JobType[] {
    return this.settingsDataStorageService.getAllJobType();
  }
}
