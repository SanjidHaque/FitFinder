import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../models/settings/department.model';
import {Observable} from 'rxjs';
import {Source} from '../models/settings/source.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SourcesResolverService implements Resolve<Source[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Source[]>
    | Promise<Source[]> | Source[] {
    return this.settingsDataStorageService.getAllSource();
  }
}
