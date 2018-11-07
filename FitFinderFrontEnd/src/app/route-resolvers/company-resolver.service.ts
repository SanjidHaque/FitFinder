import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataStorageService} from '../services/data-storage.service';
import {Company} from '../models/company.model';


@Injectable({
  providedIn: 'root'
})

export class CompanyResolverService  implements Resolve<Company[]> {

  constructor(private dataStorageService: DataStorageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]> |
    Promise<Company[]> | Company[] {
    return this.dataStorageService.getCompanies();
  }

}
