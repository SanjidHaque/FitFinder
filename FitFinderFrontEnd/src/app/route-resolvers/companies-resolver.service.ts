import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Candidate} from '../models/candidate/candidate.model';
import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';
import {Company} from '../models/settings/company.model';

@Injectable({
  providedIn: 'root'
})


export class CompaniesResolverService implements Resolve<Company[]> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]>
    | Promise<Company[]> | Company[] {
    return this.userAccountDataStorageService.getAllCompany();
  }
}

