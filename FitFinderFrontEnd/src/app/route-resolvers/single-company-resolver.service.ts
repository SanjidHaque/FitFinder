import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Candidate} from '../models/candidate.model';
import {UserAccountDataStorageService} from '../services/data-storage/user-account-data-storage.service';
import {Company} from '../models/company.model';

@Injectable({
  providedIn: 'root'
})


export class SingleCompanyResolverService implements Resolve<Company> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company>
    | Promise<Company> | Company {
    return this.userAccountDataStorageService.getCompany();
  }
}

