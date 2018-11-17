import { Injectable } from '@angular/core';
import {Job} from '../models/job.model';
import {DataStorageService} from '../services/data-storage.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class JobResolverService implements Resolve<Job[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Job[]> | Promise<Job[]> | Job[] {
    return this.dataStorageService.getAllJob();
  }
}
