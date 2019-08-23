import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Candidate} from '../models/candidate.model';
import {UserAccountDataStorageService} from '../services/data-storage/user-account-data-storage.service';
import {Company} from '../models/company.model';
import {UserAccount} from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})


export class UserAccountsResolverService implements Resolve<UserAccount[]> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserAccount[]>
    | Promise<UserAccount[]> | UserAccount[] {
    return this.userAccountDataStorageService.getAllUserAccount();
  }
}

