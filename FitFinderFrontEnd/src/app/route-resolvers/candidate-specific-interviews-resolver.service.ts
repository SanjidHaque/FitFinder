import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/index';
import {CandidateForInterview} from '../models/interview/candidate-for-interview.model';
import {InterviewDataStorageService} from '../services/data-storage-services/interview-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateSpecificInterviewsResolverService implements Resolve<CandidateForInterview[]> {
  constructor(private interviewDataStorageService: InterviewDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot):
    Observable<CandidateForInterview[]> |
    Promise<CandidateForInterview[]> |
    CandidateForInterview[] {
    return this.interviewDataStorageService
      .getAllCandidateSpecificInterview(+route.paramMap.get('candidate-id'));
  }
}

