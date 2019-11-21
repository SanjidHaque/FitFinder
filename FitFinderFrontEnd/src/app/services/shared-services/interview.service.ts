import { Injectable } from '@angular/core';
import {Interview} from '../../models/interview/interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  interview: Interview;
}
