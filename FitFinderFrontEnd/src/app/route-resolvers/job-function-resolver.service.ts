import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Interview} from '../models/interview.model';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs';
import {JobFunction} from '../models/job-function.model';

@Injectable({
  providedIn: 'root'
})
export class JobFunctionResolverService implements Resolve<JobFunction[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobFunction[]>
    | Promise<JobFunction[]> | JobFunction[] {
    return this.dataStorageService.getAllJobFunction();
  }
}
