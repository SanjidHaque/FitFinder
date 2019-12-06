import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/index';
import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';
import {Company} from '../models/settings/company.model';

@Injectable({
  providedIn: 'root'
})

export class CompaniesResolverService implements Resolve<Company[]> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve(): Observable<Company[]> | Promise<Company[]> | Company[] {
    return this.userAccountDataStorageService.getAllCompany();
  }
}

