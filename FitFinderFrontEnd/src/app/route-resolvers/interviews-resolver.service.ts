import { Injectable } from '@angular/core';
import {Interview} from '../models/interview/interview.model';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/index';
import {InterviewDataStorageService} from '../services/data-storage-services/interview-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewsResolverService implements Resolve<Interview[]> {
  constructor(private interviewDataStorageService: InterviewDataStorageService) {}

  resolve(): Observable<Interview[]> | Promise<Interview[]> | Interview[] {
    return this.interviewDataStorageService.getAllInterview();
  }
}
