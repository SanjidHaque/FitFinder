import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../models/department.model';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';
import {SettingsDataStorageService} from '../services/data-storage/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TagResolverService implements Resolve<Tag[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]>
    | Promise<Tag[]> | Tag[] {
    return this.settingsDataStorageService.getAllTag();
  }
}
