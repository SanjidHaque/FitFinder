import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';

@Injectable({
  providedIn: 'root'
})


export class CompanyResolverService implements Resolve<any> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve() {
    return this.userAccountDataStorageService.getCompany();
  }
}

