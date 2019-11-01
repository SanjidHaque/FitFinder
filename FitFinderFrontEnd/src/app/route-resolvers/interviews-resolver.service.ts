import { Injectable } from '@angular/core';
import {Interview} from '../models/interview.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {InterviewDataStorageService} from '../services/data-storage-services/interview-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewsResolverService implements Resolve<Interview[]> {
  constructor(private interviewDataStorageService: InterviewDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Interview[]> | Promise<Interview[]> | Interview[] {
    return this.interviewDataStorageService.getAllInterview();
  }
}
