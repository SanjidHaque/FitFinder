import { Injectable } from '@angular/core';
import {Interview} from '../models/interview.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class InterviewResolverService implements Resolve<Interview[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Interview[]> | Promise<Interview[]> | Interview[] {
    return this.dataStorageService.getAllInterview();
  }
}
