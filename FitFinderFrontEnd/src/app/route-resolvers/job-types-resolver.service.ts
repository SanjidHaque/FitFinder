import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../models/settings/department.model';
import {Observable} from 'rxjs';
import {JobType} from '../models/settings/job-type.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobTypesResolverService implements Resolve<JobType[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobType[]>
    | Promise<JobType[]> | JobType[] {
    return this.settingsDataStorageService.getAllJobType();
  }
}
