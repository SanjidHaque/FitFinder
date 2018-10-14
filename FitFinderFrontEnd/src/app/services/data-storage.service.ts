import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Company} from '../models/company.model';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private companyJson = 'assets/mock-data/company.json';

  constructor(private httpClient: HttpClient) { }

  getCompanies() : Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyJson);
  }
}
