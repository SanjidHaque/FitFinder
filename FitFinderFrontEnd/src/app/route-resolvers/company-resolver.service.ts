import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';
import {Company} from '../models/company.model';

@Injectable({
  providedIn: 'root'
})


export class CompanyResolverService implements Resolve<any> {
  constructor(private userAccountDataStorageService: UserAccountDataStorageService) {}

  resolve() {
    return this.userAccountDataStorageService.getCompany();
  }
}

