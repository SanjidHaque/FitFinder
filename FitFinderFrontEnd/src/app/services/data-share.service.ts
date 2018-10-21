import { Injectable } from '@angular/core';
import {Company} from '../models/company.model';
import {Observable, Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {


  public companies: Company[] = [];
  public companiesChanged = new Subject<Company[]>();


  getCompanies() {
    return this.companies.slice();
  }



}
