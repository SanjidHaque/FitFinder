import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Interview} from '../models/interview.model';
import {Observable} from 'rxjs';
import {JobFunction} from '../models/job-function.model';
import {SettingsDataStorageService} from '../services/data-storage/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobFunctionsResolverService implements Resolve<JobFunction[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobFunction[]>
    | Promise<JobFunction[]> | JobFunction[] {
    return this.settingsDataStorageService.getAllJobFunction();
  }
}
