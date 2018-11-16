import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Candidate} from '../models/candidate.model';
import {DataStorageService} from '../services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateResolverService implements Resolve<Candidate[]> {
    constructor(private dataStorageService: DataStorageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Candidate[]> | Promise<Candidate[]> | Candidate[] {
      return this.dataStorageService.getAllCandidate();
    }
  }

