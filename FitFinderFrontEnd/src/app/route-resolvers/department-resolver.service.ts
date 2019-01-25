import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {JobFunction} from '../models/job-function.model';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs';
import {Department} from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentResolverService implements Resolve<Department[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Department[]>
    | Promise<Department[]> | Department[] {
    return this.dataStorageService.getAllDepartment();
  }
}
