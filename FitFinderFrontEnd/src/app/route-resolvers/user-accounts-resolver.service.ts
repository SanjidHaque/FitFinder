import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/index';
import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';
import {UserAccount} from '../models/settings/user-account.model';

@Injectable({
  providedIn: 'root'
})


export class UserAccountsResolverService implements Resolve<UserAccount[]> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve(): Observable<UserAccount[]> | Promise<UserAccount[]> | UserAccount[] {
    return this.userAccountDataStorageService.getAllUserAccount();
  }
}

