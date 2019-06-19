import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Candidate} from '../models/candidate.model';
import {CandidateDataStorageService} from '../services/data-storage/candidate-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateResolverService implements Resolve<Candidate[]> {
    constructor(private candidateDataStorageService: CandidateDataStorageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Candidate[]>
      | Promise<Candidate[]> | Candidate[] {
      return this.candidateDataStorageService.getAllCandidate();
    }
  }

