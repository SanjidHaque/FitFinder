import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';
import {Company} from '../models/settings/company.model';
import {UserAccount} from '../models/settings/user-account.model';
import {Department} from '../models/settings/department.model';

@Injectable({
  providedIn: 'root'
})


export class CurrentUserAccountResolverService implements Resolve<UserAccount> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve(): Observable<UserAccount> | Promise<UserAccount> | UserAccount {
    return this.userAccountDataStorageService.getCurrentUserAccount();
  }
}

