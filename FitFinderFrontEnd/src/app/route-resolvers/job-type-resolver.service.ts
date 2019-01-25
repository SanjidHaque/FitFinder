import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../models/department.model';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs';
import {JobType} from '../models/job-type.model';

@Injectable({
  providedIn: 'root'
})
export class JobTypeResolverService implements Resolve<JobType[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobType[]>
    | Promise<JobType[]> | JobType[] {
    return this.dataStorageService.getAllJobType();
  }
}
