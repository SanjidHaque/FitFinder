import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {InterviewDataStorageService} from '../services/data-storage/interview-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewResolverService implements Resolve<any> {
  constructor(private interviewDataStorageService: InterviewDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.interviewDataStorageService.getInterview(+route.paramMap.get('interview-id'));
  }
}

