import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

import {Role} from '../models/settings/role.model';
import {UserAccountDataStorageService} from '../services/data-storage-services/user-account-data-storage.service';

@Injectable()
export class RolesResolverService implements Resolve<Role[]> {

  constructor(private accountDataStorageService: UserAccountDataStorageService) { }

  resolve(): Observable<Role[]> | Promise<Role[]> | Role[] {
    return this.accountDataStorageService.getAllRole();
  }
}
