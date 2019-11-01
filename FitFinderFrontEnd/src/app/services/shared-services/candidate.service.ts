import { Injectable } from '@angular/core';
import {Candidate} from '../../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  candidate: Candidate;
}
