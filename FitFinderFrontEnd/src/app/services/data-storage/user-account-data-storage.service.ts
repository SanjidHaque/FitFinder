import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserAccount} from '../../models/user-account.model';
import {Company} from '../../models/company.model';
import {Role} from '../../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountDataStorageService {
  backEndPort = '55586';
  rootUrl = 'http://localhost:' + this.backEndPort;

  constructor(private http: HttpClient) { }

  login(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded',
      'No-Auth': 'True'
    });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }


  roleMatch(allowedRoles) {
    let isMatch = false;
    const userRole = JSON.parse(JSON.stringify(localStorage.getItem('userRoles')));
    if (userRole === null || userRole === undefined) {
      return false;
    }
    allowedRoles.forEach(element => {
      if (userRole.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }

  addNewUserAccount(userAccount: UserAccount) {
    return this.http.post<UserAccount[]>(this.rootUrl + '/api/AddNewUserAccount', userAccount);
  }

  addNewCompany(company: Company) {
    return this.http.post<UserAccount>(this.rootUrl + '/api/AddNewCompany', company);
  }

  getAllUserAccount() {
    return this.http.get<UserAccount[]>(this.rootUrl + '/api/GetAllUserAccount');
  }

  getAllCompany() {
    return this.http.get<Company[]>(this.rootUrl + '/api/GetAllCompany');
  }


  getAllRole() {
    return this.http.get<Role[]>(this.rootUrl + '/api/GetAllRole');
  }

}
