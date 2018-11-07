import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private companyJson = 'assets/mock-data/company.json';

  constructor(private httpClient: HttpClient) { }

  getCompanies() {
    return this.httpClient.get<Company[]>(this.companyJson);
  }
}
