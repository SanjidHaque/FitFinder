import { Injectable } from '@angular/core';
import {Interview} from '../../models/interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  interview: Interview;
}
