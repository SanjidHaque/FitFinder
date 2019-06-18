import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../models/department.model';
import {Observable} from 'rxjs';
import {JobType} from '../models/job-type.model';
import {SettingsDataStorageService} from '../services/data-storage/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobTypeResolverService implements Resolve<JobType[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobType[]>
    | Promise<JobType[]> | JobType[] {
    return this.settingsDataStorageService.getAllJobType();
  }
}
