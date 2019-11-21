import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Department} from '../models/settings/department.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsResolverService implements Resolve<Department[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(): Observable<Department[]> | Promise<Department[]> | Department[] {
    return this.settingsDataStorageService.getAllDepartment();
  }
}
